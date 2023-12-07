const getPlaylistIdFromLink = (playlistLink) => {
    // Spotify playlist link format: https://open.spotify.com/playlist/PLAYLIST_ID
    const regex = /playlist\/(\w+)/;
    const match = playlistLink.match(regex);
  
    if (match && match[1]) {
      return match[1];
    } else {
      // Return null if the link format doesn't match or if the playlist ID is not found
      return null;
    }
  };
  
export {getPlaylistIdFromLink}