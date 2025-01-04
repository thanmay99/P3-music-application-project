import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Change here
import { MusicContext } from "../Context";
import PinnedMusic from "./PinnedMusic";
import LikedMusic from "./LikedMusic";
import "./Navbar.css";
import CreatePlaylist from './CreatePlaylist'; // Import CreatePlaylist component

const Navbar = ({ keyword, handleKeyPress, setKeyword, fetchMusicData }) => {
  const { setResultOffset } = useContext(MusicContext);
  const musicContext = useContext(MusicContext);
  const likedMusic = musicContext.likedMusic;
  const pinnedMusic = musicContext.pinnedMusic;

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate(); // Change here

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = () => {
    // Perform logout logic here (e.g., clearing session, localStorage)
    navigate("/signup"); // Change here: use navigate instead of history.push
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false); // Close the modal without any changes
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-custom sticky-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <i className="bi bi-music-note-list mx-2"></i>Spotify Like
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="d-flex w-100 justify-content-center">
              <input
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                onKeyDown={handleKeyPress}
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                onClick={() => {
                  setResultOffset(0);
                  fetchMusicData();
                }}
                className="btn btn-outline-success"
              >
                Search
              </button>
            </div>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <button
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  className="btn btn-outline-success btn-sm mx-1"
                >
                  <i className="bi bi-pin-angle-fill"></i> {pinnedMusic.length}
                </button>
              </li>
              <li className="nav-item">
                <button
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#likedMusicModal"
                  className="btn btn-outline-success btn-sm mx-1"
                >
                  <i className="bi bi-heart-fill"></i> {likedMusic.length}
                </button>
              </li>
              <li className="nav-item">
                <button
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#createPlaylistModal"
                  className="btn btn-outline-primary btn-sm mx-1"
                >
                  Create Playlist
                </button>
              </li>
              <li className="nav-item">
                <button
                  onClick={handleLogout}
                  className="btn btn-outline-danger btn-sm mx-1"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div
        className="modal fade modal-xl"
        id="exampleModal"
        tabIndex={1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Pinned Music
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <PinnedMusic />
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade modal-xl"
        id="likedMusicModal"
        tabIndex={1}
        aria-labelledby="likedMusicModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="likedMusicModalLabel">
                Liked Music
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <LikedMusic />
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="createPlaylistModal"
        tabIndex={-1}
        aria-labelledby="createPlaylistModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="createPlaylistModalLabel">
                Create New Playlist
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <CreatePlaylist />
            </div>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="modal show" tabIndex="-1" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Logout</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleLogoutCancel}
                />
              </div>
              <div className="modal-body">
                <p>Are you sure you want to log out?</p>
              </div>
              <div className="modal-footer">
                <button
                  onClick={handleLogoutCancel}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogoutConfirm}
                  className="btn btn-danger"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
