'use client';
import { useState, useEffect } from "react";
import { Home, Search, Library } from "lucide-react";

export default function Sidebar({ className }: { className?: string }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsCollapsed(window.innerWidth < 768);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <aside
      className={
        "bg-black text-gray-300 " +
        (isCollapsed ? "w-16" : "w-64") +
        " p-4 space-y-6 h-screen fixed" +
        (className ? ` ${className}` : "")
      }
    >
      <div className="space-y-4">
        <button className="flex items-center gap-3 hover:text-white">
          <Home size={20} /> {!isCollapsed && "Home"}
        </button>
        <button className="flex items-center gap-3 hover:text-white">
          <Search size={20} /> {!isCollapsed && "Search"}
        </button>
        <button className="flex items-center gap-3 hover:text-white">
          <Library size={20} /> {!isCollapsed && "Library"}
        </button>
      </div>
    </aside>
  );
}
