// App.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEnvelopeOpen } from "react-icons/fa";
import { GoArrowRight } from "react-icons/go";
import { Layout } from "../components/Layout";
import { collection, addDoc, getDocs, serverTimestamp } from "firebase/firestore";
import { db } from "../database/firebaseConfig";

function WeddingPage() {
  const [rsvpList, setRsvpList] = useState([]);
  const [url, setUrl] = useState("");
  const [form, setForm] = useState({
    nama: "",
    ucapan: "",
    kehadiran: "Hadir",
  });
  const photos = [
    "images/memories/1.jpg",
    "images/memories/2.jpg",
    "images/memories/3.jpg",
    "images/memories/4.jpg",
    "images/memories/5.jpg",
    "images/memories/6.jpg",
    "images/memories/7.jpg",
    "images/memories/9.jpg",
    "images/memories/8.jpg",
    "images/memories/10.jpg",
    "images/memories/11.jpg",
    "images/memories/12.jpg",
    "images/memories/13.jpg",
    "images/memories/14.jpg",
  ];

  // trigger update text "x menit yang lalu"
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 60000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nama || !form.ucapan) {
      return alert("Lengkapi semua field dulu");
    }

    const newRSVP = {
      id: Date.now(),
      ...form,
      createdAt: serverTimestamp(),
    };
    await addDoc(collection(db, "rsvp"), newRSVP);
    loadRSVP();

    setRsvpList([newRSVP, ...rsvpList]);
    setForm({ nama: "", ucapan: "", kehadiran: "Hadir" });
  };

  const loadRSVP = async () => {
    const snapshot = await getDocs(collection(db, "rsvp"));
    const data = snapshot.docs.map(doc => {
      const d = doc.data();
      return {
        id: doc.id,
        ...d,
        createdAt: d.createdAt?.toDate() || new Date(), // ✅ ubah ke JS Date
      };
    });
    setRsvpList(data);
  };
  const loadRUrl = async () => {
    const querySnapshot = await getDocs(collection(db, "settings"));
      if (!querySnapshot.empty) {
        const data = querySnapshot.docs[0].data();
        setUrl(data.url || "");
      }
  };

  // hitung selisih waktu
  const timeAgo = (date) => {
    const diff = Math.floor((new Date() - new Date(date)) / 1000);
    if (diff < 60) return `${diff} detik yang lalu`;
    if (diff < 3600) return `${Math.floor(diff / 60)} menit yang lalu`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} jam yang lalu`;
    return `${Math.floor(diff / 86400)} hari yang lalu`;
  };
  const [showLanding, setShowLanding] = useState(true);
  const targetDate = new Date("2025-10-04T10:00:00").getTime(); // Tanggal acara
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((distance / (1000 * 60)) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  // 🔒 Disable klik kanan (biar ga bisa save image)
  useEffect(() => {
    const disableRightClick = (e) => e.preventDefault();
    document.addEventListener("contextmenu", disableRightClick);
    loadRSVP();
    loadRUrl();
    return () => {
      document.removeEventListener("contextmenu", disableRightClick);
    };
  }, []);

  return (
    <div className="relative w-full h-full text-white overflow-x-hidden bg-[url('/images/5backup.jpg')] bg-fixed bg-cover bg-center"

    >
      {/* Landing Page */}
      <AnimatePresence>
        {showLanding && (
          <motion.div
            key="landing"
            className="absolute inset-0 w-screen h-screen flex flex-col items-center justify-center bg-[url('/images/6.jpg')] bg-cover bg-center z-20"
            exit={{ opacity: 0, y: 200 }}
            transition={{ duration: 1 }}
          >
            <div className="text-center px-4 flex flex-col items-center justify-center h-full">
              <div className="absolute md:relative flex flex-col top-6 left-0 right-0 z-20">
                <p className="uppercase tracking-widest text-xs md:text-sm mb-2">
                  Wedding Invitation
                </p>
                <h1
                  className="text-4xl md:text-5xl font-serif mb-4"
                  style={{ fontFamily: "'Cinzel Decorative', serif" }}
                >
                  Erin <span className="font-light">&</span> Sutani
                </h1>
                <p className="text-sm md:text-lg mb-1">04 Oktober 2025</p>
                <p className="p-2 text-sm md:text-lg font-semibold">Kepada Yth :</p>
                <p className="p-2 text-sm md:text-lg mb-6">Tamu Undangan</p>
              </div>

              {/* Button Mobile */}
              <div className="block md:hidden fixed bottom-6 left-0 right-0 flex justify-center z-20">
                <button
                  onClick={() => setShowLanding(false)}
                  style={{ fontFamily: "'Cinzel', serif" }}
                  className="inline-flex text-xs items-center gap-2 px-6 py-2 bg-[#69727d] hover:bg-[#5a626b] text-white rounded-md shadow-lg transition"
                >
                  <FaEnvelopeOpen />
                  Open Invitation
                </button>
              </div>

              {/* Button Desktop */}
              <div className="hidden md:block mt-6">
                <button
                  onClick={() => setShowLanding(false)}
                  style={{ fontFamily: "'Cinzel', serif" }}
                  className="inline-flex text-sm items-center gap-2 px-6 py-3 bg-[#69727d] hover:bg-[#5a626b] text-white rounded-md shadow-lg transition"
                >
                  <FaEnvelopeOpen />
                  Open Invitation
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Page (muncul setelah landing hilang) */}
      <motion.div
        key="home"
        className="relative w-auto flex flex-col items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Layout bg=" bg-[url('/images/12.jpg')]">
          <div className="flex flex-col item-center justify-center h-screen w-full">
            <div className="flex mb-40 h-full w-full flex-col text-center justify-center">
              <p className="uppercase tracking-widest text-xs md:text-sm mb-2"> The Wedding Of </p>
              <h1 className="text-4xl md:text-5xl font-serif mb-4" style={{ fontFamily: "'Cinzel Decorative', serif" }} >
                Erin <span className="font-light">&</span> Sutani
              </h1>
              <div className="flex gap-2 justify-center items-center">
                <div className="w-full flex justify-end">
                  <div className="w-[70px] bg-white h-[1px] rounded-full"></div>
                </div>
                <p>04.10.2025</p>
                <div className="w-full flex justify-start">
                  <div className="w-[70px] bg-white h-[1px] rounded-full"></div>
                </div>
              </div>
            </div>
            <div className="w-full h-full flex justify-center items-center text-center">
              <div className="w-full text-xs md:w-[600px] px-9">
                <p style={{ fontFamily: "'Poppins', serif" }}> "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang." -- Ar-Rum 21 </p>
              </div>
            </div>
          </div>
        </Layout>

        {!showLanding && (
          <>
            <Layout bg="bg-black/40">
              <div className="h-screen flex flex-col mt-50 justify-center items-center text-center">
                <h2
                  className="text-3xl md:text-5xl font-serif"
                  style={{ fontFamily: "'Cinzel Decorative', serif" }}
                >
                  Bride & Groom
                </h2>

                <div className="relative z-10 flex flex-col items-center text-center text-white px-6">
                  {/* Foto Couple */}
                  <img
                    src="images/14.jpg"
                    alt="Bride and Groom"
                    className="w-64 h-80 object-cover rounded-2xl shadow-xl my-11"
                  />

                  {/* Nama Bride & Groom */}
                  <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-6 md:gap-12">
                    {/* Bride */}
                    <div className="space-y-2 text-center md:text-right md:w-[280px]">
                      <p
                        className="text-3xl md:text-1xl font-serif"
                        style={{ fontFamily: "'Cinzel Decorative', serif" }}
                      >
                        Erin Sat Riyani
                      </p>
                      <p className="text-sm opacity-90">
                        Putri ke-1 Bpk. Caswan & Ibu Suheni (Suraneggala)
                      </p>
                    </div>

                    {/* WITH */}
                    <div className="flex flex-row items-center gap-2">
                      {/* Garis kiri */}
                      <div className="block w-[70px] bg-white h-[1px] rounded-full"></div>
                      <p
                        className="text-2xl md:text-4xl"
                        style={{ fontFamily: "'Cinzel Decorative', serif" }}
                      >
                        WITH
                      </p>
                      {/* Garis kanan */}
                      <div className="block w-[70px] bg-white h-[1px] rounded-full"></div>
                    </div>

                    {/* Groom */}
                    <div className="space-y-2 text-center md:text-left md:w-[280px]">
                      <p
                        className="text-3xl md:text-1xl font-serif"
                        style={{ fontFamily: "'Cinzel Decorative', serif" }}
                      >
                        Sutani (Kembar)
                      </p>
                      <p className="text-sm opacity-90">
                        Putra ke-2 Bpk. Kamsia & (Kartalim) & Ny. Carsini (Sirnabaya)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Layout>


            <Layout bg="bg-black/40">
              <div className="h-full flex flex-col mt-50 justify-center items-center text-center">
                <h2
                  className="text-3xl md:text-5xl font-serif"
                  style={{ fontFamily: "'Cinzel Decorative', serif" }}
                >
                  Wedding Event
                </h2>
                <div className="flex items-center justify-center gap-3 mb-10">
                  <img
                    src="images/sampul.png"
                    alt="Side Bride Groom"
                    className="object-cover w-4xl"
                  />
                </div>

                {/* Countdown Timer */}
                <div className="flex gap-6 md:gap-16 mb-12">
                  <div className="text-center">
                    <p className="text-4xl md:text-5xl">{timeLeft.days}</p>
                    <p className="uppercase text-sm md:text-base tracking-widest">Hari</p>
                  </div>
                  <div className="text-center">
                    <p className="text-4xl md:text-5xl">{timeLeft.hours}</p>
                    <p className="uppercase text-sm md:text-base tracking-widest">Jam</p>
                  </div>
                  <div className="text-center">
                    <p className="text-4xl md:text-5xl">{timeLeft.minutes}</p>
                    <p className="uppercase text-sm md:text-base tracking-widest">Menit</p>
                  </div>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 text-center text-shadow-none px-5 text-[#4a3600] md:grid-cols-2 gap-6 max-w-4xl w-full">
                  {/* Card 1 */}
                  <div className="bg-white p-5 flex gap-4 flex-col justify-evenly items-center h-[300px] w-full rounded-lg">
                    <h3 className="text-3xl" style={{ fontFamily: "'Cinzel Decorative', serif" }}>Akad Nikah</h3>
                    <p className="text-2xl">04 Oktober 2025</p>
                    <p className="text-xl">08:00 - 11:00 WIB</p>
                    <p className="text-xs">Desa Suranenggala Blok Senin RT. 02 RW. 02 Kec. Suranenggala Kab. Cirebon</p>
                  </div>

                  {/* Card 2 */}
                  <div className="bg-white p-5 flex gap-4 flex-col justify-evenly items-center h-[300px] w-full rounded-lg">
                    <h3 className="text-3xl" style={{ fontFamily: "'Cinzel Decorative', serif" }}>Resepsi</h3>
                    <p className="text-2xl">04 Oktober 2025</p>
                    <p className="text-xl">11:00 - Selesai WIB</p>
                    <p className="text-xs">Desa Suranenggala Blok Senin RT. 02 RW. 02 Kec. Suranenggala Kab. Cirebon</p>
                  </div>
                </div>
              </div>
            </Layout>

            <Layout bg="bg-black/40">
              <div className="h-full flex flex-col mt-50 justify-center items-center text-center">
                <h2
                  className="text-3xl md:text-5xl font-serif"
                  style={{ fontFamily: "'Cinzel Decorative', serif" }}
                >
                  Live Streaming
                </h2>

                <div className="w-full p-13 flex justify-center items-center text-center">
                  <div className="w-[600px]">
                    <p className="text-xs md:text-xl">Kami juga berencana untuk mempublikasikan pernikahan kami secara virtual melalui live di Channel Youtube yang bisa anda cari</p>
                    <div className="flex text-xs md:text-xl justify-center items-center mt-6 gap-2">
                      <img src="/images/logo/icon-yt.png" width="60px" alt="" />
                      RJL PRODUCTION
                    </div>
                  </div>
                </div>


              </div>
            </Layout>

            <Layout bg="bg-black/40">
              <div className="h-full flex flex-col mt-50 justify-center items-center text-center">
                <h2
                  className="text-3xl md:text-5xl font-serif"
                  style={{ fontFamily: "'Cinzel Decorative', serif" }}
                >
                  RSVP
                </h2>
                <div className="bg-white text-shadow-none mt-10 text-black rounded-lg w-full max-w-lg p-6">

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      type="text"
                      name="nama"
                      placeholder="Nama"
                      value={form.nama}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2"
                    />
                    <textarea
                      name="ucapan"
                      placeholder="Ucapan"
                      value={form.ucapan}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2"
                    />
                    <select
                      name="kehadiran"
                      value={form.kehadiran}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2"
                    >
                      <option value="Hadir">Hadir</option>
                      <option value="Tidak Hadir">Tidak Hadir</option>
                    </select>
                    <button
                      type="submit"
                      className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
                    >
                      Kirim
                    </button>
                  </form>

                  {/* List */}
                  {/* List */}
                  <div
                    className={`mt-6 space-y-4 ${rsvpList.length > 2 ? "max-h-[200px]  overflow-y-auto  pr-2" : ""
                      }`}
                  >
                    {rsvpList.map((rsvp) => (
                      <div
                        key={rsvp.id}
                        className="border flex flex-col rounded items-start p-3 bg-gray-50 shadow-sm"
                      >
                        <div className="flex flex-col justify-between items-start">
                          <p className="font-bold text-xs">{rsvp.nama}</p>
                        </div>
                        <p className="text-sm mt-1 text-xs italic">{rsvp.ucapan}</p>
                        <p
                          className={`text-xs ${rsvp.kehadiran === "Hadir" ? "text-green-600" : "text-red-600"
                            }`}
                        >
                          {rsvp.kehadiran}
                        </p>
                        <span className="text-xs text-gray-500">
                          {timeAgo(rsvp.createdAt)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Layout>

            <Layout bg="bg-black/40">
              <div className="h-full flex flex-col mt-50 justify-center items-center text-center">
                <h2
                  className="text-3xl md:text-5xl font-serif"
                  style={{ fontFamily: "'Cinzel Decorative', serif" }}
                >
                  Our Memories
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 mt-10 gap-4 px-4 max-w-6xl w-full">
                  {photos.map((src, index) => (
                    <div
                      key={index}
                      className="relative group overflow-hidden rounded-lg shadow-lg"
                    >
                      <img
                        src={src}
                        alt={`Memory ${index + 1}`}
                        className="w-full h-48 md:h-64 object-cover transform group-hover:scale-110 transition duration-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </Layout>

            <Layout bg="bg-black/40">
              <div className="h-auto w-full flex flex-col mt-30 justify-center items-center text-center">
                <div className="h-full w-full flex flex-col justify-center items-center text-center">
                  <h2
                    className="text-3xl md:text-5xl font-serif"
                    style={{ fontFamily: "'Cinzel Decorative', serif" }}
                  >
                    Terima Kasih
                  </h2>
                  <p className="text-white mt-20 max-w-xl mb-12 text-sm md:text-base">
                    Merupakan suatu kebahagiaan dan kehormatan bagi kami, apabila
                    Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa & restu kepada Kami.
                  </p>

                  {/* Footer */}
                  <div className="text-center p-5 text-shadow-none text-black mt-10 w-full h-full  bg-white">
                    <p
                      className="text-2xl mb-2"
                      style={{ fontFamily: "'Cinzel Decorative', serif" }}
                    >
                      Created by
                    </p>
                    <p className=" text-base">
                      Yuuki | @yuuki.studio_
                    </p>
                    <p className="text-xs font-bold mt-4">
                      YUUKI © 2025 BEYONCE ELECTRONIC INVITATION ALL RIGHTS RESERVED
                    </p>
                  </div>
                </div>
              </div>
            </Layout>
          </>
        )}

      </motion.div>
    </div >
  );
}

export default WeddingPage;
