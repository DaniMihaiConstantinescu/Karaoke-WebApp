// AudioPlayer.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AudioPlayer = ({ videoId, apiKey }) => {
  const [audioStreamUrl, setAudioStreamUrl] = useState('');

  useEffect(() => {
    const getVideoInfo = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet,contentDetails&key=${apiKey}`
        );

        const audioStreamUrl =
          response.data.items[0]?.contentDetails?.captions?.audioTracks[0]?.url || '';

        console.log(response.data)

        setAudioStreamUrl(audioStreamUrl);
      } catch (error) {
        console.error('Error fetching video information:', error.message);
      }
    };

    getVideoInfo();
  }, [videoId, apiKey]);

  return (
    <div>
      {audioStreamUrl && (
        <audio controls>
          <source src={audioStreamUrl} type="audio/mp4" />
          Your browser does not support the audio tag.
        </audio>
      )}
    </div>
  );
};

export default AudioPlayer;
