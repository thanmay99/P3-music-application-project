import React, { useEffect, useState } from "react";
import "./UploadedSongs.css";
import { backend_url } from "../../App";

const UploadedSongs = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    try {
      const response = await fetch(`${backend_url}/songs`);
      const data = await response.json();
      setSongs(data);
    } catch (error) {
      console.error("Error fetching songs:", error);
    }
  };

  const deleteSong = async (id) => {
    try {
      const response = await fetch(`${backend_url}/songs/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setSongs(songs.filter((song) => song._id !== id));
      } else {
        console.error("Failed to delete song");
      }
    } catch (error) {
      console.error("Error deleting song:", error);
    }
  };

  return (
    <div>
      <h2>Uploaded Songs</h2>
      <ul>
        {songs.map((song) => (
          <li key={song._id}>
            {song.songname} - {song.singer}
            <button onClick={() => deleteSong(song._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UploadedSongs;