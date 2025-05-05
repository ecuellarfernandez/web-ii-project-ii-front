import React from 'react';

const GeneralCard = ({ image, title, subtitle}) => {
  console.log(image, title, subtitle);

  // Verifica si no hay contenido
  if (!image && !title && !subtitle) {
    console.log('No hay contenido disponible');
    return (
      <div className="bg-zinc-800 rounded-2xl shadow-md w-full h-full flex items-center justify-center">
        <p className="text-zinc-400 text-center">Todavía no hay contenido disponible</p>
      </div>
    );
  }

  return (
    <div className="bg-zinc-800 rounded-2xl shadow-md cursor-pointer transform transition-transform duration-300 hover:scale-97 w-full h-full">
      
        <img
          src={image ? `http://localhost:3000/${image}` : '/song-placeholder.png'}
          alt={title || 'Sin título'}
          className="w-full h-48 object-cover rounded-t-2xl"
        />
      
      <div className="p-4">
        {title && <h2 className="text-lg font-semibold truncate">{title}</h2>}
        {subtitle && <p className="text-sm text-zinc-400 truncate">{subtitle}</p>}
      </div>
    </div>
  );
};

export default GeneralCard;