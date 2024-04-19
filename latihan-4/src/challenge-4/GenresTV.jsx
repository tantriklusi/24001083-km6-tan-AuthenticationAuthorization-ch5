import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar"; // Import Navbar
import { useNavigate } from "react-router-dom";

const API_KEY = "acf7d069f0cf491ee86bd7170bf8a259";

const GenresTV = () => {
  const [TVGenres, setTVGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [filteredShows, setFilteredShows] = useState([]);
  const navigate = useNavigate();

  //API GENRE TV
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/genre/tv/list`, {
          params: {
            api_key: API_KEY,
          },
        });
        setTVGenres(response.data.genres);
      } catch (err) {
        console.log("error fetching data: ", err);
      }
    };
    fetchGenres();
    handleGenreChange({ target: { value: "35" } });
  }, []);

  const handleGenreChange = async (event) => {
    const genreId = event.target.value;
    console.log("genreId: ", genreId);
    setSelectedGenre(genreId);
    if (genreId) {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/discover/tv`, {
          params: {
            api_key: API_KEY,
            with_genres: genreId,
          },
        });
        setFilteredShows(response.data.results);
      } catch (err) {
        console.log("error fetching data: ", err);
      }
    } else {
      setFilteredShows([]);
    }
  };

  console.log("asdas ", TVGenres);
  return (
    <div className="text-center text-white">
      <Navbar />
      <h1 className="text-3xl font-bold mb-4">TV Genres</h1>
      <select onChange={handleGenreChange} className="select-cst px-4 py-2 mr-2 ml-2 border-2 rounded-md text-red-950">
        {TVGenres.map((genre) => (
          <option key={genre.id} value={genre.id} selected={genre.id === 35}>
            {genre.name}
          </option>
        ))}
      </select>
      <div className="grid grid-cols-5 gap-4 mt-5">
        {filteredShows.length > 0 ? (
          filteredShows.map((show) => (
            <div key={show.id} className="flex flex-col border-2 gap-y-3 max-w-[400px] min-w-[280px] max-sm:min-w-[250px] shadow-[0_0_2px_1px_rgb(0,0,0,0.3)] rounded-lg items-center">
              <div className="bg-cover min-h-[250px] w-full rounded-t-md flex flex-col items-center pt-5 relative">
                <img className="absolute -z-20 max-h-[250px] object-cover w-full top-0 left-0 filter blur-[3px]" src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`} alt="" />
                <img src={`https://image.tmdb.org/t/p/original/${show.poster_path}`} alt={show.name} className="max-w-44 rounded-sm hover:border-[10px] transition-all duration-150 ease-in" />
              </div>
              <h2 className="font-bold px-5">{show.name}</h2>
              <h2 className="font-bold px-4">Release date : {show.first_air_date}</h2>
              <h2 className="text-lg items-center font-semibold">⭐ {show?.popularity}</h2>
              <button
                className="px-4 py-2 mr-2 bg-gray-500 rounded-md hover:bg-gray-700"
                onClick={() => {
                  navigate("/detailTV", { state: { series_id: show.id } });
                }}
              >
                Detail
              </button>
            </div>
          ))
        ) : (
          <p>Tidak ada hasil yang ditemukan.</p>
        )}
      </div>
    </div>
  );
};

export default GenresTV;
