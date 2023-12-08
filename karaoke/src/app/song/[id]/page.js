"use client"

import AudioPlayer from "@/components/song/AudioPlayer";
import SongHeader from "@/components/song/SongHeader";
import fetchGeniusLyrics from "@/utils/getLyrics";
import getLyrics from "@/utils/getLyrics";


import getTrackDetails from '@/utils/getTrackDetails';
import requestAccessToken from '@/utils/spotifyAuth';
import axios from "axios";
import jsonp from "jsonp";
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

        // const fetchLyrics = async () => {

        //   if(trackDetails != null){
          
        //     const apiUrl = 'http://localhost:3005/song/byName'; // Replace with your actual API endpoint

        //     const postData = {
        //       artists: trackDetails.artists,
        //       song: trackDetails.name,
        //     };

        //     axios
        //       .post(apiUrl, postData)
        //       .then((response) => {
        //         console.log("Response:", response);
        //         setLyrics(response.data)
        //       })
        //       .catch((error) => {
        //         console.error(
        //           "Error:",
        //           error.response ? error.response.data : error.message
        //         );
        //         // Handle the error
        //       });
        //   }
        // };



        const fetchLyrics = async () => {
          if (trackDetails !== null) {

            const apiUrl = 'http://localhost:3005/song/byName'; 
            const proxyUrl = `${apiUrl}/song/byName`;

            const postData = {
              artists: trackDetails.artists,
              song: trackDetails.name,
            };
        
            // Using JSONP to make the cross-origin request through the proxy server
            jsonp(proxyUrl, { param: 'callback', data: postData }, (err, data) => {
              if (err) {
                console.error('Error:', err.message);
                // Handle the error
              } else {
                console.log('Response:', data);
                setLyrics(data.lyrics);
              }
            });
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
