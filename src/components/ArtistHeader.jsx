// src/components/Header.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import { FaSpotify, FaUserFriends, FaBroadcastTower, FaUser, FaMusic } from 'react-icons/fa';
import { HiOutlineArrowLeft, HiOutlineArrowRight } from 'react-icons/hi';
import { MdGraphicEq } from 'react-icons/md';
import NavButton from './NavButton';

const navItems = [
  { label: 'ARTIST', sub: 'THE WEEKND', path: '/', icon: <MdGraphicEq className="text-green-400" /> },
  { label: 'PLAYLIST', sub: "THE WEEKND'S GOLD", path: '/albumes', icon: <FaMusic className="text-white/60" /> },
  { label: 'PARTY', sub: 'Remote Play', path: '/party', icon: <FaBroadcastTower className="text-green-400" /> },
  { label: 'USER', sub: 'Arash Asghari', path: '/admin', icon: <FaUser className="text-white/60" /> },
];

const Header = () => {
  const location = useLocation();

  return (
    <header className="flex items-center justify-between px-4 py-2 backdrop-blur-md">
      <div className="flex items-center gap-4">
        <FaSpotify className="text-accent text-5xl" />
        {/* <HiOutlineArrowLeft className="text-white/60 hover:text-white cursor-pointer" />
        <HiOutlineArrowRight className="text-white/60 hover:text-white cursor-pointer" /> */}
      </div>

      <div className="flex gap-2">
        {navItems.map((item, i) => (
          <NavButton
            key={i}
            to={item.path}
            label={item.label}
            sub={item.sub}
            icon={item.icon}
            active={location.pathname === item.path}
          />
        ))}
      </div>
    </header>
  );
};

export default Header;