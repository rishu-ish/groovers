export default function Navbar() {
  return (
    <nav className="p-4 bg-neutral-900 text-white flex justify-between items-center">
      <h1 className="text-2xl font-bold">Groovers</h1>
      <div className="space-x-4">
        <button className="px-3 py-1 bg-white text-black rounded-full">Sign Up</button>
        <button className="px-3 py-1 border border-white rounded-full">Log In</button>
      </div>
    </nav>
  );
}