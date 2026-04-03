import { useState, useEffect } from 'react';

function loadSetlistler() {
  try {
    const saved = localStorage.getItem('pusula-setlistler');
    return saved ? JSON.parse(saved) : [];
  } catch { return []; }
}

const STATUS_COLORS = {
  'tamamlandı': 'bg-emerald-500/15 text-emerald-400',
  'öğreniliyor': 'bg-amber-500/15 text-amber-400',
  'eklenebilir': 'bg-blue-500/15 text-blue-400',
};

/* ─── İkonlar ─── */
function IconBack() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M19 12H5m7-7-7 7 7 7"/>
    </svg>
  );
}
function IconEdit() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  );
}
function IconTrash() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <polyline points="3 6 5 6 21 6"/>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
    </svg>
  );
}
function IconPlus() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <path d="M5 12h14"/><path d="M12 5v14"/>
    </svg>
  );
}
function IconSave() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
      <polyline points="17 21 17 13 7 13 7 21"/>
      <polyline points="7 3 7 8 15 8"/>
    </svg>
  );
}

/* ─── Ana Bileşen ─── */
export default function SetlistPage({ songs }) {
  const [setlistler, setSetlistler] = useState(loadSetlistler);
  const [mode, setMode]             = useState('list'); // 'list' | 'edit'

  /* Düzenleme taslak durumları */
  const [editingSetlist, setEditingSetlist] = useState(null);
  const [draftName, setDraftName]           = useState('');
  const [draftSongIds, setDraftSongIds]     = useState([]);
  const [songSearch, setSongSearch]         = useState('');
  const [statusFilter, setStatusFilter]     = useState('tamamlandı');
  const [nameError, setNameError]           = useState('');

  /* LocalStorage sync */
  useEffect(() => {
    localStorage.setItem('pusula-setlistler', JSON.stringify(setlistler));
  }, [setlistler]);

  /* ─── Aksiyonlar ─── */
  const openCreate = () => {
    setEditingSetlist(null);
    setDraftName('');
    setDraftSongIds([]);
    setSongSearch('');
    setStatusFilter('tamamlandı');
    setNameError('');
    setMode('edit');
  };

  const openEdit = (setlist) => {
    setEditingSetlist(setlist);
    setDraftName(setlist.name);
    setDraftSongIds([...setlist.songIds]);
    setSongSearch('');
    setStatusFilter('all');
    setNameError('');
    setMode('edit');
  };

  const handleSave = () => {
    if (!draftName.trim()) { setNameError('Setlist adı boş bırakılamaz.'); return; }
    if (editingSetlist) {
      setSetlistler(prev => prev.map(s =>
        s.id === editingSetlist.id
          ? { ...s, name: draftName.trim(), songIds: draftSongIds, updatedAt: new Date().toISOString() }
          : s
      ));
    } else {
      setSetlistler(prev => [{
        id: Date.now().toString(),
        name: draftName.trim(),
        songIds: draftSongIds,
        createdAt: new Date().toISOString(),
      }, ...prev]);
    }
    setMode('list');
  };

  const handleDelete = (id) => {
    if (window.confirm('Bu setlisti silmek istiyor musunuz?')) {
      setSetlistler(prev => prev.filter(s => s.id !== id));
    }
  };

  const toggleSong = (songId) => {
    setDraftSongIds(prev =>
      prev.includes(songId) ? prev.filter(id => id !== songId) : [...prev, songId]
    );
  };

  const removeSongFromDraft = (songId) =>
    setDraftSongIds(prev => prev.filter(id => id !== songId));

  const moveSong = (index, dir) => {
    const arr = [...draftSongIds];
    const target = index + dir;
    if (target < 0 || target >= arr.length) return;
    [arr[index], arr[target]] = [arr[target], arr[index]];
    setDraftSongIds(arr);
  };

  const getSong = (id) => songs.find(s => s.id === id);

  /* ── Filtreli şarkı listesi (picker için) ── */
  const pickerSongs = songs.filter(s => {
    if (statusFilter !== 'all' && s.status !== statusFilter) return false;
    const q = songSearch.toLowerCase().trim();
    if (!q) return true;
    return s.name.toLowerCase().includes(q) || s.artist.toLowerCase().includes(q);
  });

  /* ════════════════════════════════════════
     📋  LİSTE GÖRÜNÜMÜ
  ════════════════════════════════════════ */
  if (mode === 'list') {
    return (
      <div className="w-full max-w-3xl mx-auto space-y-6 pb-12">

        {/* Başlık */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-300">
              Setlistler
            </h2>
            <p className="text-zinc-500 text-sm mt-1">
              {setlistler.length > 0 ? `${setlistler.length} setlist kayıtlı` : 'Konserler için setlist oluşturun'}
            </p>
          </div>
          <button
            id="new-setlist-btn"
            onClick={openCreate}
            className="shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl
                       bg-gradient-to-r from-purple-600 to-purple-500 text-white text-sm font-semibold
                       shadow-lg shadow-purple-600/30 hover:from-purple-500 hover:to-purple-400
                       active:scale-95 transition-all"
          >
            <IconPlus />
            Yeni Setlist
          </button>
        </div>

        {/* Boş durum */}
        {setlistler.length === 0 ? (
          <div className="text-center py-20 rounded-3xl border border-dashed border-zinc-800 bg-zinc-900/20">
            <div className="text-6xl mb-4 opacity-20">🎸</div>
            <h3 className="text-xl font-medium text-zinc-400 mb-2">Henüz setlist yok</h3>
            <p className="text-zinc-600 text-sm mb-6">Şarkılarınızdan konser setlistleri oluşturun.</p>
            <button
              onClick={openCreate}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
                         bg-gradient-to-r from-purple-600 to-purple-500 text-white text-sm font-semibold
                         shadow-md shadow-purple-600/30 hover:from-purple-500 hover:to-purple-400 transition-all"
            >
              <IconPlus /> İlk Setlisti Oluştur
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {setlistler.map(setlist => {
              const setlistSongs = setlist.songIds.map(getSong).filter(Boolean);
              const totalDur = setlistSongs.length;
              return (
                <div
                  key={setlist.id}
                  className="rounded-2xl border border-zinc-800/60 bg-zinc-900/50 overflow-hidden
                             hover:border-zinc-700/80 transition-all ring-1 ring-white/[0.02]"
                >
                  {/* Kart başlığı */}
                  <div className="p-4 flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xl shrink-0">🎸</span>
                        <h3 className="font-bold text-zinc-100 text-base truncate">{setlist.name}</h3>
                      </div>
                      <p className="text-zinc-500 text-xs">
                        <span className="text-purple-400 font-semibold">{totalDur}</span> şarkı
                        {setlist.createdAt && (
                          <span className="ml-2 text-zinc-600">
                            · {new Date(setlist.createdAt).toLocaleDateString('tr-TR')}
                          </span>
                        )}
                        {setlist.updatedAt && (
                          <span className="ml-2 text-zinc-700 italic text-[10px]">güncellendi</span>
                        )}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => openEdit(setlist)}
                        className="p-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
                        title="Düzenle"
                      >
                        <IconEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(setlist.id)}
                        className="p-2 rounded-lg text-zinc-600 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                        title="Sil"
                      >
                        <IconTrash />
                      </button>
                    </div>
                  </div>

                  {/* Şarkı önizlemesi */}
                  {setlistSongs.length > 0 && (
                    <div className="border-t border-zinc-800/50 px-4 py-3 bg-zinc-900/40">
                      <ol className="space-y-1.5">
                        {setlistSongs.slice(0, 5).map((song, i) => (
                          <li key={song.id} className="flex items-center gap-2.5 text-sm">
                            <span className="text-zinc-700 font-mono text-xs w-4 shrink-0">{i + 1}</span>
                            <span className="text-zinc-300 font-medium truncate">{song.name}</span>
                            <span className="text-zinc-600 text-xs truncate hidden sm:block">— {song.artist}</span>
                          </li>
                        ))}
                        {setlistSongs.length > 5 && (
                          <li className="text-zinc-600 text-xs pl-6 italic">
                            +{setlistSongs.length - 5} şarkı daha…
                          </li>
                        )}
                      </ol>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  /* ════════════════════════════════════════
     ✏️  OLUŞTUR / DÜZENLE GÖRÜNÜMÜ
  ════════════════════════════════════════ */
  const draftSongs = draftSongIds.map(getSong).filter(Boolean);

  return (
    <div className="w-full max-w-3xl mx-auto space-y-5 pb-12">

      {/* Başlık */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMode('list')}
          className="p-2 rounded-xl text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
          title="Geri"
        >
          <IconBack />
        </button>
        <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
          {editingSetlist ? 'Setlisti Düzenle' : 'Yeni Setlist Oluştur'}
        </h2>
      </div>

      {/* Setlist adı */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 backdrop-blur-md p-5">
        <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2 block">
          Setlist Adı <span className="text-purple-400">*</span>
        </label>
        <input
          id="setlist-name-input"
          type="text"
          value={draftName}
          onChange={e => { setDraftName(e.target.value); setNameError(''); }}
          onKeyDown={e => e.key === 'Enter' && handleSave()}
          placeholder="ör. Cuma Gecesi Konseri, Açılış Seti…"
          className="w-full bg-zinc-800/80 border border-zinc-700 text-zinc-100 rounded-xl px-4 py-3 text-sm
                     focus:outline-none focus:ring-2 focus:ring-purple-500/60 focus:border-purple-500 transition-all
                     placeholder:text-zinc-600"
        />
        {nameError && <p className="text-red-400 text-xs mt-2">{nameError}</p>}
      </div>

      {/* İki sütun: Picker + Sıra */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        {/* ── Şarkı Havuzu Picker ── */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 backdrop-blur-md overflow-hidden flex flex-col">
          <div className="p-4 border-b border-zinc-800 shrink-0">
            <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 inline-block" />
              Şarkı Havuzu
            </h3>

            {/* Durum filtresi */}
            <div className="flex gap-1 bg-zinc-800/60 rounded-lg p-1 mb-3">
              {[
                { value: 'all',          label: 'Hepsi' },
                { value: 'tamamlandı',   label: '✅' },
                { value: 'öğreniliyor',  label: '⏳' },
                { value: 'eklenebilir',  label: '🎵' },
              ].map(f => (
                <button
                  key={f.value}
                  onClick={() => setStatusFilter(f.value)}
                  title={f.value === 'all' ? 'Hepsi' : f.value}
                  className={`flex-1 text-xs py-1.5 rounded-md font-medium transition-all ${
                    statusFilter === f.value
                      ? 'bg-zinc-700 text-zinc-100 shadow-sm'
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Arama */}
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500 pointer-events-none"
                fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                type="text"
                value={songSearch}
                onChange={e => setSongSearch(e.target.value)}
                placeholder="Şarkı veya sanatçı ara…"
                className="w-full bg-zinc-800/80 border border-zinc-700/60 rounded-lg pl-9 pr-3 py-2 text-xs text-zinc-100
                           placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-purple-500/50 transition-all"
              />
            </div>
          </div>

          {/* Şarkı listesi */}
          <div className="overflow-y-auto flex-1 min-h-0" style={{ maxHeight: '280px' }}>
            {songs.length === 0 ? (
              <p className="text-zinc-600 text-xs text-center py-10">Henüz şarkı yok.</p>
            ) : pickerSongs.length === 0 ? (
              <p className="text-zinc-600 text-xs text-center py-10">Sonuç bulunamadı.</p>
            ) : (
              <div className="p-2 space-y-1">
                {pickerSongs.map(song => {
                  const selected = draftSongIds.includes(song.id);
                  return (
                    <button
                      key={song.id}
                      onClick={() => toggleSong(song.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
                        selected
                          ? 'bg-purple-600/20 border border-purple-600/40 hover:bg-purple-600/30'
                          : 'hover:bg-zinc-800/60 border border-transparent hover:border-zinc-700/40'
                      }`}
                    >
                      {/* Checkbox */}
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-all ${
                        selected ? 'bg-purple-600 shadow-sm shadow-purple-600/50' : 'border border-zinc-600'
                      }`}>
                        {selected && (
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-zinc-200 truncate">{song.name}</div>
                        <div className="text-xs text-zinc-500 truncate">{song.artist}</div>
                      </div>
                      <span className={`shrink-0 text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${STATUS_COLORS[song.status] || 'bg-zinc-700 text-zinc-400'}`}>
                        {song.status}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* ── Setlistedeki Şarkılar (sıralanabilir) ── */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 backdrop-blur-md overflow-hidden flex flex-col">
          <div className="p-4 border-b border-zinc-800 shrink-0">
            <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              Sıralama
              <span className="ml-auto text-xs font-bold text-zinc-300 bg-zinc-800 px-2 py-0.5 rounded-full">
                {draftSongIds.length} şarkı
              </span>
            </h3>
          </div>

          <div className="overflow-y-auto flex-1 min-h-0" style={{ maxHeight: '280px' }}>
            {draftSongs.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-3xl mb-2 opacity-20">🎵</div>
                <p className="text-zinc-600 text-xs">Soldaki listeden şarkı seçin</p>
              </div>
            ) : (
              <div className="p-2 space-y-1">
                {draftSongs.map((song, index) => (
                  <div
                    key={song.id}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl
                               bg-zinc-800/50 border border-zinc-700/30 hover:border-zinc-600/40 transition-all"
                  >
                    <span className="text-zinc-600 font-mono text-xs w-4 text-center shrink-0">{index + 1}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-zinc-200 truncate">{song.name}</div>
                      <div className="text-xs text-zinc-500 truncate">{song.artist}</div>
                    </div>
                    {/* Yukarı / Aşağı */}
                    <div className="flex flex-col gap-0.5 shrink-0">
                      <button
                        onClick={() => moveSong(index, -1)}
                        disabled={index === 0}
                        className="p-0.5 rounded text-zinc-600 hover:text-zinc-200 disabled:opacity-20 transition-colors"
                        title="Yukarı taşı"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="18 15 12 9 6 15"/>
                        </svg>
                      </button>
                      <button
                        onClick={() => moveSong(index, 1)}
                        disabled={index === draftSongs.length - 1}
                        className="p-0.5 rounded text-zinc-600 hover:text-zinc-200 disabled:opacity-20 transition-colors"
                        title="Aşağı taşı"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="6 9 12 15 18 9"/>
                        </svg>
                      </button>
                    </div>
                    {/* Çıkar */}
                    <button
                      onClick={() => removeSongFromDraft(song.id)}
                      className="shrink-0 p-1 rounded-lg text-zinc-600 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      title="Çıkar"
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Butonlar */}
      <div className="flex justify-end gap-3 pt-1">
        <button
          onClick={() => setMode('list')}
          className="px-5 py-2.5 rounded-xl bg-zinc-800 text-zinc-300 text-sm font-semibold hover:bg-zinc-700 transition-colors"
        >
          İptal
        </button>
        <button
          id="setlist-save-btn"
          onClick={handleSave}
          disabled={!draftName.trim()}
          className="flex items-center gap-2 px-7 py-2.5 rounded-xl
                     bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold
                     shadow-lg shadow-purple-600/30 hover:-translate-y-0.5 active:translate-y-0 transition-all
                     disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
        >
          <IconSave />
          {editingSetlist ? 'Güncelle' : 'Kaydet'}
        </button>
      </div>
    </div>
  );
}
