"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import PlaylistRow from "@/components/PlaylistRow";
import PlayerBar from "@/components/PlayerBar";
import { playlists, Track } from "@/lib/dummyData";
import Cursor from "@/components/Cursor";

export default function Home() {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeRow, setActiveRow] = useState(0);

  useEffect(() => {
    // Check initial width
    const handleResize = () => {
      setIsCollapsed(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Pass playlist and onTrackChange for PlayerBar navigation
  const flatPlaylist = playlists.flatMap((list) => list.items);
  const handlePlay = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    // Optionally, could track the playlist context here if needed in the future
  };

  const handleTogglePlay = () => setIsPlaying((prev) => !prev);
  // sequential row animation: index of the currently animating row
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-neutral-900 min-h-screen flex relative"
    >
      <Sidebar className="z-10" />
      <div
        className={`flex-1 flex flex-col overflow-x-auto mb-10 ${
          isCollapsed ? "ml-16" : "ml-64"
        }`}
      >
        <Navbar />
        <div className="p-6 space-y-6 overflow-y-auto w-full">
          {playlists.map((list, index) => (
            <div key={list.title}>
              <PlaylistRow
                title={list.title}
                items={list.items}
                onPlay={handlePlay}
                // this makes the row start animating when it's the activeRow
                isActive={index === activeRow}
                onComplete={() => {
                  // advance to the next row only if this row was the active one
                  if (index === activeRow) setActiveRow((prev) => prev + 1);
                }}
              />
            </div>
          ))}
        </div>
        <PlayerBar
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          onTogglePlay={handleTogglePlay}
          onNext={() => {
            if (!currentTrack) return;
            const currentIndex = flatPlaylist.findIndex(
              (t) => t.id === currentTrack.id
            );
            const nextIndex = (currentIndex + 1) % flatPlaylist.length;
            setCurrentTrack(flatPlaylist[nextIndex]);
            setIsPlaying(true);
          }}
          onPrev={() => {
            if (!currentTrack) return;
            const currentIndex = flatPlaylist.findIndex(
              (t) => t.id === currentTrack.id
            );
            const prevIndex =
              (currentIndex - 1 + flatPlaylist.length) % flatPlaylist.length;
            setCurrentTrack(flatPlaylist[prevIndex]);
            setIsPlaying(true);
          }}
          // Future enhancement: pass entire
          // playlist={flatPlaylist}
          // onTrackChange={handlePlay}
          // className="z-20"
        />
      </div>
      <Cursor magnetic={true} />
    </motion.main>
  );
}
