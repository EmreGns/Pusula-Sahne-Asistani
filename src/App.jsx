import { useState, useEffect } from 'react';
import AnaSayfaPage from './Pages/AnaSayfaPage';
import RepertuarPage from './Pages/RepertuarPage';
import ProvalarPage from './Pages/ProvalarPage';
import SetlistPage from './Pages/SetlistPage';

const TABS = [
  { id: 'anasayfa',   label: 'Ana Sayfa' },
  { id: 'repertuvar', label: 'Repertuvar' },
  { id: 'provalar',   label: 'Provalar' },
  { id: 'setlistler', label: 'Setlistler' },
];

/* ── Inline SVG Logo ── */
function PusulaLogo() {
  return (
    <div className="w-10 h-10 rounded-full ring-2 ring-purple-500/50 shadow-lg shadow-purple-600/40 overflow-hidden shrink-0">
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <radialGradient id="bg" cx="50%" cy="35%" r="65%">
            <stop offset="0%"   stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#4c1d95" />
          </radialGradient>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#a78bfa" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="50" fill="url(#bg)" />
        <circle cx="50" cy="50" r="50" fill="url(#glow)" />
        <circle cx="50" cy="50" r="36" fill="none" stroke="#c4b5fd" strokeWidth="1" strokeOpacity="0.4" />
        <polygon points="50,14 44,52 50,47 56,52" fill="white" fillOpacity="0.95" />
        <polygon points="50,86 44,48 50,53 56,48" fill="#c4b5fd" fillOpacity="0.5" />
        <polygon points="86,50 48,44 53,50 48,56" fill="#c4b5fd" fillOpacity="0.4" />
        <polygon points="14,50 52,44 47,50 52,56" fill="#c4b5fd" fillOpacity="0.4" />
        <circle cx="50" cy="50" r="4" fill="white" fillOpacity="0.9" />
        <circle cx="50" cy="50" r="2" fill="#7c3aed" />
        <text x="50" y="11" textAnchor="middle" fontSize="7" fill="white" fillOpacity="0.8" fontFamily="sans-serif" fontWeight="bold">N</text>
      </svg>
    </div>
  );
}

/* ── LocalStorage yardımcıları ── */
function loadSongs() {
  try {
    const saved = localStorage.getItem('pusula-repertuar');
    return saved ? JSON.parse(saved) : [];
  } catch { return []; }
}

function loadProvalar() {
  try {
    const saved = localStorage.getItem('pusula-provalar');
    return saved ? JSON.parse(saved) : [];
  } catch { return []; }
}

function App() {
  const [activeTab, setActiveTab]     = useState('anasayfa');
  const [songs, setSongs]             = useState(loadSongs);
  const [editingSong, setEditingSong] = useState(null);
  const [provalar, setProvalar]       = useState(loadProvalar);

  /* Songs → LocalStorage */
  useEffect(() => {
    localStorage.setItem('pusula-repertuar', JSON.stringify(songs));
  }, [songs]);

  /* Provalar değişince güncelle (ProvalarPage kendi kaydetse de buradan da izliyoruz) */
  useEffect(() => {
    const onStorage = () => setProvalar(loadProvalar());
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  /* Song CRUD handlers */
  const handleSaveSong = (songData) => {
    if (editingSong) {
      setSongs(prev => prev.map(s => s.id === songData.id ? songData : s));
      setEditingSong(null);
    } else {
      setSongs(prev => [songData, ...prev]);
    }
  };

  const handleEditSong = (song) => {
    setEditingSong(song);
    setActiveTab('anasayfa'); // Formu göstermek için Ana Sayfa'ya geç
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteSong = (id) => {
    if (window.confirm('Bu şarkıyı silmek istediğinize emin misiniz?')) {
      setSongs(prev => prev.filter(s => s.id !== id));
      if (editingSong?.id === id) setEditingSong(null);
    }
  };

  const handleCancelEdit = () => setEditingSong(null);

  return (
    <div className="min-h-screen bg-zinc-950 font-sans text-zinc-100 flex flex-col selection:bg-purple-500/30">

      {/* ── Header ── */}
      <header className="border-b border-zinc-800/60 bg-zinc-900/40 backdrop-blur-xl px-4 sm:px-6 py-3 sticky top-0 z-20 shadow-lg shadow-black/20">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">

          {/* Logo + Başlık */}
          <div className="flex items-center gap-3 shrink-0">
            <PusulaLogo />
            <div>
              <h1 className="text-base font-bold tracking-tight text-zinc-100 leading-none">Pusula</h1>
              <p className="text-[11px] text-zinc-500 leading-none mt-0.5">Prova ve Sahnede Tek Asistanın</p>
            </div>
          </div>

          {/* Sekmeler */}
          <nav className="flex gap-1 bg-zinc-900/80 rounded-xl p-1 border border-zinc-800/60 w-full sm:w-auto">
            {TABS.map(tab => (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 sm:flex-none px-2 sm:px-4 py-2.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap min-h-[44px] sm:min-h-0
                  ${activeTab === tab.id
                    ? 'bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg shadow-purple-600/30'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'}`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* ── Ana İçerik ── */}
      <main className="flex-1 px-3 sm:px-8 py-6 sm:py-8 overflow-y-auto">
        {activeTab === 'anasayfa' && (
          <AnaSayfaPage
            songs={songs}
            editingSong={editingSong}
            onSave={handleSaveSong}
            onCancelEdit={handleCancelEdit}
            provalar={provalar}
          />
        )}
        {activeTab === 'repertuvar' && (
          <RepertuarPage
            songs={songs}
            onEdit={handleEditSong}
            onDelete={handleDeleteSong}
          />
        )}
        {activeTab === 'provalar' && (
          <ProvalarPage onProvalarChange={setProvalar} />
        )}
        {activeTab === 'setlistler' && (
          <SetlistPage songs={songs} />
        )}
      </main>

    </div>
  );
}

export default App;
