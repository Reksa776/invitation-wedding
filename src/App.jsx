import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WeddingPage from "./pages/WeddingPage";
import Login from "./pages/Login";
import RSVPPage from "./pages/RSVPPage";
import NotFound from "./pages/NotFound";

function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const Link = [
    { id: 1, nama: "Ega Metlaand", link: "Ega-Metlaand" },
    { id: 2, nama: "Nisma", link: "Nisma" },
    { id: 3, nama: "Ageng", link: "Ageng" },
    { id: 4, nama: "Teh Rara", link: "Teh-Rara" },
    { id: 5, nama: "Ade Metlaand", link: "Ade-Metlaand" },
    { id: 6, nama: "Tofa", link: "Tofa" },
    { id: 7, nama: "Mba Liya Syl", link: "Mba-Liya-Syl" },
    { id: 8, nama: "Rahayu", link: "Rahayu" },
    { id: 9, nama: "Teh Risma", link: "Teh-Risma" },
    { id: 10, nama: "Tohalim", link: "Tohalim" },
    { id: 11, nama: "Amey Metlaand", link: "Amey-Metlaand" },
    { id: 12, nama: "Mba Urfi", link: "Mba-Urfi" },
    { id: 13, nama: "Cindy", link: "Cindy" },
    { id: 14, nama: "Ibnu", link: "Ibnu" },
    { id: 15, nama: "Camel SMK", link: "Camel-SMK" },
    { id: 16, nama: "Lala SMK", link: "Lala-SMK" },
    { id: 17, nama: "Dea SMK", link: "Dea-SMK" },
    { id: 18, nama: "Fena SMK", link: "Fena-SMK" },
    { id: 19, nama: "Rita SMK", link: "Rita-SMK" },
    { id: 20, nama: "Rita Alfa", link: "Rita-Alfa" },
    { id: 21, nama: "Yuli SMP", link: "Yuli-SMP" },
    { id: 22, nama: "Bela", link: "Bela" },
    { id: 23, nama: "Loli", link: "Loli" },
    { id: 24, nama: "Indah Boled", link: "Indah-Boled" },
    { id: 25, nama: "Mala", link: "Mala" },
    { id: 26, nama: "Pipit", link: "Pipit" },
    { id: 27, nama: "Mba Intan", link: "Mba-Intan" },
    { id: 28, nama: "Mba Mindi", link: "Mba-Mindi" },
    { id: 29, nama: "Wulan SMK", link: "Wulan-SMK" },
    { id: 30, nama: "Ayu", link: "Ayu" },
    { id: 31, nama: "Anti", link: "Anti" },
    { id: 31, nama: "Risma", link: "Risma" },
    { id: 32, nama: "Jihan", link: "Jihan" },
    { id: 33, nama: "Shola", link: "Shola" },
    { id: 34, nama: "Hilda", link: "Hilda" },
    { id: 35, nama: "Umi Khoriyah", link: "Umi-Khoriyah" },
    { id: 36, nama: "Mang'E", link: "Mang'E" },
    { id: 37, nama: "Meyyes", link: "Meyyes" },
  ];

  return (
    <Router>
      <Routes>
        {/* Dynamic routes for each guest */}
        {Link.map((L) => (
          <Route
            key={L.id}
            path={`/${L.link}`}
            element={<WeddingPage names={L.nama} />}
          />
        ))}
        <Route path="/" element={<WeddingPage />} />

        {/* Special route */}
        <Route
          path="/live-streaming"
          element={isLoggedIn ? <RSVPPage /> : <Login />}
        />

        {/* Catch-all 404 route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
