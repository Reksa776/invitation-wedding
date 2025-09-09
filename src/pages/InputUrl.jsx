import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import { db } from "../database/firebaseConfig";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function InputUrl() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Ambil data pertama kali
  useEffect(() => {
    const fetchUrl = async () => {
      const querySnapshot = await getDocs(collection(db, "settings"));
      if (!querySnapshot.empty) {
        const data = querySnapshot.docs[0].data();
        setUrl(data.url || "");
      }
    };
    fetchUrl();
  }, []);

  // Simpan / Update ke Firebase
  const handleSave = async () => {
    try {
      setLoading(true);
      await setDoc(doc(db, "settings", "main"), { url }); // ID = "main"
      alert("URL berhasil disimpan/diupdate!");
    } catch (error) {
      console.error("Error menyimpan URL:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    location.reload()
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md sm:max-w-lg bg-gray-900/70 backdrop-blur-xl rounded-2xl shadow-2xl p-6 sm:p-8 relative"
      >

        <h1 className="text-2xl sm:text-3xl font-bold text-white text-center mb-6">
          🌐 Dashboard URL Manager
        </h1>

        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Masukkan URL di sini..."
          className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-indigo-500 outline-none mb-6 text-sm sm:text-base"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mt-6">
          <button
            onClick={handleSave}
            disabled={loading}
            className="w-full py-2 sm:py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition disabled:opacity-50 text-sm sm:text-base"
          >
            {loading ? "Menyimpan..." : "Simpan / Update"}
          </button>

          <button
            onClick={handleLogout}
            className="w-full py-2 sm:py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition text-sm sm:text-base"
          >
            Logout
          </button>
        </div>

        {url && (
          <p className="mt-6 text-center text-gray-400 text-sm sm:text-base break-words">
            URL Aktif:{" "}
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 underline"
            >
              {url}
            </a>
          </p>
        )}
      </motion.div>
    </div>
  );
}

export default InputUrl;
