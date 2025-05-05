import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '../components/Table'
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminArtists = () => {
    const [artists, setArtists] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        fetchArtists();
    }, []);

    const fetchArtists = async () => {
        const response = await axios.get('http://localhost:3000/artists');
        setArtists(response.data);
    };

    const handleEdit = (artist) => {
        navigate(`/admin/artists/${artist.id}/edit`);
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:3000/artists/${id}`);
        fetchArtists();
    };

    const columns = [
        { key: 'name', label: 'Nombre' },
        {
            key: 'image',
            label: 'Imagen',
            render: (image) => (
                <img
                    src={`http://localhost:3000/${image}`}
                    alt="Artist"
                    className="w-16 h-16 object-cover rounded-xl"
                />
            ),
        },
        {
            key:'genres', label:'Géneros', 
            render: (genres) => genres.map((genre) => genre.name).join(', ')
        },
    ];

    return (
        <div className="p-4">
        <h1 className="text-2xl font-bold mb-4 text-white">Administrar Artistas</h1>
        <Link
          to="/admin/artists/new"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-4 inline-block"
        >
          Crear Nuevo Artista
        </Link>
        <Table columns={columns} data={artists} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    );
};

export default AdminArtists;