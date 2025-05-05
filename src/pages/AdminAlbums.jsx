import React, { useState, useEffect } from "react";
import Table from "../components/Table";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const AdminAlbums = () => {
    const [albums, setAlbums] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAlbums();
    }, []);

    const fetchAlbums = async () => {
        const response = await axios.get("http://localhost:3000/albums");
        setAlbums(response.data);
    };

    const handleEdit = (album) => {
        navigate(`/admin/albums/${album.id}/edit`);
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:3000/albums/${id}`);
        fetchAlbums();
    };

    const columns = [
        { key: "title", label: "Título" },
        {
            key: "image",
            label: "Imagen",
            render: (image) => (
                <img
                    src={`http://localhost:3000/${image}`}
                    alt="Album"
                    className="w-16 h-16 object-cover rounded-xl"
                />
            ),
        },
        { key: "releaseDate", label: "Fecha de Lanzamiento" },
        {
            key: "artist",
            label: "Artista",
            render: (artist) => (artist ? artist.name : "Sin Artista"),
        }
    ];

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4 text-white">
                Administrar Álbumes
            </h1>
            <Link
                to="/admin/albums/new"
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-4 inline-block"
            >
                Crear Nuevo Álbum
            </Link>
            <Table
                columns={columns}
                data={albums}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </div>
    );
};

export default AdminAlbums;
