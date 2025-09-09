import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Hardcode user & pass
  const validUser = "admin";
  const validPass = "theworldinyourhand";

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === validUser && password === validPass) {
      localStorage.setItem("isLoggedIn", "true"); // simpan session
      location.reload();
    } else {
      alert("Username atau password salah!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">
      <div className="bg-gray-900/70 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-full max-w-md relative">
        {/* Tombol Back ke Home */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 left-4 px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm transition"
        >
          ⬅ Home
        </button>

        <h1 className="text-3xl text-white font-bold text-center mb-6">🔐 Login</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            className="px-4 py-3 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="px-4 py-3 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-semibold"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
