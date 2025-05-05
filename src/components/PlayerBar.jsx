import React, { useContext, useRef, useState } from 'react';
import { PlayerContext } from '../context/PlayerContext';

const PlayerBar = () => {
    const { currentSong } = useContext(PlayerContext);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef(null);

    const handlePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime);
    };

    const handleLoadedMetadata = () => {
        setDuration(audioRef.current.duration);
    };

    const handleSeek = (e) => {
        const seekTime = e.target.value;
        audioRef.current.currentTime = seekTime;
        setCurrentTime(seekTime);
    };

    return (
        <div className="fixed bottom-0 left-0 w-full bg-zinc-900 text-white p-4 flex flex-col space-y-2">
            {/* Información de la canción */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    {currentSong && (
                        <>
                            <img
                                src={`http://localhost:3000/${currentSong.albumImage}`}
                                alt={currentSong.title}
                                className="w-12 h-12 object-cover rounded"
                            />
                            <div>
                                <h3 className="text-sm font-semibold">{currentSong.title}</h3>
                                <p className="text-xs text-zinc-400">{currentSong.artistName}</p>
                            </div>
                        </>
                    )}
                </div>

                {/* Controles de reproducción */}
                <div className="flex items-center space-x-4">
                    <button
                        onClick={handlePlayPause}
                        className="bg-zinc-700 p-2 rounded-full hover:bg-zinc-600"
                    >
                        {isPlaying ? '⏸️' : '▶️'}
                    </button>
                </div>
            </div>

            {/* Barra de progreso */}
            <div className="flex items-center space-x-4">
                <span className="text-xs text-zinc-400">
                    {new Date(currentTime * 1000).toISOString().substr(14, 5)}
                </span>
                <input
                    type="range"
                    min="0"
                    max={duration}
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full h-1 bg-zinc-700 rounded appearance-none cursor-pointer"
                />
                <span className="text-xs text-zinc-400">
                    {new Date(duration * 1000).toISOString().substr(14, 5)}
                </span>
            </div>

            {/* Elemento de audio */}
            <audio
                ref={audioRef}
                src={currentSong ? `http://localhost:3000/${currentSong.file}` : ''}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
            />
        </div>
    );
};

export default PlayerBar;