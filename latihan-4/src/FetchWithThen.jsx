import React, { useEffect, useState } from "react";
export default function App() {
  const [data, setData] = useState([]);

  //INI ADALAH FETCH MENGGUNAKAN METHOD .then dan .catch
  //PILIH SALAH SATU, MAU PAKE THEN ATAU ASYNC AWAIT(hanya beda syntax saja. tujuanya sama)
  function fetchDataWithThen() {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((items) => {
        setData(items);
        console.log("Data received with Then:", items); //<-- ini penting buat cek data
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  useEffect(() => {
    fetchDataWithThen();
  }, []);

  return (
    <div>
      {data?.map((e) => {
        <div>{e?.title} </div>;
      })}
    </div>
  );
}
