"use client"

import AudioPlayer from "@/components/song/AudioPlayer";
import SongHeader from "@/components/song/SongHeader";
import fetchGeniusLyrics from "@/utils/getLyrics";
import getLyrics from "@/utils/getLyrics";

import getTrackDetails from '@/utils/getTrackDetails';
import requestAccessToken from '@/utils/spotifyAuth';
import React, { useEffect, useState } from 'react'

export default function page({params}) {

    const trackId = params.id;

    const [accessToken, setAccessToken] = useState(null);
    const [trackDetails, setTrackDetails] = useState(null);
    const [lyrics, setLyrics] = useState(null)

    // youtube stuff
    const videoId = 'ZEGpWo7ethQ';
    const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;


    // get the access token
    useEffect(() => {
      const fetchAccessToken = async () => {
        const token = await requestAccessToken();
        setAccessToken(token);
      };
  
      fetchAccessToken();
    }, []);

    // get the track info + get lyrics for track
    useEffect(() => {
        const fetchTrackDetails = async () => {
          const details = await getTrackDetails(trackId, accessToken);
          setTrackDetails(details);
        };

        const fetchLyrics = async () => {
          // try {
          //   const accessToken = process.env.NEXT_PUBLIC_GENIUS_ACCESS_TOKEN;
          //   const artist = trackDetails.artists;
          //   const title = trackDetails.name;

          //   const data = await fetchGeniusLyrics(accessToken, artist, title);
          //   console.log('Lyrics Data:', data);

          //   const auxLyrics = data.response;
          //   setLyrics(auxLyrics)
          // } catch (error) {
          //   // Handle error if needed
          // }


          try {
            const response = await fetch(`http://localhost:3001/get-genius-lyrics?artist=${artist}&title=${title}&accessToken=${accessToken}`);
            
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
            setLyrics(data.lyrics);
          } catch (error) {
            console.error('Error fetching lyrics:', error);
            setLyrics('Error fetching lyrics');
          }

        };

        fetchTrackDetails();
        fetchLyrics();

      }, [trackId, accessToken]);

      if (!trackDetails) {
        return <h1>Loading...</h1>;
      }

  return (
    <div> 

      <SongHeader trackDetails={trackDetails}/>

      {lyrics && JSON.stringify(lyrics)}

      {/* <AudioPlayer apiKey={apiKey} videoId={videoId} /> */}

    </div>
  );
}
