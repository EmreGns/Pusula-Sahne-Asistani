import { useState, useEffect } from 'react';

const STATUS_OPTIONS = [
  { value: 'planlandı', label: '📅 Prova Planlandı', color: 'text-amber-400', bg: 'bg-amber-400/10 border-amber-400/30' },
  { value: 'yapıldı',   label: '✅ Prova Yapıldı',   color: 'text-emerald-400', bg: 'bg-emerald-400/10 border-emerald-400/30' },
];

function formatDate(dateStr) {
  if (!dateStr) return '';
  const [y, m, d] = dateStr.split('-');
  return `${d}.${m}.${y}`;
}

// LocalStorage'dan doğrudan oku — sekme geçişinde veri kaybolmaması için
function loadProvalar() {
  try {
    const saved = localStorage.getItem('pusula-provalar');
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error('Provalar yüklenemedi:', e);
  }
  return [];
}

export default function ProvalarPage({ onProvalarChange }) {
  // Lazy initializer: ilk render'da direkt localStorage'dan yükle
  const [provalar, setProvalar] = useState(loadProvalar);
  const [date, setDate]         = useState('');
  const [status, setStatus]     = useState('planlandı');
  const [note, setNote]         = useState('');
  const [error, setError]       = useState('');

  // Sadece provalar değiştiğinde kaydet ve App.jsx'e bildir
  useEffect(() => {
    localStorage.setItem('pusula-provalar', JSON.stringify(provalar));
    if (onProvalarChange) onProvalarChange(provalar);
  }, [provalar, onProvalarChange]);

  const handleAdd = () => {
    if (!date) { setError('Lütfen bir tarih seçin.'); return; }
    setError('');
    const newProva = {
      id: Date.now().toString(),
      date,
      status,
      note: note.trim(),
    };
    setProvalar(prev =>
      [newProva, ...prev].sort((a, b) => b.date.localeCompare(a.date))
    );
    setDate('');
    setStatus('planlandı');
    setNote('');
  };

  const handleDelete = (id) => {
    if (window.confirm('Bu provayı silmek istiyor musunuz?')) {
      setProvalar(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setProvalar(prev => prev.map(p => p.id === id ? { ...p, status: newStatus } : p));
  };

  const statusInfo = (val) => STATUS_OPTIONS.find(o => o.value === val) || STATUS_OPTIONS[0];

  const planlandiCount = provalar.filter(p => p.status === 'planlandı').length;
  const yapildiCount   = provalar.filter(p => p.status === 'yapıldı').length;

  return (
    <div className="w-full max-w-3xl mx-auto space-y-10 pb-12">

      {/* ── Başlık + İstatistik ── */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-zinc-100">Provalar</h2>
        <p className="text-zinc-500 text-sm mt-1 mb-5">
          Prova tarihlerini ekleyin, planlı ve yapılmış provalarınızı takip edin.
        </p>
        {provalar.length > 0 && (
          <div className="flex gap-3">
            <div className="rounded-xl border border-amber-400/20 bg-amber-400/5 px-4 py-2 text-sm">
              <span className="text-amber-400 font-semibold">{planlandiCount}</span>
              <span className="text-zinc-500 ml-1.5">Planlandı</span>
            </div>
            <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/5 px-4 py-2 text-sm">
              <span className="text-emerald-400 font-semibold">{yapildiCount}</span>
              <span className="text-zinc-500 ml-1.5">Yapıldı</span>
            </div>
          </div>
        )}
      </div>

      {/* ── Form Kartı ── */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 backdrop-blur-md p-6 shadow-2xl shadow-black/40 ring-1 ring-white/5">
        <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-5 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-500 inline-block"></span>
          Yeni Prova Ekle
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Tarih */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="prova-date" className="text-xs font-medium text-zinc-400">
              Tarih <span className="text-purple-400">*</span>
            </label>
            <input
              id="prova-date"
              type="date"
              value={date}
              onChange={e => { setDate(e.target.value); setError(''); }}
              className="bg-zinc-800/80 border border-zinc-700/80 text-zinc-100 rounded-xl px-3 py-2.5 text-sm
                         focus:outline-none focus:ring-2 focus:ring-purple-500/60 focus:border-purple-500
                         hover:border-zinc-600 transition-all [color-scheme:dark]"
            />
          </div>

          {/* Durum */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="prova-status" className="text-xs font-medium text-zinc-400">Durum</label>
            <select
              id="prova-status"
              value={status}
              onChange={e => setStatus(e.target.value)}
              className="bg-zinc-800/80 border border-zinc-700/80 text-zinc-100 rounded-xl px-3 py-2.5 text-sm
                         focus:outline-none focus:ring-2 focus:ring-purple-500/60 focus:border-purple-500
                         hover:border-zinc-600 transition-all"
            >
              {STATUS_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          {/* Not */}
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label htmlFor="prova-note" className="text-xs font-medium text-zinc-400">
              Açıklama / Konu <span className="text-zinc-600">(opsiyonel)</span>
            </label>
            <input
              id="prova-note"
              type="text"
              placeholder="ör. Vokal provası, genel akış…"
              value={note}
              onChange={e => setNote(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAdd()}
              className="bg-zinc-800/80 border border-zinc-700/80 text-zinc-100 rounded-xl px-3 py-2.5 text-sm
                         placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500/60
                         focus:border-purple-500 hover:border-zinc-600 transition-all"
            />
          </div>
        </div>

        {error && <p className="text-red-400 text-xs mt-3">{error}</p>}

        <button
          id="prova-add-btn"
          onClick={handleAdd}
          className="mt-5 px-7 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500
                     hover:from-purple-500 hover:to-purple-400 active:scale-95 transition-all
                     text-white text-sm font-semibold shadow-lg shadow-purple-600/30"
        >
          + Prova Ekle
        </button>
      </div>

      {/* ── Liste ── */}
      {provalar.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4 opacity-30">🎵</div>
          <p className="text-zinc-600 text-sm">Henüz prova eklenmedi.</p>
        </div>
      ) : (
        <div className="space-y-3">
          <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 inline-block"></span>
            Tüm Provalar ({provalar.length})
          </h3>

          <ul className="space-y-2">
            {provalar.map(prova => {
              const info = statusInfo(prova.status);
              return (
                <li
                  key={prova.id}
                  className="rounded-xl border border-zinc-800/80
                             bg-zinc-900/50 px-4 py-3 hover:border-zinc-700 hover:bg-zinc-900
                             transition-all group ring-1 ring-white/[0.03]"
                >
                  {/* Üst satır: rozet + tarih + not */}
                  <div className="flex items-center gap-3">
                    {/* Durum rozeti */}
                    <span className={`shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full border ${info.bg} ${info.color}`}>
                      {prova.status === 'yapıldı' ? '✅ Yapıldı' : '📅 Planlandı'}
                    </span>

                    {/* Tarih */}
                    <span className="text-zinc-200 font-mono font-medium text-sm min-w-[80px]">
                      {formatDate(prova.date)}
                    </span>

                    {/* Not */}
                    {prova.note
                      ? <span className="text-zinc-500 text-sm truncate flex-1">{prova.note}</span>
                      : <span className="flex-1" />
                    }

                    {/* Masaüstü butonları (hover ile) */}
                    <div className="hidden sm:flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                      <button
                        title="Durumu değiştir"
                        onClick={() =>
                          handleStatusChange(prova.id, prova.status === 'planlandı' ? 'yapıldı' : 'planlandı')
                        }
                        className="text-xs text-zinc-500 hover:text-zinc-200 transition-all px-2 py-1 rounded-lg hover:bg-zinc-800"
                      >
                        Değiştir
                      </button>
                      <button
                        title="Provayı sil"
                        onClick={() => handleDelete(prova.id)}
                        className="text-xs text-red-500 hover:text-red-400 transition-all px-2 py-1 rounded-lg hover:bg-red-500/10"
                      >
                        Sil
                      </button>
                    </div>
                  </div>

                  {/* Mobil aksiyon butonları (her zaman görünür, sadece sm altında) */}
                  <div className="flex sm:hidden items-center gap-2 mt-2.5 pt-2.5 border-t border-zinc-800/60">
                    <button
                      onClick={() =>
                        handleStatusChange(prova.id, prova.status === 'planlandı' ? 'yapıldı' : 'planlandı')
                      }
                      className="flex-1 text-xs text-zinc-400 hover:text-zinc-100 px-3 py-2 rounded-lg bg-zinc-800/60 hover:bg-zinc-700/60 transition-all font-medium"
                    >
                      🔄 Durumu Değiştir
                    </button>
                    <button
                      onClick={() => handleDelete(prova.id)}
                      className="flex-1 text-xs text-red-400 hover:text-red-300 px-3 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-all font-medium"
                    >
                      🗑 Sil
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
