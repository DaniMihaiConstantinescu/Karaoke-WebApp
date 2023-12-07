const fetchGeniusLyrics = async (accessToken, artist, title) => {
  // try {
  //   // Make a request to your local server API
  //   const response = await fetch(
  //     `http://localhost:3001/get-genius-lyrics?artist=${artist}&title=${title}&accessToken=${accessToken}`
  //   );

  //   if (!response.ok) {
  //     throw new Error('Network response was not ok');
  //   }

  //   const data = await response.json();
  //   return data;
  // } catch (error) {
  //   console.error('Error fetching lyrics:', error);
  //   throw error;
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

export default fetchGeniusLyrics;
