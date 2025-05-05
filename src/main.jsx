import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AppLayout from './components/AppLayout';
import GenreDetail from './pages/GenreDetail';
import ArtistDetail from './pages/ArtistDetail';
import PlayerProvider from './context/PlayerContext';
import AdminDashboard from './pages/AdminDashboard';
import AdminArtists from './pages/AdminArtists';
import AdminSongs from './pages/AdminSongs';
import AdminAlbums from './pages/AdminAlbums';
import AdminGenres from './pages/AdminGenres';
import ArtistEdit from './pages/ArtistEdit';
import AlbumEdit from './pages/AlbumEdit';
import GenreEdit from './pages/GenreEdit';
import SongEdit from './pages/SongEdit';
import AlbumDetail from './pages/AlbumDetail';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PlayerProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="genres/:id" element={<GenreDetail />} />
            <Route path="artists/:id" element={<ArtistDetail />} />
            <Route path="albums/:id" element={<AlbumDetail />} />

            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/artists" element={<AdminArtists />} />
            <Route path="/admin/artists/new" element={<ArtistEdit />} />
            <Route path="/admin/artists/:id/edit" element={<ArtistEdit />} />
            <Route path="/admin/songs" element={<AdminSongs />} />
            <Route path="/admin/songs/new" element={<SongEdit />} />
            <Route path="/admin/songs/:id/edit" element={<SongEdit />} />
            <Route path="/admin/albums" element={<AdminAlbums />} />
            <Route path="/admin/albums/new" element={<AlbumEdit />} />
            <Route path="/admin/albums/:id/edit" element={<AlbumEdit />} />
            <Route path="/admin/genres" element={<AdminGenres />} />
            <Route path="/admin/genres/new" element={<GenreEdit />} />
            <Route path="/admin/genres/:id/edit" element={<GenreEdit />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </PlayerProvider>
  </StrictMode>
);