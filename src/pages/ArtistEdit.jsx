import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ArtistEdit = () => {
    const { id } = useParams(); // Obtiene el ID de la URL
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '', image: null, genres: [] });
    const [genres, setGenres] = useState([]); // Lista de géneros disponibles

    useEffect(() => {
        fetchGenres(); // Obtiene la lista de géneros
        if (id) {
            fetchArtist(); // Obtiene los datos del artista si se está editando
        }
    }, [id]);

    const fetchGenres = async () => {
        try {
            const response = await axios.get('http://localhost:3000/genres');
            setGenres(response.data); // Guarda la lista de géneros
        } catch (error) {
            console.error('Error fetching genres:', error);
        }
    };

    const fetchArtist = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/artists/${id}`);
            setFormData({
                name: response.data.name,
                image: null,
                genres: response.data.genres.map((genre) => genre.id), // Obtiene solo los IDs de los géneros
            });
        } catch (error) {
            console.error('Error fetching artist:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    };

    const handleGenresChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions);
        const selectedIds = selectedOptions.map((option) => parseInt(option.value, 10));
        setFormData({ ...formData, genres: selectedIds });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', formData.name);
        if (formData.image) data.append('image', formData.image);
        data.append('genreIds', JSON.stringify(formData.genres));

        try {
            if (id) {
                await axios.patch(`http://localhost:3000/artists/${id}`, data);
            } else {
                await axios.post('http://localhost:3000/artists', data);
            }
            navigate('/admin/artists');
        } catch (error) {
            console.error('Error saving artist:', error);
        }
    };

    return (
        <div className="p-6 bg-gray-800 rounded-lg shadow-lg max-w-lg mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-gray-100 text-center">
                {id ? 'Editar Artista' : 'Crear Artista'}
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-gray-300 font-medium mb-2">Nombre</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Nombre del artista"
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
                <div>
                    <label className="block text-gray-300 font-medium mb-2">Géneros</label>
                    <select
                        name="genres"
                        multiple
                        value={formData.genres}
                        onChange={handleGenresChange}
                        className="w-full p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {genres.map((genre) => (
                            <option key={genre.id} value={genre.id}>
                                {genre.name}
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

export default ArtistEdit;