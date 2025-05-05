// src/components/NavButton.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NavButton = ({ to, label, sub, icon, active }) => {
  return (
    <Link
      to={to}
      className={`px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wide flex items-center gap-2 transition duration-200 border border-white/10 w-[200px] justify-between ${
        active ? 'bg-gradient-to-r from-green-600/80 to-green-400/90 text-white shadow-md' : 'bg-zinc-800 text-white/80 hover:bg-zinc-700'
      }`}
    >
      <div className="flex flex-col">
        <span className="text-[10px] font-bold text-white/60 leading-tight">{label}</span>
        <span className="text-[11px] font-semibold truncate leading-tight">{sub}</span>
      </div>
      {icon}
    </Link>
  );
};

export default NavButton;