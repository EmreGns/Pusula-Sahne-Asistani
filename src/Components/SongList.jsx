import SongCard from "./SongCard";

export default function SongList({ songs, onEdit, onDelete }) {
  if (!songs || songs.length === 0) {
    return (
      <div className="w-full text-center py-12 px-4 rounded-3xl bg-zinc-900/30 border border-zinc-800/50 border-dashed backdrop-blur-sm">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-zinc-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
        <h3 className="text-xl font-medium text-zinc-300">Henüz şarkı eklenmedi</h3>
        <p className="text-zinc-500 mt-2">Repertuarınıza yeni şarkılar ekleyerek listeyi doldurun.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-zinc-100 mb-6 flex items-center gap-3">
        Repertuar Listesi
        <span className="bg-purple-500/20 text-purple-400 text-sm py-1 px-3 rounded-full font-medium">
          {songs.length} Şarkı
        </span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {songs.map(song => (
          <SongCard
            key={song.id}
            song={song}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
