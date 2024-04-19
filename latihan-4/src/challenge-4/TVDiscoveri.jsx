import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const TVDiscoveri = () => {
  const API_KEY = "acf7d069f0cf491ee86bd7170bf8a259";
  const [discoveriTV, setDiscoveriTV] = useState([]);
  const navigate = useNavigate();

  //API TV DISCOVER
  useEffect(() => {
    const fetchTV = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc`, {
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

  return (
    <div className="text-center text-white">
      <Navbar />
      <h1 className="text-3xl font-bold mb-4">Discover TV</h1>
      <div className="grid grid-cols-5 gap-4 mt-5 px-16 py-8">
        {discoveriTV.map((show) => (
          <div key={show.id} className="flex flex-col border-2  gap-y-3 max-w-[400px] min-w-[280px] max-sm:min-w-[250px] shadow-[0_0_2px_1px_rgb(0,0,0,0.3)] rounded-lg items-center">
            <div className="bg-cover min-h-[250px] w-full rounded-t-md flex flex-col items-center pt-5 relative">
              <img src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`} alt="" className="absolute -z-20 max-h-[250px] object-cover w-full top-0 left-0 filter blur-[3px]" />
              <img src={`https://image.tmdb.org/t/p/original/${show.poster_path}`} alt={show.title} className="max-w-44 rounded-sm hover:border-[10px] transition-all duration-150 ease-in" />
            </div>
            <h2 className="font-bold px-5">{show.name}</h2>
            <h2 className="font-bold px-5">Release date : {show.first_air_date}</h2>
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

export default TVDiscoveri;
