import React, { useState, useEffect } from 'react';
import Table from '../components/Table';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const AdminGenres = () => {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        fetchGenres();
    }, []);

    const fetchGenres = async () => {
        const response = await axios.get('http://localhost:3000/genres');
        setGenres(response.data);
    };

    const navigate = useNavigate();

    const handleEdit = (genre) => {
        navigate(`/admin/genres/${genre.id}/edit`);
    }

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:3000/genres/${id}`);
        fetchGenres();
    };

    const columns = [
        { key: 'name', label: 'Nombre' },
        {
            key: 'image',
            label: 'Imagen',
            render: (image) => (
                <img
                    src={`http://localhost:3000/${image}`}
                    alt="Genre"
                    className="w-16 h-16 object-cover rounded-xl"
                />
            ),
        },
    ];

    return (
        <div className="p-4">
        <h1 className="text-2xl font-bold mb-4 text-white">Administrar Géneros</h1>
        <Link
          to="/admin/genres/new"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-4 inline-block"
        >
          Crear Nuevo Género
        </Link>
        <Table columns={columns} data={genres} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    );
};

export default AdminGenres;