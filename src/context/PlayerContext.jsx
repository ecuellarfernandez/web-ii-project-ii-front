import React, { createContext, useState } from 'react';

export const PlayerContext = createContext();

const PlayerProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);

  const playSong = (song) => {
    setCurrentSong(song);
  };

  return (
    <PlayerContext.Provider value={{ currentSong, playSong }}>
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerProvider;