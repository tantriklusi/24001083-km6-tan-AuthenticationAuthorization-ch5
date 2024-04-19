import react, { useEffect, useState } from "react";
export default function fetchwithasyncawait() {
  const [data, setData] = useState([]);

  async function fetchdatawithasyncawait() {
    try {
      const response = await fetch("https:/digimon-api.vercel.app/api/digimon");
      if (!response.ok) {
        throw new error("failed to fetch data");
      }
      const items = await response.json();
      console.log("data received with async/await", data);
      setData(items);
    } catch (error) {
      console.error("Error", error);
    }
  }
  useEffect(() => {
    fetchdatawithasyncawait();
  }, []);
  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        {data?.map((e, i) => (
          <div key={i}>
            <div>{e?.name}</div>
            <div>{e?.level}</div>
            <div>{e?.img}</div>
            <img src={e?.img} />
          </div>
        ))}
      </div>
    </div>
  );
}
