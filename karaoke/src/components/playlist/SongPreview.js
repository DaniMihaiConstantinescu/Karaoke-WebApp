import React from 'react'

import styles from '@/css/homepage.module.css'
import Link from 'next/link'

export default function SongPreview({song}) {
  return (
    <Link  href={`/song/${song.id}`}> 
      <div className={styles.songPreview}>
          <img className={styles.songCover} src={song.coverArt}></img>
          <div>
              <p>{song.name}</p>
              <p>{song.artists}</p>
          </div>
      </div>
    </Link>
  )
}
