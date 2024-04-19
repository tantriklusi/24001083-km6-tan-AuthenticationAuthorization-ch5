import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const API_KEY = "acf7d069f0cf491ee86bd7170bf8a259";

const TrendingTV = () => {
  const [trendingTV, setTrendingTV] = useState([]);
  const [selectTime, setSelectTime] = useState("day");
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  //API TRENDING TV
  useEffect(() => {
    const fetchTV = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/trending/tv/${selectTime}?language=en-US`, {
          params: {
            api_key: API_KEY,
          },
        });
        setTrendingTV(response.data.results);
      } catch (err) {
        console.log("error fetching data: ", err);
      }
    };
    fetchTV();
  }, [selectTime]);

  //API SEARCH TV
  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&language=en-US&query=${query}`);
        setSearchResults(response.data.results);
      } catch (err) {
        console.log("error fetching search results: ", err);
      }
    };

    if (query) {
      fetchSearchResults();
    } else {
      setSearchResults([]);
    }
  }, [query]);

  const handleTime = (event) => {
    setSelectTime(event.target.value);
  };

  const handleSearch = (event) => {
    setQuery(event.target.value);
  };

  const handleClear = () => {
    setQuery("");
    alert("Yakin mau dihapus nih??");
  };

  return (
    <div className="text-center text-white">
      <Navbar />
      <h1 className="text-3xl font-bold mb-4">Trending TV</h1>
      <div className="flex justify-center mb-4">
        <input type="text" value={query} onChange={handleSearch} placeholder="Search TV Shows" className="border border-gray-500 rounded-md px-20 py-2 mr-2 text-black" />
        <button onClick={handleClear} className="px-4 py-2 bg-gray-500 rounded-md hover:bg-gray-700">
          Clear
        </button>
        <select onChange={handleTime} className="select-cst px-4 py-2 mr-2 ml-2 border-2 rounded-md text-red-950">
          <option value="day">Today</option>
          <option value="week">This Week</option>
        </select>
      </div>
      <div className="grid grid-cols-5 gap-4 mt-5 px-16 py-8">
        {(query ? searchResults : trendingTV).map((show) => (
          <div key={show.id} className="flex flex-col border-2 gap-y-2 max-w-[400px] min-w-[280px] max-sm:min-w-[250px] shadow-[0_0_2px_1px_rgb(0,0,0,0.3)] rounded-lg items-center">
            <div className="bg-cover min-h-[250px] w-full rounded-t-md flex flex-col items-center pt-2 relative">
              <img className="absolute -z-20 max-h-[250px] object-cover w-full top-0 left-0 filter blur-[3px]" src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`} alt="" />
              <img src={`https://image.tmdb.org/t/p/original/${show.poster_path}`} alt={show.title} className="max-w-44 rounded-sm hover:border-[10px] transition-all duration-150 ease-in" />
            </div>
            <h2 className="font-bold px-4">{show.name}</h2>
            <h2 className="font-bold px-4">Release date : {show.first_air_date}</h2>
            <h2 className="text-lg font-semibold ">⭐ {show?.vote_average.toFixed(1)}</h2>
            <button
              className="px-4 py-2 mr-2 bg-gray-500 rounded-md hover:bg-gray-700"
              onClick={() => {
                navigate("/detailTV", { state: { series_id: show.id } });
              }}
            >
              Detail
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingTV;
