"use client"

import React, { useEffect, useState} from 'react';
import SpotifySongs from '@/components/SpotifySongs';
import requestAccessToken from '@/utils/spotifyAuth';
import PlaylistSearchBar from '@/components/PlaylistSearchBar';

import styles from '@/css/homepage.module.css';


export default function Home() {

  const [accessToken, setAccessToken] = useState(null);
  const [playlistId, setPlaylistId] = useState('')


  useEffect(() => {
    const fetchAccessToken = async () => {
      const token = await requestAccessToken();
      setAccessToken(token);
    };

    fetchAccessToken();
  }, []);
  

  return (
    <div className={styles.mainContainer}>
      <h1>Spotify Karaoke App</h1>
      <PlaylistSearchBar getPlaylist={setPlaylistId} />
      {playlistId && <SpotifySongs accessToken={accessToken} playlistId={playlistId} />}
    </div>
  )
}


