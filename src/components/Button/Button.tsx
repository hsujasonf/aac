import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import Tts from 'react-native-tts';

interface ButtonProps {
  word: string;
}

const speakWord = (word: string) => {
  Tts.speak(word);
};

const Button: React.FC<ButtonProps> = ({word}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={() => speakWord(word)}>
      <Text style={styles.text}>{word}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Button;
