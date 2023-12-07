"use client"

import AudioPlayer from "@/components/song/AudioPlayer";
import SongHeader from "@/components/song/SongHeader";

import getTrackDetails from '@/utils/getTrackDetails';
import requestAccessToken from '@/utils/spotifyAuth';
import React, { useEffect, useState } from 'react'

export default function page({params}) {

    const trackId = params.id;

    const [accessToken, setAccessToken] = useState(null);
    const [trackDetails, setTrackDetails] = useState(null);


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

    // get the track info
    useEffect(() => {
        const fetchTrackDetails = async () => {
          const details = await getTrackDetails(trackId, accessToken);
          setTrackDetails(details);
        };

        fetchTrackDetails();
      }, [trackId, accessToken]);

      if (!trackDetails) {
        return <h1>Loading...</h1>;
      }

  return (
    <div> 

      <SongHeader trackDetails={trackDetails}/>

      {/* <AudioPlayer apiKey={apiKey} videoId={videoId} /> */}

    </div>
  );
}
