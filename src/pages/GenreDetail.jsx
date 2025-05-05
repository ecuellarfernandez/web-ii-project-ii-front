import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import GeneralCard from '../components/GeneralCard';

const GenreDetail = () => {
  const { id } = useParams();
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    fetchGenreDetails();
  }, [id]);

  const fetchGenreDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/genres/${id}`);
      setGenre(res.data);
    } catch (err) {
      console.error('Error fetching genre details:', err);
    }
  };

  if (!genre) {
    return <p className="text-white text-center">Cargando detalles del género...</p>;
  }

  return (
    <div className="min-h-screen text-white p-6">
      <h1 className="text-3xl font-bold mb-6">{genre.name}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {genre.artists.map((artist) => (
          <Link to={`/artists/${artist.id}`} key={artist.id}>
            <GeneralCard
              image={artist.image}
              title={artist.name}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GenreDetail;