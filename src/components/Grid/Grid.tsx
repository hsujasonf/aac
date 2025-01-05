import axios from 'axios';
import React, {useState, useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {Buffer} from 'buffer';
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native';
import Tts from 'react-native-tts';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

Tts.setDefaultLanguage('en-US'); // Set language

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function Grid(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const speakWord = (word: string) => {
    Tts.speak(word);
  };
  const [searchText, setSearchText] = useState('');
  const [pictograms, setPictograms] = useState([]);

  const fetchPictograms = async searchText => {
    const baseURL = 'https://api.arasaac.org/api'; // Replace with actual API base URL if different
    const language = 'en';

    try {
      const response = await axios.get(
        `${baseURL}/pictograms/${language}/bestsearch/${searchText}`,
        {
          headers: {
            accept: 'application/json',
          },
        },
      );

      console.log('<<<Pictograms:', response.data);
      setPictograms(response.data); // Store the results in state
      setError(null); // Clear previous errors
    } catch (error) {
      console.error(
        'Error fetching pictograms:',
        error.response?.data || error.message,
      );
      setError('Failed to fetch pictograms. Please try again.');
    }
  };

  const renderPictogram = ({item}) => (
    <View style={styles.pictogramContainer}>
      <Text style={styles.pictogramText}>ID: {item._id}</Text>
      {item.url && (
        <Image
          source={{uri: item.url}}
          style={styles.pictogramImage}
          resizeMode="contain"
        />
      )}
    </View>
  );
  const [pictogramImage, setPictogramImage] = useState('null');
  const [error, setError] = useState(null);
  const fetchPictogramById = async (pictogramId: number) => {
    const baseURL = 'https://api.arasaac.org/v1/pictograms'; // Base URL for the ARASAAC API

    try {
      const response = await axios.get(`${baseURL}/${pictogramId}`, {
        params: {download: false}, // Ensure the image is returned in the response
        headers: {
          accept: 'application/octet-stream', // Indicate that the response is binary data
        },
        responseType: 'arraybuffer', // Ensure Axios handles the response as binary data
      });

      // Convert the binary data to a Base64 string for display or use in an <img> tag
      const base64Image = `data:image/png;base64,${Buffer.from(
        response.data,
        'binary',
      ).toString('base64')}`;
      return base64Image;
    } catch (error: any) {
      console.error(
        'Error fetching pictogram:',
        error.response?.data || error.message,
      );
      throw error; // Rethrow the error for the caller to handle
    }
  };

  useEffect(() => {
    const fetchPictogram = async () => {
      try {
        const base64Image: string = await fetchPictogramById(2462);
        setPictogramImage(base64Image); // Store the image in state
      } catch (err: any) {
        console.error('Failed to fetch pictogram:', err);
        setError(err.message); // Optionally store the error
      }
    };

    fetchPictogram();
  }, []);
  const backgroundStyle: ViewStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1, // Ensures full height for SafeAreaView
    width: '100%',
  };

  return (
    <View style={backgroundStyle}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => speakWord('Hello')}>
        <Text style={styles.buttonText}>Say "Hello"</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Search Pictograms</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter search text"
        value={searchText}
        onChangeText={setSearchText}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => fetchPictograms(searchText)}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <FlatList
        data={pictograms}
        // keyExtractor={item => item.id.toString()}
        renderItem={renderPictogram}
        contentContainerStyle={styles.pictogramList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 16,
  },
  pictogramList: {
    paddingBottom: 16,
  },
  pictogramContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  pictogramText: {
    fontSize: 14,
    marginBottom: 8,
  },
  pictogramImage: {
    width: 100,
    height: 100,
  },
});

export default Grid;
