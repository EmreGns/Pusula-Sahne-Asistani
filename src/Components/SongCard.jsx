const DIFFICULTY_COLORS = ['', 'text-emerald-400', 'text-lime-400', 'text-yellow-400', 'text-orange-400', 'text-red-400'];

const STATUS_CONFIG = {
  'tamamlandı':  { label: 'Tamamlandı', cls: 'bg-emerald-500/15 text-emerald-400' },
  'öğreniliyor': { label: 'Öğreniliyor', cls: 'bg-amber-500/15 text-amber-400' },
  'eklenebilir': { label: 'Eklenebilir', cls: 'bg-blue-500/15 text-blue-400' },
};

export default function SongCard({ song, onOpen }) {
  const status = STATUS_CONFIG[song.status] || STATUS_CONFIG['öğreniliyor'];
  const difficulty = song.difficulty || 0;

  return (
    <button
      onClick={() => onOpen(song)}
      className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl
                 bg-zinc-900/60 border border-zinc-800/70 hover:border-zinc-600/80
                 hover:bg-zinc-800/60 active:scale-[0.995] transition-all duration-150
                 group cursor-pointer"
    >
      {/* Şarkı adı + sanatçı */}
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-zinc-100 text-sm truncate group-hover:text-white transition-colors">
          {song.name}
        </div>
        <div className="text-xs text-zinc-500 truncate">{song.artist}</div>
      </div>

      {/* Zorluk yıldızları */}
      {difficulty > 0 && (
        <div className="flex gap-px shrink-0 hidden sm:flex">
          {[1,2,3,4,5].map(n => (
            <span key={n} className={`text-xs ${n <= difficulty ? DIFFICULTY_COLORS[difficulty] : 'text-zinc-800'}`}>★</span>
          ))}
        </div>
      )}

      {/* Durum rozeti */}
      <span className={`shrink-0 text-[11px] font-semibold px-2 py-0.5 rounded-full ${status.cls} hidden sm:inline`}>
        {status.label}
      </span>

      {/* Açma oku */}
      <svg className="shrink-0 w-4 h-4 text-zinc-600 group-hover:text-zinc-400 group-hover:translate-x-0.5 transition-all"
        fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
      </svg>
    </button>
  );
}
