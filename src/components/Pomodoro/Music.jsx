import { useEffect, useRef, useState } from 'react';
import '../../styles/Music.css';
import { CiPlay1, CiPause1 } from "react-icons/ci";
import bird from "../../assets/birds.mp3";
import nature from "../../assets/nature-dreamscape.mp3";

function Music() {
  const playlist = [
    { title: 'Birds Chirping', src: bird },
    { title: 'Dreamscape', src: nature },
  ];

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(() =>
    Math.floor(Math.random() * playlist.length)
  );

  const audioRefs = useRef(playlist.map(track => new Audio(track.src)));
  const intervalRef = useRef(null);
  const holdTimer = useRef(null);
  const revertTimer = useRef(null);

  const handlePlayPause = (index) => {
    const currentAudio = audioRefs.current[index];

    if (currentTrackIndex !== index && currentTrackIndex !== null) {
      const prevAudio = audioRefs.current[currentTrackIndex];
      prevAudio.pause();
      prevAudio.currentTime = 0;
    }

    if (isPlaying && currentTrackIndex === index) {
      currentAudio.pause();
      clearInterval(intervalRef.current);
      setIsPlaying(false);
    } else {
      currentAudio.loop = true;
      currentAudio.play();
      setCurrentTrackIndex(index);
      setIsPlaying(true);

      intervalRef.current = setInterval(() => {
        setProgress(currentAudio.currentTime);
      }, 500);
    }
  };

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    const currentAudio = audioRefs.current[currentTrackIndex];
    currentAudio.currentTime = newTime;
    setProgress(newTime);
  };

  const handleHoldStart = () => {
    holdTimer.current = setTimeout(() => {
      setShowProgress(true);
      revertTimer.current = setTimeout(() => {
        setShowProgress(false);
      }, 3000);
    }, 1000);
  };

  const handleHoldEnd = () => {
    clearTimeout(holdTimer.current);
  };

  useEffect(() => {
    const crnt = audioRefs.current;
    return () => {
      crnt.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
      });
      clearInterval(intervalRef.current);
      clearTimeout(holdTimer.current);
      clearTimeout(revertTimer.current);
    };
  }, []);

  return (
    <div className="music-wrapper">
      <div
        className="music-track"
        onMouseDown={handleHoldStart}
        onMouseUp={handleHoldEnd}
        onMouseLeave={handleHoldEnd}
        onTouchStart={handleHoldStart}
        onTouchEnd={handleHoldEnd}
      >
        <button onClick={() => handlePlayPause(currentTrackIndex)} className="play-btn-wrapper">
          {isPlaying ? <CiPause1 className="icon" /> : <CiPlay1 className="icon" />}
        </button>

        {showProgress ? (
          <input
            type="range"
            className="progress-bar"
            min="0"
            max={audioRefs.current[currentTrackIndex]?.duration || 0}
            value={progress}
            onChange={handleSeek}
          />
        ) : (
          <div 
            className="track-title"
            onMouseDown={handleHoldStart}
            onMouseUp={handleHoldEnd}
            onMouseLeave={handleHoldEnd}
            onTouchStart={handleHoldStart}
            onTouchEnd={handleHoldEnd}
          >{playlist[currentTrackIndex]?.title}</div>
        )}
      </div>
    </div>
  );
}

export default Music;
