import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { PlayerContext } from '../context/PlayerContext';

const AlbumDetail = () => {
    const { id } = useParams(); // Obtiene el ID del álbum desde la URL
    const [album, setAlbum] = useState(null);
    const { playSong } = useContext(PlayerContext); // Contexto para manejar el reproductor

    useEffect(() => {
        fetchAlbumDetails();
    }, [id]);

    const fetchAlbumDetails = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/albums/${id}`);
            setAlbum({
                ...res.data,
                songs: res.data.songs || [], // Asegura que `songs` sea un array
            });
        } catch (err) {
            console.error('Error fetching album details:', err);
        }
    };

    if (!album) {
        return <p className="text-white text-center">Cargando detalles del álbum...</p>;
    }

    return (
        <div className="min-h-screen flex text-white">
            {/* Imagen del álbum como fondo */}
            <div
                className="w-2/3 bg-cover bg-center"
                style={{
                    backgroundImage: `url(http://localhost:3000/${album.image})`,
                }}
            ></div>

            {/* Detalles del álbum */}
            <div className="w-2/3 p-6 space-y-10">
                <h1 className="text-4xl font-bold">{album.title}</h1>
                <p className="text-lg text-white">
                    Artista: {album.artist?.name || 'Desconocido'}
                </p>
                <p className="text-lg text-white">
                    Fecha de lanzamiento: {new Date(album.releaseDate).toLocaleDateString()}
                </p>

                {/* Canciones del álbum */}
                <div className="bg-zinc-800 rounded-2xl shadow-md p-4">
                    <h2 className="text-2xl font-semibold mb-4">Canciones</h2>
                    <div className='space-y-2'>
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
                                                artistName: album.artist?.name || 'Desconocido',
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
            </div>
        </div>
    );
};

export default AlbumDetail;