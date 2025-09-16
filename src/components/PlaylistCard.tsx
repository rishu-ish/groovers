import { motion } from "framer-motion";
import { Track } from "@/lib/dummyData";

interface PlaylistCardProps extends Track {
  onPlay: (track: Track) => void;
}

export default function PlaylistCard({
  cover,
  title,
  artist,
  onPlay,
  ...track
}: PlaylistCardProps) {
  return (
    <motion.div
      data-magnetic
      className="bg-neutral-800 min-w-[180px] max-w-[180px] rounded-lg p-3 hover:bg-neutral-700 overflow-x-hidden"
      onClick={() => onPlay({ cover, title, artist, ...track })}
    >
      <motion.img
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        src={cover}
        alt={title}
        className="rounded-lg w-full h-40 object-cover"
      />
      <h3 className="text-white font-bold mt-2 truncate">{title}</h3>
      <p className="text-gray-400 text-sm truncate">{artist}</p>
    </motion.div>
  );
}
