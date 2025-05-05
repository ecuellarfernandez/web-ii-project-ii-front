import React, { useState, useEffect } from 'react';
import Table from '../components/Table';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const AdminSongs = () => {
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        fetchSongs();
    }, []);

    const fetchSongs = async () => {
        const response = await axios.get('http://localhost:3000/songs');
        setSongs(response.data);
    };

    const navigate = useNavigate();

    const handleEdit = (song) => {
        navigate(`/admin/songs/${song.id}/edit`);
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:3000/songs/${id}`);
        fetchSongs();
    };

    const columns = [
        { key: 'title', label: 'Título' },
        {
            key: 'file',
            label: 'Archivo',
            render: (file) => (
                <a
                    href={`http://localhost:3000/${file}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                >
                    Descargar
                </a>
            ),
        },
        {
            key: 'album',
            label: 'Álbum',
            render: (album) => album ? album.title : 'Sin Álbum',
        },
    ];

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4 text-white">Administrar Canciones</h1>
            <Link
                to="/admin/songs/new"
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-4 inline-block"
            >
                Crear Nueva Canción
            </Link>
            <Table columns={columns} data={songs} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    );
};

export default AdminSongs;