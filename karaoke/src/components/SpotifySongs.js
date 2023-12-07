import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PlaylistHeader from './playlist/PlaylistHeader';
import SongsGrid from './playlist/SongsGrid';

const SpotifySongs = ({ accessToken, playlistId }) => {
  const [songs, setSongs] = useState([]);
  const [playlistInfo, setPlaylistInfo] = useState(null);

  useEffect(() => {
    const fetchPlaylistInfo = async () => {
      if (accessToken && playlistId) {
        try {
          const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          setPlaylistInfo({
            name: response.data.name,
            coverImage: response.data.images.length > 0 ? response.data.images[0].url : null,
          });
        } catch (error) {
          console.error('Error fetching playlist info:', error.message);
        }
      }
    };

    const fetchSongsData = async () => {
      try {
        const response = await axios.get(
          `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        // Extract relevant information from the response
        const songsData = response.data.items.map((item) => ({
          id: item.track.id,
          name: item.track.name,
          artists: item.track.artists.map((artist) => artist.name).join(', '),
          album: item.track.album.name,
          uri: item.track.uri,
          coverArt: item.track.album.images.length > 0 ? item.track.album.images[0].url : null,
        }));

        setSongs(songsData);
      } catch (error) {
        console.error('Error fetching songs:', error.message);
      }
    };

    if (accessToken && playlistId) {
      fetchPlaylistInfo();
      fetchSongsData();
    }
  }, [accessToken, playlistId]);

  return (
    <div>
      <PlaylistHeader playlistInfo={playlistInfo} />
      <SongsGrid songs={songs} />
    </div>
  );
};

export default SpotifySongs;
