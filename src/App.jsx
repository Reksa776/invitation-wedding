// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router";
import WeddingPage from "./pages/WeddingPage";
import InputUrl from "./pages/InputUrl";
import Login from "./pages/Login";

function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  return (
    <>
      <Router>
        <Routes>
          <Route index path="/" element={<WeddingPage />} />
          <Route index path="/live-streaming" element={isLoggedIn ? <InputUrl /> : <Login />} />

        </Routes>
      </Router>
    </>
  );
}

export default App;
