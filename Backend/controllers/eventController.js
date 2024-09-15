import axios from 'axios';

const API_TOKEN = 'JQR2EW6O4DJPKDVD4G2H'; // Use your private token here
const BASE_URL = 'https://www.eventbriteapi.com/v3';

export const fetchEvents = async (req, res) => {
  console.log('fetchEvents controller hit'); // Log when the controller is hit

  try {
    // Log the API request being made
    console.log(`Requesting events from Eventbrite API with token ${API_TOKEN}`);

    // Adjust the query parameters as needed
    const response = await axios.get(`${BASE_URL}/events/search/?q=community&location.address=your_location`, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    // Log the response from Eventbrite
    console.log('Eventbrite API response:', response.data);

    // Send the response from Eventbrite API to the client
    res.json(response.data);
  } catch (error) {
    // Log the error and send a server error response
    console.error('Error fetching events:', error.message);
    res.status(500).send('Server error');
  }
};
