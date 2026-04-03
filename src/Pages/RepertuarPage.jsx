import { useState } from 'react';
import SongCard from '../Components/SongCard';
import SongDetailModal from '../Components/SongDetailModal';

function ChevronIcon({ open }) {
  return (
    <svg className={`w-4 h-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
      fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function SongGroup({ title, icon, badge, badgeColor, borderColor, accentColor, songs, onOpen, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section className="rounded-2xl border border-zinc-800/60 overflow-hidden">
      {/* Grup Başlığı — tıklanabilir */}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-3 px-5 py-4 bg-zinc-900/70 hover:bg-zinc-900 transition-colors text-left"
      >
        <span className={`w-2 h-2 rounded-full shrink-0 ${accentColor}`} />
        <span className="text-sm font-bold text-zinc-200 flex-1">{icon} {title}</span>
        <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${badgeColor}`}>
          {badge}
        </span>
        <span className="text-zinc-500">
          <ChevronIcon open={open} />
        </span>
      </button>

      {/* Şarkı Listesi */}
      {open && (
        <div className={`border-t ${borderColor} divide-y divide-zinc-800/40 px-3 py-2 space-y-1`}>
          {songs.length === 0 ? (
            <p className="text-zinc-600 text-sm text-center py-5 italic">Bu grupta henüz şarkı yok.</p>
          ) : (
            songs.map(song => (
              <SongCard key={song.id} song={song} onOpen={onOpen} />
            ))
          )}
        </div>
      )}
    </section>
  );
}

export default function RepertuarPage({ songs, onEdit, onDelete }) {
  const [search, setSearch] = useState('');
  const [selectedSong, setSelectedSong] = useState(null);

  // Arama filtresi
  const q = search.toLowerCase().trim();
  const filtered = q
    ? songs.filter(s =>
        s.name.toLowerCase().includes(q) ||
        s.artist.toLowerCase().includes(q) ||
        (s.genre || '').toLowerCase().includes(q)
      )
    : songs;

  const tamamlananlar = filtered.filter(s => s.status === 'tamamlandı');
  const calisilanlar  = filtered.filter(s => s.status === 'öğreniliyor');
  // Şarsı Havuzu = tüm şarkılar (her statüden)
  const havuz         = filtered;

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 pb-12">

      {/* Başlık */}
      <div>
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-300">
          Repertuvar
        </h2>
        <p className="text-zinc-500 text-sm mt-1">
          Toplam {songs.length} şarkı · Tamamlanan {songs.filter(s=>s.status==='tamamlandı').length} · Çalışılan {songs.filter(s=>s.status==='öğreniliyor').length} · Eklenebilir {songs.filter(s=>s.status==='eklenebilir').length}
        </p>
      </div>

      {/* Arama Çubuğu */}
      {songs.length > 0 && (
        <div className="relative">
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none"
            fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Şarkı adı, sanatçı veya tür ara…"
            className="w-full bg-zinc-900/60 border border-zinc-800 rounded-xl pl-10 pr-10 py-2.5 text-sm text-zinc-100
                       placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50
                       focus:border-purple-500 transition-all"
          />
          {search && (
            <button onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          )}
        </div>
      )}

      {/* Boş durum */}
      {songs.length === 0 ? (
        <div className="text-center py-20 rounded-3xl border border-dashed border-zinc-800 bg-zinc-900/20">
          <div className="text-5xl mb-4 opacity-20">🎵</div>
          <h3 className="text-xl font-medium text-zinc-400 mb-2">Repertuvar boş</h3>
          <p className="text-zinc-600 text-sm">Ana Sayfa'dan şarkı ekleyerek başlayabilirsiniz.</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-14 text-zinc-600 text-sm">
          <div className="text-3xl mb-3 opacity-30">🔍</div>
          <p>«{search}» için sonuç bulunamadı.</p>
          <button onClick={() => setSearch('')} className="mt-2 text-purple-400 hover:text-purple-300 text-xs underline">
            Aramayı temizle
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <SongGroup
            title="Tamamlanan Şarkılar"
            icon="✅"
            badge={`${tamamlananlar.length} şarkı`}
            badgeColor="bg-emerald-500/15 text-emerald-400"
            borderColor="border-emerald-800/30"
            accentColor="bg-emerald-500"
            songs={tamamlananlar}
            onOpen={setSelectedSong}
          />
          <SongGroup
            title="Çalışılan Şarkılar"
            icon="⏳"
            badge={`${calisilanlar.length} şarkı`}
            badgeColor="bg-amber-500/15 text-amber-400"
            borderColor="border-amber-800/30"
            accentColor="bg-amber-500"
            songs={calisilanlar}
            onOpen={setSelectedSong}
          />
          <SongGroup
            title="Şarkı Havuzu"
            icon="🎵"
            badge={`${havuz.length} şarkı`}
            badgeColor="bg-blue-500/15 text-blue-400"
            borderColor="border-blue-800/30"
            accentColor="bg-blue-500"
            songs={havuz}
            onOpen={setSelectedSong}
          />
        </div>
      )}

      {/* Detay Modalı */}
      {selectedSong && (
        <SongDetailModal
          song={selectedSong}
          onClose={() => setSelectedSong(null)}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
    </div>
  );
}
