import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [anunturi, setAnunturi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnunturi = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/anunturi");
        setAnunturi(res.data);
      } catch (err) {
        setError("Eroare la încărcarea anunțurilor");
      } finally {
        setLoading(false);
      }
    };

    fetchAnunturi();
  }, []);

  if (loading) return <p>Se încarcă anunțurile...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Lista Anunțuri</h2>
      {anunturi.length === 0 && <p>Nu există anunțuri postate.</p>}
      <ul>
        {anunturi.map((anunt) => (
          <li key={anunt._id}>
            <h3>{anunt.titlu}</h3>
            <p>{anunt.descriere}</p>
            <p>Preț: {anunt.pret} RON</p>
            <small>Postat la: {new Date(anunt.dataPostarii).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
