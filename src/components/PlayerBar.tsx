import { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
} from "lucide-react";
import { motion } from "framer-motion";

interface PlayerBarProps {
  currentTrack: {
    cover: string;
    title: string;
    artist: string;
    audioUrl: string;
  } | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function PlayerBar({
  currentTrack,
  isPlaying,
  onTogglePlay,
  onNext,
  onPrev,
}: PlayerBarProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      setCurrentTime(0);
    }
  }, [currentTrack]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
    };

    const setAudioDuration = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", setAudioDuration);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", setAudioDuration);
    };
  }, [audioRef, currentTrack]);

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handlePrev = () => {
    onPrev();
  };

  const handleNext = () => {
    onNext();
  };

  return (
    <div className="bg-neutral-800 p-4 flex items-center justify-between w-full fixed bottom-0 left-0 z-50">
      {/* Left: Loop & Remix */}
      {currentTrack && (
        <div className="flex items-center space-x-3">
          <img
            src={currentTrack.cover}
            alt={currentTrack.title}
            className="w-12 h-12 rounded"
          />
          <div>
            <div className="text-white">{currentTrack.title}</div>
            <div className="text-gray-400 text-sm">{currentTrack.artist}</div>
          </div>
        </div>
      )}

      {/* Middle: Controls & Audio */}
      <div className="flex flex-col items-center flex-1 mx-4">
        <div className="flex items-center space-x-4 mb-1">
          <motion.button
            data-magnetic
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePrev}
            aria-label="Previous Track"
            className="text-white cursor-default"
          >
            <SkipBack size={20} />
          </motion.button>
          <motion.button
            data-magnetic
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={onTogglePlay}
            aria-label={isPlaying ? "Pause" : "Play"}
            className="text-white"
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </motion.button>
          <motion.button
            data-magnetic
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleNext}
            aria-label="Next Track"
            className="text-white"
          >
            <SkipForward size={20} />
          </motion.button>
        </div>
        <div className="w-full max-w-[340px] mx-auto h-1 bg-gray-600 relative mt-2 rounded">
          <motion.div
            className="h-1 bg-white rounded"
            style={{
              width: duration ? `${(currentTime / duration) * 100}%` : "0%",
            }}
            animate={{
              width: duration ? `${(currentTime / duration) * 100}%` : "0%",
            }}
            transition={{ ease: "linear", duration: 0.2 }}
          />
        </div>
        {/* <div className="flex justify-between text-xs text-gray-400 w-full mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div> */}
      </div>

      {/* Right: Cover & Info */}
      <div className="flex items-center space-x-3">
        <motion.button
          data-magnetic
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Loop"
          className="text-white"
        >
          <Repeat size={20} />
        </motion.button>
        <motion.button
          data-magnetic
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Remix"
          className="text-white"
        >
          <Shuffle size={20} />
        </motion.button>
      </div>

      {currentTrack && <audio ref={audioRef} src={currentTrack.audioUrl} />}
    </div>
  );
}
