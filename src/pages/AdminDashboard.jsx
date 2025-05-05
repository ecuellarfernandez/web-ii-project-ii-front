import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4 text-white">Panel de Administración</h1>
            <div className="grid grid-cols-2 gap-4">
                <Link
                    to="/admin/artists"
                    className="block bg-blue-500 text-white text-center py-4 rounded hover:bg-blue-600"
                >
                    Administrar Artistas
                </Link>
                <Link
                    to="/admin/albums"
                    className="block bg-green-500 text-white text-center py-4 rounded hover:bg-green-600"
                >
                    Administrar Álbumes
                </Link>
                <Link
                    to="/admin/songs"
                    className="block bg-purple-500 text-white text-center py-4 rounded hover:bg-purple-600"
                >
                    Administrar Canciones
                </Link>
                <Link
                    to="/admin/genres"
                    className="block bg-yellow-500 text-white text-center py-4 rounded hover:bg-yellow-600"
                >
                    Administrar Géneros
                </Link>
            </div>
        </div>
    );
};

export default AdminDashboard;