import React from 'react'

import styles from '@/css/homepage.module.css'

export default function PlaylistHeader({playlistInfo}) {
  return (
    <div className={styles.playlistHeader}>
        {playlistInfo && <img src={playlistInfo.coverImage} className={styles.coverImage}></img> }
        <h1>Songs in Playlist: {playlistInfo && playlistInfo.name}</h1>
    </div>
  )
}
