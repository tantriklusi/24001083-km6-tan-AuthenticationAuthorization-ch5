import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link, useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../App.css";

export default function HomePage({ isLoggedIn }) {
  const API_KEY = "acf7d069f0cf491ee86bd7170bf8a259";
  const [data, setData] = useState([]);
  const [trending, setTrending] = useState([]);
  const [selectTime, setSelectTime] = useState("week");
  const [discoveriTV, setDiscoveriTV] = useState([]);
  const [onairTV, setOnairTV] = useState([]);
  const [currentMovie, setCurrentMovie] = useState(0);
  const [people, setPeople] = useState();
  const [userData, setUserData] = useState("");
  const navigate = useNavigate();

  // TRENDING TV
  useEffect(() => {
    const fetchTV = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/trending/tv/${selectTime}?language=en-US`, {
          params: { api_key: API_KEY },
        });
        setTrending(response.data.results);
        setData(response.data.results);
      } catch (err) {
        console.log("Error fetching data: ", err);
      }
    };
    fetchTV();
  }, [selectTime]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMovie((prevMovie) => (prevMovie + 1) % data.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [data]);

  //TV DISCOVERI
  useEffect(() => {
    const fetchTV = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/discover/tv`, {
          params: {
            api_key: API_KEY,
          },
        });
        setDiscoveriTV(response.data.results);
      } catch (err) {
        console.log("error fetching data: ", err);
      }
    };
    fetchTV();
  }, []);

  //POPULAR PEOPLE
  useEffect(() => {
    const fetchTV = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}&language=en-US`);
        setPeople(response.data.results);
      } catch (err) {
        console.log("error fetching data: ", err);
      }
    };
    fetchTV();
  }, []);

  //ON AIR TV
  useEffect(() => {
    const fetchTV = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/tv/on_the_air?language=en-US`, {
          params: {
            api_key: API_KEY,
          },
        });
        setOnairTV(response.data.results);
      } catch (err) {
        console.log("error fetching data: ", err);
      }
    };
    fetchTV();
  }, []);

  //GET USER DATA
  async function fetchUserData(token) {
    try {
      const response = await axios.get("https://shy-cloud-3319.fly.dev/api/v1/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      //logging the response data to see its structure
      console.log("Respon Data:", response.data);

      if (response.status === 200) {
        setUserData(response.data);
        console.log("User data:", response.data);
        return response.data;
      } else {
        console.log("Failed to fetch user data");
        return null;
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserData(token);
    }
  }, []);

  async function getUserData(setIsLoggedIn) {
    const token = localStorage.getItem("token");
    try {
      const userData = await fetchUserData(token);
      if (userData) {
        setUserData(userData);
        setIsLoggedIn(false);
        console.log("User data:", userData);
      } else {
        console.log("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

  // Slider settings
  const sliderSettings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <>
      <div className="carousel">
        {data.map((movie, index) => (
          <div
            key={index}
            className={`carousel-slide ${index === currentMovie ? "show" : ""}`}
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
            }}
          >
            <div>
              {/* Navbar */}
              <Navbar />
            </div>
            <div className="overlay flex flex-col mb-36">
              <h1 className="text-5xl font-bold whitespace-normal max-w-sm mb-3 text-white">{movie.name}</h1>
            </div>
          </div>
        ))}
      </div>
      <div>
        {isLoggedIn && userData && <h2 className="text-2xl text-white font-black my-4 text-center">Welcome {userData.name}!!</h2>}
        <div className="slider-container px-16 bg-zinc-950">
          <h2 className="text-2xl text-white font-black my-4"> TV Trending </h2>
          <Slider {...sliderSettings}>
            {trending?.map((show) => (
              <div key={show?.id} onClick={() => {}}>
                <Link to={"/detailhome"} state={{ series_id: show?.id }}>
                  <div className="flex justify-center">
                    <img src={`https://image.tmdb.org/t/p/w500${show.backdrop_path}`} alt={show.name} />
                  </div>
                </Link>
              </div>
            ))}
          </Slider>
          <h2 className="text-2xl text-white font-black my-4"> People </h2>
          <Slider {...sliderSettings}>
            {people?.map((e) => (
              <div key={people?.id}>
                <div className="flex justify-center">
                  <img src={`https://image.tmdb.org/t/p/w500${e.profile_path}`} />
                </div>
              </div>
            ))}
          </Slider>
          <h2 className="text-2xl text-white font-black my-4">TV Discover</h2>
          <Slider {...sliderSettings}>
            {discoveriTV.map((show) => (
              <div key={show?.id} onClick={() => {}}>
                <Link to={"/detailhome"} state={{ series_id: show?.id }}>
                  <div className="flex justify-center">
                    <img src={`https://image.tmdb.org/t/p/w500${show.backdrop_path}`} alt={show.name} />
                  </div>
                </Link>
              </div>
            ))}
          </Slider>
          <h2 className="text-2xl text-white font-black my-4">On Air TV</h2>
          <Slider {...sliderSettings}>
            {onairTV.map((show) => (
              <div key={show?.id} onClick={() => {}}>
                <Link to={"/detailhome"} state={{ series_id: show?.id }}>
                  <div className="flex justify-center">
                    <img src={`https://image.tmdb.org/t/p/w500${show.backdrop_path}`} alt={show.name} />
                  </div>
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </>
  );
}
