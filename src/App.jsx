// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router";
import WeddingPage from "./pages/WeddingPage";
import Login from "./pages/Login";
import RSVPPage from "./pages/RSVPPage";

function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  return (
    <>
      <Router>
        <Routes>
          <Route index path="/" element={<WeddingPage />} />
          <Route index path="/live-streaming" element={isLoggedIn ? <RSVPPage /> : <Login />} />

        </Routes>
      </Router>
    </>
  );
}

export default App;
