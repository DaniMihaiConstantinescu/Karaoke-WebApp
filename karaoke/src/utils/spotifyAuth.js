import axios from 'axios';
import querystring from 'querystring';

const requestAccessToken = async () => {
  const data = {
    grant_type: 'client_credentials',
  };

  try {
    const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;

    // console.log(clientSecret);

    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      querystring.stringify(data),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
        },
      }
    );

    const accessToken = response.data.access_token;

    // Now you can use the accessToken for your API requests
    return accessToken;
  } catch (error) {
    console.error('Error requesting access token:', error.message);
    return null;
  }
};

export default requestAccessToken;
