import axios from 'axios';
import dotenv from 'dotenv';
import Event from '../models/Event.js'; // Import Event model

dotenv.config();

const API_TOKEN = process.env.EVENTBRITE_API_TOKEN;
const BASE_URL = 'https://www.eventbriteapi.com/v3';
const GEOLOCATION_API_KEY = process.env.GEOLOCATION_API_KEY;

// Function to get the user's location from their IP
const getUserLocation = async (ip) => {
  try {
    const response = await axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=${GEOLOCATION_API_KEY}&ip=${ip}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user location:', error.message);
    throw new Error('Unable to determine user location.');
  }
};

export const fetchEvents = async (req, res) => {
  console.log('fetchEvents controller hit');

  try {
    // Get user IP address from request
    const userIP = req.ip || '8.8.8.8'; // Use a fallback IP address if req.ip is unavailable
    console.log('User IP:', userIP);

    // Get user's location using the IP geolocation API
    const location = await getUserLocation(userIP);
    const city = location.city || 'San Francisco'; // Default to a city if geolocation fails

    console.log(`Fetching events for location: ${city}`);

    // Make a request to the Eventbrite API to fetch events near the user's location
    const eventbriteResponse = await axios.get(`${BASE_URL}/events/search/`, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      params: {
        'location.address': city,
        'q': 'community', // Example search query
      }
    });

    // Log the Eventbrite API response
    console.log('Eventbrite API response:', eventbriteResponse.data);

    // Send the event data back to the client
    res.json(eventbriteResponse.data);
  } catch (error) {
    console.error('Error fetching events:', error.message);
    res.status(500).send('Server error');
  }
};
