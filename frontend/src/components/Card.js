import React, { useContext, useState } from 'react';
import { MusicContext } from '../Context'; 
import { Modal, Button, Dropdown } from 'react-bootstrap'; // Import Dropdown from react-bootstrap
import './Card.css'; 

export default function Card({ element, isPlaylistSong, playlistName, removeSongFromPlaylist }) {
  const { likedMusic, setLikedMusic, pinnedMusic, setPinnedMusic } = useContext(MusicContext); 
  const [showModal, setShowModal] = useState(false);
  const [isLiked, setIsLiked] = useState(likedMusic.some((item) => item.id === element.id)); // Local state for like
  const [isPinned, setIsPinned] = useState(pinnedMusic.some((item) => item.id === element.id)); // Local state for pin

  // Handle the pinning functionality
  const handlePin = () => {
    let storedPinnedMusic = JSON.parse(localStorage.getItem("pinnedMusic")) || [];
    if (storedPinnedMusic.some((item) => item.id === element.id)) {
      const updatedPinnedMusic = storedPinnedMusic.filter(
        (item) => item.id !== element.id
      );
      setPinnedMusic(updatedPinnedMusic);
      localStorage.setItem("pinnedMusic", JSON.stringify(updatedPinnedMusic));
      setIsPinned(false); // Update local state
    } else {
      const updatedPinnedMusic = [...storedPinnedMusic, element];
      setPinnedMusic(updatedPinnedMusic);
      localStorage.setItem("pinnedMusic", JSON.stringify(updatedPinnedMusic));
      setIsPinned(true); // Update local state
    }
  };

  // Handle like/unlike functionality
  const handleLike = () => {
    let storedLikedMusic = JSON.parse(localStorage.getItem("likedMusic")) || [];
    if (storedLikedMusic.some((item) => item.id === element.id)) {
      const updatedLikedMusic = storedLikedMusic.filter(
        (item) => item.id !== element.id
      );
      setLikedMusic(updatedLikedMusic);
      localStorage.setItem("likedMusic", JSON.stringify(updatedLikedMusic));
      setIsLiked(false); // Update local state
    } else {
      const updatedLikedMusic = [...storedLikedMusic, element];
      setLikedMusic(updatedLikedMusic);
      localStorage.setItem("likedMusic", JSON.stringify(updatedLikedMusic));
      setIsLiked(true); // Update local state
    }
  };

  // Show/close modal for more song details
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // Generate a unique key for each card element
  const generateUniqueKey = (element) => {
    return element.id || `${element.songname}-${element.albumname}-${Math.random().toString(36).substr(2, 9)}`;
  };

  const uniqueKey = generateUniqueKey(element);

  const addToPlaylist = (playlistName) => {
    let currentPlaylist = JSON.parse(localStorage.getItem("allPlaylist"));
    currentPlaylist[playlistName].push(element);
    localStorage.setItem("allPlaylist", JSON.stringify(currentPlaylist));
  };

  return (
    <>
      <div key={uniqueKey} className="col-lg-3 col-md-6 py-2 d-flex align-items-stretch">
        <div className="card bg-dark text-white shadow-lg d-flex flex-column">
          <img
            src={`http://localhost:5001${element.image || '/placeholder.png'}`}
            className="card-img-top"
            alt={element.singer || "Unknown Artist"}
          />
          <div className="card-body d-flex flex-column">
            <h5 className="card-title d-flex justify-content-between align-items-center">
              <span onClick={handleShowModal} className="song-title">
                {element.songname || "Unknown Song"}
              </span>
              <div className="add-options d-flex align-items-center">
                <button onClick={handlePin} className="btn btn-sm mx-1">
                  <i
                    className={`bi ${isPinned ? "bi-pin-angle-fill" : "bi-pin-angle"} text-white`}
                  ></i>
                </button>
                <button onClick={handleLike} className="btn btn-sm">
                  <i
                    className={`bi ${isLiked ? "bi-heart-fill text-danger" : "bi-heart text-white"}`}
                  ></i>
                </button>
                {!isPlaylistSong && (
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      Add to Playlist
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {Object.keys(JSON.parse(localStorage.getItem("allPlaylist"))).map((playlist) => (
                        <Dropdown.Item key={playlist} onClick={() => addToPlaylist(playlist)}>
                          {playlist}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                )}
                {isPlaylistSong && (
                  <button onClick={() => removeSongFromPlaylist(element)} className="btn btn-danger btn-sm mx-1">
                    Remove
                  </button>
                )}
              </div>
            </h5>
            <p className="card-text">{`Artist: ${element.singer || 'Unknown Artist'}`}</p>
            <p className="card-text">{`Album: ${element.albumname || 'Unknown Album'}`}</p>
            <p className="card-text">{`Release Year: ${element.releaseyear || 'Unknown Year'}`}</p>
            <div className="audio-controls mt-auto">
              <audio src={`http://localhost:5001${element.url}`} controls className="w-100"></audio>
            </div>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal} centered className="modal-sm">
        <Modal.Header closeButton className="bg-dark text-white">
          <Modal.Title>{element.songname || "Unknown Song"}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-white">
          <img
            src={`http://localhost:5001${element.image || '/placeholder.png'}`}
            alt={element.singer || "Song Image"}
            className="img-fluid mb-3"
          />
          <div className="audio-controls">
            <audio src={`http://localhost:5001${element.url}`} controls className="w-100"></audio>
          </div>
        </Modal.Body>
        <Modal.Footer className="bg-dark">
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}