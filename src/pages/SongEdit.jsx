import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const SongEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ title: '', file: null, albumId: '' });
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        fetchAlbums();
        if (id) {
            fetchSong();
        }
    }, [id]);

    const fetchAlbums = async () => {
        try {
            const response = await axios.get('http://localhost:3000/albums');
            setAlbums(response.data);
        } catch (error) {
            console.error('Error fetching albums:', error);
        }
    };

    const fetchSong = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/songs/${id}`);
            setFormData({
                title: response.data.title,
                file: null,
                albumId: response.data.album?.id || '',
            });
        } catch (error) {
            console.error('Error fetching song:', error);
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
        data.append('title', formData.title);
        if (formData.file) data.append('file', formData.file);
        data.append('albumId', formData.albumId);

        try {
            if (id) {
                await axios.patch(`http://localhost:3000/songs/${id}`, data);
            } else {
                await axios.post('http://localhost:3000/songs', data);
            }
            navigate('/admin/songs');
        } catch (error) {
            console.error('Error saving song:', error);
        }
    };

    return (
        <div className="p-6 bg-gray-800 rounded-lg shadow-lg max-w-lg mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-gray-100 text-center">
                {id ? 'Editar Canción' : 'Crear Canción'}
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-gray-300 font-medium mb-2">Título</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Título de la canción"
                        className="w-full p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-gray-300 font-medium mb-2">Archivo</label>
                    <input
                        type="file"
                        name="file"
                        onChange={handleChange}
                        className="w-full p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-gray-300 font-medium mb-2">Álbum</label>
                    <select
                        name="albumId"
                        value={formData.albumId}
                        onChange={handleChange}
                        className="w-full p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Seleccionar Álbum</option>
                        {albums.map((album) => (
                            <option key={album.id} value={album.id}>
                                {album.title}
                            </option>
                        ))}
                    </select>
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

export default SongEdit;