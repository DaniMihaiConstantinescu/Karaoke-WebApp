import styles from "@/css/song.module.css"
import Link from "next/link"
import React, { useState } from 'react'

export default function SongHeader({trackDetails}) {

    const [isPlaying, setIsPlaying] = useState(false)

    const handleClick = () => {
        setIsPlaying(!isPlaying);
    }

  return (
    <div className={styles.mainHeader}>
        <Link href='/'>
            <button className={styles.backButton} role="button">
                <img width="20" height="20" src="https://img.icons8.com/ios-filled/25/f4f0f0/back.png" alt="back"/>
            </button>
        </Link>

        <div className={styles.headerContainer}>
            {trackDetails.coverArt && <img src={trackDetails.coverArt} className={styles.headerCover} alt="Cover Art" />}
            <div className={styles.headerDetails}>
                <h2>{trackDetails.name}</h2>
                <p>Artists: {trackDetails.artists}</p>
            </div>
        </div>

        <div className={styles.spacer}></div>

        <button onClick={handleClick} className={styles.playButton} role="button">
            {isPlaying ? 
                <img width="30" height="30" src="https://img.icons8.com/ios-filled/50/f4f0f0/pause--v1.png" alt="pause--v1"/>
            :
                <img width="30" height="30" src="https://img.icons8.com/ios-filled/35/f4f0f0/play--v1.png" alt="play--v1"/>
            }
        </button>


    </div>
  )
}
