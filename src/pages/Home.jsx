// src/pages/Home.jsx
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import HorizontalList from '../components/HorizontalList';
import { PlayerContext } from '../context/PlayerContext';

const Home = () => {
  const [genres, setGenres] = useState([]);
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [songs, setSongs] = useState([]);
  const { playSong } = useContext(PlayerContext);

  useEffect(() => {
    fetchGenres();
    fetchArtists();
    fetchAlbums();
    fetchSongs();
  }, []);

  const fetchGenres = async () => {
    try {
      const res = await axios.get('http://localhost:3000/genres');
      setGenres(res.data);
    } catch (err) {
      console.error('Error fetching genres:', err);
    }
  };

  const fetchArtists = async () => {
    try {
      const res = await axios.get('http://localhost:3000/artists');
      setArtists(res.data);
    } catch (err) {
      console.error('Error fetching artists:', err);
    }
  };

  const fetchAlbums = async () => {
    try {
      const res = await axios.get('http://localhost:3000/albums');
      setAlbums(res.data);
    } catch (err) {
      console.error('Error fetching albums:', err);
    }
  };

  const fetchSongs = async () => {
    try {
      const res = await axios.get('http://localhost:3000/songs');
      setSongs(res.data);
    } catch (err) {
      console.error('Error fetching songs:', err);
    }
  };

  return (
    <div id='top' className="min-h-screen text-white p-6 space-y-10">
      <div>
        <h1 className="text-2xl font-bold mb-4">Géneros Musicales</h1>
        <HorizontalList
          items={genres}
          getTitle={(item) => item.name}
          getImage={(item) => item.image}
          getLink={(item) => `/genres/${item.id}`}
        />
      </div>

      <div>
        <h1 id='artists' className="text-2xl font-bold mb-4">Artistas</h1>
        <HorizontalList
          items={artists}
          getTitle={(item) => item.name}
          getImage={(item) => item.image}
          getLink={(item) => `/artists/${item.id}`}
        />
      </div>

      <div>
        <h1 id='albums' className="text-2xl font-bold mb-4">Álbumes</h1>
        <HorizontalList
          items={albums}
          getTitle={(item) => item.title}
          getSubtitle={(item) => item.artist.name}
          getImage={(item) => item.image}
          getLink={(item) => `/albums/${item.id}`}
        />
      </div>

      <div className="min-h-screen text-white p-6 space-y-10">
      <h1 id='songs' className="text-2xl font-bold mb-4">Canciones</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {songs.map((song) => (
          <div
            key={song.id}
            className="bg-zinc-800 rounded-2xl shadow-md p-4 flex flex-col items-center text-center"
          >
            <h2 className="text-lg font-semibold">{song.title}</h2>
            <button
              onClick={() =>
                playSong({
                  title: song.title,
                  file: song.file,
                  albumImage: song.album?.image || '/song-placeholder.png',
                  artistName: song.album?.title || 'Desconocido',
                })
              }
              className="mt-2 bg-accent text-black px-4 py-2 rounded-lg"
            >
              ▶️ Reproducir
            </button>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Home;
