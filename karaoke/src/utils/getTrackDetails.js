import axios from 'axios';

const getTrackDetails = async (trackId, accessToken) => {
  try {
    const response = await axios.get(`https://api.spotify.com/v1/tracks/${trackId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const trackDetails = {
      name: response.data.name,
      artists: response.data.artists.map((artist) => artist.name).join(', '),
      coverArt: response.data.album.images.length > 0 ? response.data.album.images[0].url : null,
      audioLink: response.data.preview_url,
    };

    return trackDetails;
  } catch (error) {
    console.error('Error fetching track details:', error.message);
    return null;
  }
};

export default getTrackDetails;
