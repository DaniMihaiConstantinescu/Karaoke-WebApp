import React from 'react'

import styles from '@/css/homepage.module.css'
import SongPreview from './SongPreview';

export default function SongsGrid({songs}) {    
    return (
        <div className={styles.songGrid }>
            {songs.map((song) => (
                <SongPreview key={song.id} song={song} />
            ))}
        </div>
    )
}
