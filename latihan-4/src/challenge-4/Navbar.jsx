import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [more, setMore] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Mengubah status login berdasarkan keberadaan token
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false); // Mengubah status login menjadi false saat logout
    alert("Apakah anda yakin ingin logout?");
  };

  return (
    <nav className="pt-2 pb-2 px-2 w-full z-5 bg-white bg-opacity-50">
      <div className="text-red-800 flex justify-between text-xl px-8 py-8">
        <p className="flex items-center text-3xl">
          <Link to="/" className="text-5xl font-bold font-sans">
            {/* <img src="https://cdn6.f-cdn.com/contestentries/1133045/25197601/59badfd1555fc_thumb900.jpg" alt="Logo" className="w-10 h-10 mr-2" /> */}
            <strong>TVidio</strong>
          </Link>
        </p>
        <div className="container flex justify-end items-center">
          <ul className="flex justify-center align-center">
            <li>
              <Link to="/" className="mx-5 hover:underline hover:text-white font-bold">
                Home
              </Link>
            </li>
            {!isLoggedIn && (
              <li>
                <Link to="/login" className="mx-5 hover:underline hover:text-white font-bold">
                  Login
                </Link>
              </li>
            )}
            {isLoggedIn && (
              <>
                <li>
                  <Link to="/trendingTV" className="mx-2 hover:underline hover:text-white font-bold">
                    Trending TV
                  </Link>
                </li>
                <li>
                  <Link to="/genre" className="mx-2 hover:underline hover:text-white font-bold">
                    Genre
                  </Link>
                </li>
                {more ? (
                  <>
                    <li>
                      <Link to="/people" className="mx-2 py-2 hover:underline hover:text-white font-bold">
                        People
                      </Link>
                    </li>
                    <li>
                      <Link to="/onair" className="mx-2 py-2 hover:underline hover:text-white font-bold">
                        On Air TV
                      </Link>
                    </li>
                    <li>
                      <Link to="/discover" className="mx-2 py-2 hover:underline hover:text-white font-bold">
                        Discover TV
                      </Link>
                    </li>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setMore(true);
                    }}
                    className="mx-2 hover:underline hover:text-white font-bold"
                  >
                    More
                  </button>
                )}
                <li>
                  <Link to="/login" onClick={handleLogout} className="mx-5 hover:underline hover:text-white font-bold">
                    Logout
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
