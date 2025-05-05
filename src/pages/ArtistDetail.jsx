import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { PlayerContext } from '../context/PlayerContext';

const ArtistDetail = () => {
  const { id } = useParams(); // Obtiene el ID del artista desde la URL
  const [artist, setArtist] = useState(null);
  const { playSong } = useContext(PlayerContext); // Contexto para manejar el reproductor

  useEffect(() => {
    fetchArtistDetails();
  }, [id]);

  const fetchArtistDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/artists/${id}`);
      setArtist(res.data); // Guarda los detalles del artista
    } catch (err) {
      console.error('Error fetching artist details:', err);
    }
  };

  if (!artist) {
    return <p className="text-white text-center">Cargando detalles del artista...</p>;
  }

  return (
    <div className="min-h-screen flex text-white">
      {/* Imagen del artista como fondo */}
      <div
        className="w-1/3 bg-cover bg-center"
        style={{
          backgroundImage: `url(http://localhost:3000/${artist.image})`,
        }}
      ></div>

      {/* Detalles del artista */}
      <div className="w-2/3 p-6 space-y-10">
        <h1 className="text-4xl font-bold">{artist.name}</h1>

        {/* Álbumes y canciones */}
        {artist.albums.map((album) => (
          <div key={album.id} className="bg-zinc-800 rounded-2xl shadow-md p-4">
            <div className="flex items-center space-x-4">
              <img
                src={`http://localhost:3000/${album.image}`}
                alt={album.title}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div>
                <h2 className="text-2xl font-semibold">{album.title}</h2>
                <p className="text-sm text-zinc-400">
                  Fecha de lanzamiento: {new Date(album.releaseDate).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Canciones del álbum */}
            <div className="mt-4 space-y-2">
              {album.songs.length > 0 ? (
                album.songs.map((song) => (
                  <div
                    key={song.id}
                    className="flex justify-between items-center bg-zinc-700 rounded-lg p-2"
                  >
                    <p className="text-sm">{song.title}</p>
                    <button
                      onClick={() =>
                        playSong({
                          title: song.title,
                          file: song.file,
                          albumImage: album.image,
                          artistName: artist.name,
                        })
                      }
                      className="text-accent text-sm"
                    >
                      ▶️ Reproducir
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-sm text-zinc-400">No hay canciones en este álbum.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtistDetail;