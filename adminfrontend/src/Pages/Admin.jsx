import React from "react";
import "./CSS/Admin.css";
import Sidebar from "../Components/Sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import AddSong from "../Components/Addsong/AddSong";
import UploadedSongs from "../Components/UploadedSongs/UploadedSongs"; // Import the new component

const Admin = () => {
  return (
    <div className="admin">
      <Sidebar />
      <Routes>
        <Route path="/addsong" element={<AddSong />} />
        <Route path="/uploadedsongs" element={<UploadedSongs />} /> {/* Add the new route */}
      </Routes>
    </div>
  );
};

export default Admin;