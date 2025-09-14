// RSVPPage.jsx
import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../database/firebaseConfig";
import { useNavigate } from "react-router-dom";

function RSVPPage() {
  const [rsvpList, setRsvpList] = useState([]);
  const navigate = useNavigate();

  // Ambil data RSVP dari Firestore
  const loadRSVP = async () => {
    const snapshot = await getDocs(collection(db, "rsvp"));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setRsvpList(data);
  };

  useEffect(() => {
    loadRSVP();
  }, []);

  // Fungsi hapus satu RSVP
  const handleDeleteOne = async (id) => {
    const confirmDelete = window.confirm("Hapus data ini?");
    try {
      if (confirmDelete) {
      await deleteDoc(doc(db, "rsvp", id))
      setRsvpList((prev) => prev.filter((rsvp) => rsvp.id !== id));
    }
    } catch (error) {
      console.log(error);
      
    }
  };

  // Logout user dari Firebase Auth
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    location.reload();
  };


  return (
    <div className="p-6 text-white bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Daftar RSVP</h1>

      {rsvpList.length === 0 ? (
        <p>Tidak ada data RSVP.</p>
      ) : (
        <div className="space-y-4">
          {rsvpList.map((rsvp) => (
            <div
              key={rsvp.id}
              className="bg-white text-black rounded p-4 flex flex-col md:flex-row md:justify-between md:items-center"
            >
              <div>
                <p><strong>Nama:</strong> {rsvp.nama}</p>
                <p><strong>Ucapan:</strong> {rsvp.ucapan}</p>
                <p><strong>Kehadiran:</strong> {rsvp.kehadiran}</p>
              </div>
              <div className="mt-2 md:mt-0">
                <button
                  onClick={() => handleDeleteOne(rsvp.id)}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white text-sm"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-10">
        <button
          onClick={handleLogout}
          className="bg-gray-700 hover:bg-gray-800 px-4 py-2 rounded text-white"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default RSVPPage;
