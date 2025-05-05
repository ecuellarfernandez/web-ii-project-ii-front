import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const GenreEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        image: null,
    });

    useEffect(() => {
        if (id) {
            fetchGenre();
        }
    }, [id]);

    const fetchGenre = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/genres/${id}`);
            setFormData({
                name: response.data.name,
                image: null,
            });
        } catch (error) {
            console.error('Error fetching genre:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', formData.name);
        if (formData.image) data.append('image', formData.image);

        try {
            if (id) {
                await axios.patch(`http://localhost:3000/genres/${id}`, data);
            } else {
                await axios.post('http://localhost:3000/genres', data);
            }
            navigate('/admin/genres');
        } catch (error) {
            console.error('Error saving genre:', error);
        }
    };

    return (
        <div className="p-6 bg-gray-800 rounded-lg shadow-lg max-w-lg mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-gray-100 text-center">
                {id ? 'Editar Género' : 'Crear Género'}
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-gray-300 font-medium mb-2">Nombre</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Nombre del género"
                        className="w-full p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-gray-300 font-medium mb-2">Imagen</label>
                    <input
                        type="file"
                        name="image"
                        onChange={handleChange}
                        className="w-full p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
                >
                    {id ? 'Actualizar' : 'Crear'}
                </button>
            </form>
        </div>
    );
};

export default GenreEdit;