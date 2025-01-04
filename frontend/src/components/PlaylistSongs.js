import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Card from './Card';

function PlaylistSongs() {
  const { playlistName } = useParams();
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const allPlaylists = JSON.parse(localStorage.getItem('allPlaylist'));
    setSongs(allPlaylists[playlistName] || []);
  }, [playlistName]);

  const removeSongFromPlaylist = (song) => {
    const allPlaylists = JSON.parse(localStorage.getItem('allPlaylist'));
    const updatedSongs = allPlaylists[playlistName].filter((s) => s.id !== song.id);
    allPlaylists[playlistName] = updatedSongs;
    localStorage.setItem('allPlaylist', JSON.stringify(allPlaylists));
    setSongs(updatedSongs);
  };

  return (
    <div className="container">
      <h2>{playlistName}</h2>
      <div className="row">
        {songs.map((song) => (
          <Card
            key={song.id}
            element={song}
            isPlaylistSong={true}
            playlistName={playlistName}
            removeSongFromPlaylist={removeSongFromPlaylist}
          />
        ))}
      </div>
    </div>
  );
}

export default PlaylistSongs;
