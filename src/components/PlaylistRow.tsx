// src/components/PlaylistRow.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PlaylistCard from "./PlaylistCard";
import { Playlist, Track } from "@/lib/dummyData";
import { ArrowRight } from "lucide-react";

import type { Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: 50 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 70,
      damping: 12,
      duration: 1, // smoother and slightly slower
    },
  },
};

interface PlaylistRowProps extends Playlist {
  onPlay: (track: Track) => void;
  isActive?: boolean;
  onComplete?: () => void;
}

export default function PlaylistRow({
  title,
  items,
  onPlay,
  isActive = false,
  onComplete,
}: PlaylistRowProps) {
  const [expanded, setExpanded] = useState(false);
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);

  // start animation when parent marks this row active
  useEffect(() => {
    if (isActive) setStarted(true);
  }, [isActive]);

  const visibleItems = expanded ? items : items.slice(0, 5);

  return (
    <motion.section className="mb-6 w-full">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl text-white font-bold">{title}</h2>
      </div>

      {/* Animate cards appearing from right to left */}
      <motion.div
        className="flex flex-nowrap gap-4 overflow-x-auto w-full pb-2"
        variants={containerVariants}
        initial="hidden"
        animate={started ? "show" : "hidden"}
        onAnimationComplete={() => {
          // notify parent once this row's animation completes (only once)
          if (started && !completed) {
            setCompleted(true);
            onComplete?.();
          }
        }}
      >
        {visibleItems.map((item) => (
          <motion.div key={item.id} variants={itemVariants}>
            <PlaylistCard {...item} onPlay={onPlay} />
          </motion.div>
        ))}

        {!expanded && items.length > 5 && (
          <motion.div
            onClick={() => setExpanded(true)}
            className="bg-gray-800 min-w-[180px] max-w-[180px] aspect-[3/4] rounded-lg flex flex-col items-center justify-center hover:bg-neutral-700"
            aria-label="Show all playlists"
            role="button"
            tabIndex={0}
            variants={itemVariants}
          >
            <motion.div
              data-magnetic
              data-cursor="circle"
              className="w-[100px] aspect-[1/1] rounded-full bg-gray-600 flex flex-col items-center justify-center"
            >
              <ArrowRight size={32} />
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </motion.section>
  );
}
