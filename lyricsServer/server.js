// server.js

const express = require('express');
const axios = require('axios');
const cors = require('cors');
const Genius = require('genius-lyrics-api');

import { getLyrics, getSong } from 'genius-lyrics-api';

const app = express();
const port = 3001; // Choose a port for your server

app.use(cors()); // Enable CORS for all routes

app.get('/get-genius-lyrics', async (req, res) => {
  try {

    const options2 = {
      apiKey: 'u72zoPI56hgU_cGQr96FJvSorOP-0ns7PLBBuplXXjr1y6vE7EBw0HBuMFXxPlQQ',
      title: 'Posthumous Forgiveness',
      artist: 'Tame Impala',
      optimizeQuery: true
    };
    
    getLyrics(options2).then((lyrics) => console.log(lyrics));
    
    getSong(options2).then((song) =>
      console.log(`${song.id} - ${song.title} - ${song.url} - ${song.albumArt} - ${song.lyrics}`)
    );



    const { artist, title, accessToken } = req.query;

    // console.log(artist);

    const options = {
      apiKey: accessToken,
      title: 'Posthumous Forgiveness',
	    artist: 'Tame Impala',
      optimizeQuery: true,
    };

    const lyricsData = await Genius.getLyrics(options);

    if (lyricsData.lyrics) {
      res.json({ lyrics: lyricsData.lyrics });
    } else {
      res.status(404).json({ error: 'Lyrics not found' });
    }
  } catch (error) {
    console.error('Error fetching lyrics:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
