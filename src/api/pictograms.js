import axios from 'axios';

export const fetchPictograms = async (searchText) => {
  const baseURL = 'https://api.arasaac.org/v1'; // Replace with actual API base URL if different
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
    console.log('Pictograms:', response.data);
    // If the pictograms have URLs for images, you can access them here
    response.data.forEach(pictogram => {
      console.log(`Pictogram ID: ${pictogram.id}`);
      console.log(`Pictogram URL: ${pictogram.url}`); // Replace with actual field for URL if available
    });
  } catch (error) {
    console.error(
      'Error fetching pictograms:',
      error.response?.data || error.message,
    );
  }
};

const data = [
  /* Your massive array of objects */
];

const filterKeywordsWithId = data => {
  const keywordMap = new Map();

  data.forEach(item => {
    if (item.keywords) {
      item.keywords.forEach(keywordObj => {
        const keyword = keywordObj.keyword;
        // If the keyword isn't already added, map it to the item's ID
        if (!keywordMap.has(keyword)) {
          keywordMap.set(keyword, item._id);
        }
      });
    }
  });

  // Convert the Map to a plain object
  return Object.fromEntries(keywordMap);
};

export const fetchPictogramById = async (pictogramId: string) => {
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

// Example usage
fetchPictogramById(2462)
  .then(base64Image => {
    console.log('Pictogram Image in Base64:', base64Image);
    // Use the image, e.g., set it as the src for an <img> tag
  })
  .catch(error => {
    console.error('Failed to fetch pictogram:', error);
  });
