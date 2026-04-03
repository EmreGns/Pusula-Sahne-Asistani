import { useEffect, useState } from 'react';

const DIFFICULTY_COLORS = ['', 'text-emerald-400', 'text-lime-400', 'text-yellow-400', 'text-orange-400', 'text-red-400'];
const DIFFICULTY_LABELS = ['', 'Çok Kolay', 'Kolay', 'Orta', 'Zor', 'Çok Zor'];

const STATUS_CONFIG = {
  'tamamlandı':  { label: 'Tamamlandı ✅', cls: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' },
  'öğreniliyor': { label: 'Öğreniliyor ⏳', cls: 'bg-amber-500/15 text-amber-400 border-amber-500/30' },
  'eklenebilir': { label: 'Eklenebilir 🎵', cls: 'bg-blue-500/15 text-blue-400 border-blue-500/30' },
};

const ROLES = [
  { id: 'vocal', label: 'Vokal', icon: '🎤' },
  { id: 'guitar', label: 'Gitar', icon: '🎸' },
  { id: 'bass', label: 'Bas Gitar', icon: '🎸' },
  { id: 'drum', label: 'Bateri', icon: '🥁' },
];

export default function SongDetailModal({ song, onClose, onEdit, onDelete }) {
  const status = STATUS_CONFIG[song.status] || STATUS_CONFIG['öğreniliyor'];
  const difficulty = song.difficulty || 0;
  
  const notes = song.notes || { vocal: song.lyrics || '', guitar: '', bass: '', drum: '' };

  const [activeNoteTab, setActiveNoteTab] = useState('vocal');
  const [lyricsFullscreen, setLyricsFullscreen] = useState(false);

  // ESC tuşuyla kapat
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') {
        if (lyricsFullscreen) setLyricsFullscreen(false);
        else onClose();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, lyricsFullscreen]);

  // Scroll kilitle
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleDelete = () => {
    onClose();
    onDelete(song.id);
  };

  const handleEdit = () => {
    onClose();
    onEdit(song);
  };

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-8"
      onClick={onClose}
    >
      {/* Blur arka plan */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal kutu */}
      <div
        className="relative z-10 w-full max-w-lg max-h-[95vh] sm:max-h-[90vh] flex flex-col rounded-t-3xl sm:rounded-3xl
                   bg-zinc-900 border border-zinc-700/80 shadow-[0_0_80px_-10px_rgba(0,0,0,0.8)]
                   overflow-hidden animate-in fade-in slide-in-from-bottom-4 sm:zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative p-6 pb-4 border-b border-zinc-800">
          {/* Kapat butonu */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
            title="Kapat (ESC)"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>

          {/* Başlık */}
          <h2 className="text-2xl font-extrabold text-white pr-8 leading-tight">{song.name}</h2>
          <p className="text-purple-400 font-medium mt-1">{song.artist}</p>

          {/* Rozetler */}
          <div className="flex flex-wrap items-center gap-2 mt-3">
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${status.cls}`}>
              {status.label}
            </span>
            {difficulty > 0 && (
              <span className="flex items-center gap-1">
                <span className="flex gap-0.5">
                  {[1,2,3,4,5].map(n => (
                    <span key={n} className={`text-sm ${n <= difficulty ? DIFFICULTY_COLORS[difficulty] : 'text-zinc-700'}`}>★</span>
                  ))}
                </span>
                <span className={`text-xs font-medium ${DIFFICULTY_COLORS[difficulty]}`}>
                  {DIFFICULTY_LABELS[difficulty]}
                </span>
              </span>
            )}
          </div>
        </div>

        {/* İçerik (scrollable) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Teknik Bilgiler */}
          {(song.bpm || song.key || song.genre) && (
            <div className="grid grid-cols-3 gap-3">
              {song.bpm && (
                <div className="bg-zinc-800/60 rounded-xl p-3 text-center">
                  <div className="text-xs text-zinc-500 mb-1 font-medium uppercase tracking-wide">BPM</div>
                  <div className="text-lg font-bold text-zinc-100">{song.bpm}</div>
                </div>
              )}
              {song.key && (
                <div className="bg-zinc-800/60 rounded-xl p-3 text-center">
                  <div className="text-xs text-zinc-500 mb-1 font-medium uppercase tracking-wide">Ton</div>
                  <div className="text-lg font-bold text-zinc-100">{song.key}</div>
                </div>
              )}
              {song.genre && (
                <div className="bg-zinc-800/60 rounded-xl p-3 text-center">
                  <div className="text-xs text-zinc-500 mb-1 font-medium uppercase tracking-wide">Tür</div>
                  <div className="text-sm font-bold text-zinc-100 truncate">{song.genre}</div>
                </div>
              )}
            </div>
          )}

          {/* Rol Bazlı Notlar */}
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              {ROLES.map(role => (
                <button
                  key={role.id}
                  onClick={() => setActiveNoteTab(role.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all
                    ${activeNoteTab === role.id 
                      ? 'bg-purple-500/20 text-purple-400 border border-purple-500/50' 
                      : 'bg-zinc-800/60 border border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700'}`}
                >
                  <span className="text-sm">{role.icon}</span> {role.label}
                </button>
              ))}
              {/* Büyüt ikonu */}
              <button
                onClick={() => setLyricsFullscreen(true)}
                className="ml-auto p-1.5 rounded-lg text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
                title="Tam ekran"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </button>
            </div>

            {notes[activeNoteTab] ? (
              <div className="bg-zinc-950/60 border border-zinc-800 rounded-xl p-4 text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap break-words max-h-60 overflow-y-auto">
                {notes[activeNoteTab]}
              </div>
            ) : (
              <div className="text-center py-6 text-zinc-600 px-4 border border-zinc-800/50 bg-zinc-950/30 rounded-xl text-sm italic">
                Bu rol için henüz not eklenmemiş.
              </div>
            )}
          </div>

          {/* ── Fullscreen Sözler Overlay ── */}
          {lyricsFullscreen && (
            <div
              className="fixed inset-0 z-[60] flex flex-col bg-zinc-950/98 backdrop-blur-md"
              onClick={() => setLyricsFullscreen(false)}
            >
              {/* Üst bar */}
              <div
                className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-zinc-800 shrink-0 bg-zinc-900/50"
                onClick={e => e.stopPropagation()}
              >
                <div className="flex-1 flex items-center gap-2 overflow-x-auto no-scrollbar pr-4">
                  {ROLES.map(role => (
                    <button
                      key={role.id}
                      onClick={() => setActiveNoteTab(role.id)}
                      className={`flex items-center shrink-0 gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all
                        ${activeNoteTab === role.id 
                          ? 'bg-purple-500/20 text-purple-400 border border-purple-500/50' 
                          : 'bg-zinc-800 border border-transparent text-zinc-400 hover:text-zinc-200 text-xs'}`}
                    >
                      <span className="text-sm">{role.icon}</span> {role.label}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setLyricsFullscreen(false)}
                  className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                  title="Küçült (ESC)"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 9L4 4m0 0v4m0-4h4m11 1l-5 5m5-5v4m0-4h-4M9 15l-5 5m0 0v-4m0 4h4m11-1l-5-5m5 5h-4m4 0v-4" />
                  </svg>
                </button>
              </div>

              {/* Metin */}
              <div
                className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 sm:py-8"
                onClick={e => e.stopPropagation()}
              >
                {notes[activeNoteTab] ? (
                  <pre className="text-zinc-200 text-base sm:text-lg leading-loose font-sans whitespace-pre-wrap break-words max-w-2xl mx-auto">
                    {notes[activeNoteTab]}
                  </pre>
                ) : (
                  <div className="flex items-center justify-center h-full text-zinc-500 italic">
                    Bu rol için not bulunamadı.
                  </div>
                )}
              </div>

              {/* Alt ipucu */}
              <p className="text-center text-zinc-700 text-xs pb-4 shrink-0">ESC veya dışarı tıkla · kapat</p>
            </div>
          )}
        </div>

        {/* Footer — Aksiyonlar */}
        <div className="p-4 border-t border-zinc-800 flex justify-between gap-3">
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-red-500 hover:bg-red-500/10 hover:text-red-400 transition-colors text-sm font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
            </svg>
            Sil
          </button>
          <button
            onClick={handleEdit}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold shadow-lg shadow-purple-600/25 hover:-translate-y-0.5 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
            Düzenle
          </button>
        </div>
      </div>
    </div>
  );
}
