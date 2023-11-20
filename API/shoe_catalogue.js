export default function shoe_catalogue() {

  const API_ENDPOINT = 'http://localhost:2026/api/shoes';

  async function fetchDataFromDatabase() {
    try {
      // Use Axios to make a GET request to the API endpoint
      const response = await axios.get(API_ENDPOINT);

      // Extract the data from the response
      const data = response.data;

      // Process or use the data as needed
      console.log('Fetched data:', data);

      return data;

    } catch (error) {
      // Handle errors, for example, log the error or throw an exception
      console.error('Error fetching data:', error.message);
      throw error;
    }
  }


  return {
    fetchDataFromDatabase,
  }
}

