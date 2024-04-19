import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { HiHome } from "react-icons/hi2";
import GoogleLogin from "./GoogleLogin";
import { BsPeopleFill } from "react-icons/bs";
import { IoMdEyeOff } from "react-icons/io";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userdata, setUserData] = useState();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegistrationClick = () => {
    // Navigasi ke halaman registrasi
    navigate("/register");
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setError("username dan password belum diisi!");
      return;
    }

    try {
      // Kirim permintaan login
      const response = await axios.post(
        "https://shy-cloud-3319.fly.dev/api/v1/auth/login",
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Cek status respons
      if (response.status === 200) {
        const token = response.data.data.token;

        // Simpan token ke local storage
        localStorage.setItem("token", token);

        // Panggil endpoint /auth/me untuk mendapatkan detail pengguna
        const userDataResponse = await axios.get("https://shy-cloud-3319.fly.dev/api/v1/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Cek status respons dan ambil data pengguna
        if (userDataResponse.status === 200) {
          const userData = userDataResponse.data.data;

          // Simpan data pengguna
          setUserData(userData);

          // Tampilkan alert dan navigasi ke halaman utama
          alert(`Login sukses! Selamat datang, ${userData.name}!`);
          navigate("/");
        } else {
          alert("Gagal mengambil data pengguna setelah login. Silakan coba lagi.");
        }
      } else {
        alert("Terjadi kesalahan saat login. Silakan coba lagi.");
      }
    } catch (error) {
      // Penanganan error
      console.error("Error:", error.message);
      if (error.response && error.response.status === 401) {
        setError("Email atau kata sandi yang dimasukkan salah.");
        setPassword("");
      } else {
        alert("Terjadi kesalahan saat melakukan login. Silakan coba lagi.");
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-black to-red-600 flex flex-col h-screen items-center justify-center">
      <div className="border-2 p-12 rounded-lg shadow-lg bg-white flex flex-col items-center">
        <h1 className="text-2xl mb-4 font-bold text-center">Login</h1>
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <div className="mb-6 w-full">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <div className="flex items-center shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <BsPeopleFill className="mr-2" /> {/* Ikon diletakkan di sebelah kiri input */}
              <input id="email" type="text" className="w-full focus:outline-none" placeholder="email" value={email} onChange={handleEmailChange} />
            </div>
          </div>
          <div className="mb-6 w-full">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <div className="flex items-center shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <IoMdEyeOff className="mr-2" /> {/* Ikon diletakkan di sebelah kiri input */}
              <input className="w-full focus:outline-none" id="password" type="password" placeholder="password" value={password} onChange={handlePasswordChange} />
            </div>
          </div>
          <button type="submit" className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 mb-2 rounded focus:outline-none focus:shadow-outline w-full">
            Login Now
          </button>
          <p className="text-gray-500 font-semibold mb-2">
            Not Registered?
            <span onClick={handleRegistrationClick} className="text-blue-500 hover:text-blue-800 cursor-pointer ml-1">
              Create Account
            </span>
          </p>
        </form>
        {error && <div className="text-red-500 mt-4">{error}</div>}
        <p className="mb-2 font-semibold text-gray-500">--- or --- </p>
        <GoogleLogin />
        <div>
          <Link to="/">
            <HiHome href="#" className="text-light w-full my-2" style={{ fontSize: "28px", color: "blue" }} />
          </Link>
        </div>
      </div>
    </div>
  );
}
