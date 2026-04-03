import { useState, useEffect } from 'react';

const STATUSES = [
  { value: 'öğreniliyor', label: 'Öğreniliyor ⏳', color: 'text-amber-400', ring: 'ring-amber-500/60' },
  { value: 'tamamlandı',  label: 'Tamamlandı ✅',  color: 'text-emerald-400', ring: 'ring-emerald-500/60' },
  { value: 'eklenebilir', label: 'Eklenebilir 🎵',  color: 'text-blue-400', ring: 'ring-blue-500/60' },
];

const DIFFICULTY_LABELS = ['', 'Çok Kolay', 'Kolay', 'Orta', 'Zor', 'Çok Zor'];
const DIFFICULTY_COLORS = ['', 'text-emerald-400', 'text-lime-400', 'text-yellow-400', 'text-orange-400', 'text-red-400'];

const ROLES = [
  { id: 'vocal', label: 'Vokal', icon: '🎤' },
  { id: 'guitar', label: 'Gitar', icon: '🎸' },
  { id: 'bass', label: 'Bas Gitar', icon: '🎸' },
  { id: 'drum', label: 'Bateri', icon: '🥁' },
];

const defaultState = {
  name: '',
  artist: '',
  bpm: '',
  key: '',
  genre: '',
  status: 'öğreniliyor',
  difficulty: 3,
  notes: { vocal: '', guitar: '', bass: '', drum: '' },
};

export default function AddSongForm({ onSave, initialData = null, onCancel = null }) {
  const getInitialState = () => {
    if (!initialData) return defaultState;
    const initNotes = initialData.notes || { vocal: initialData.lyrics || '', guitar: '', bass: '', drum: '' };
    return { ...defaultState, ...initialData, notes: initNotes };
  };

  const [formData, setFormData] = useState(getInitialState());
  const [activeNoteTab, setActiveNoteTab] = useState('vocal');

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFormData(getInitialState());
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNoteChange = (e) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      notes: { ...prev.notes, [activeNoteTab]: value }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const toSave = { ...formData, id: initialData?.id || Date.now().toString() };
    delete toSave.lyrics; // Clean up old data structure
    if (onSave) onSave(toSave);
    if (!initialData) setFormData(defaultState);
  };

  const inputStyles = "w-full bg-zinc-950/60 border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-200 text-sm";
  const labelStyles = "block text-xs font-semibold text-zinc-400 mb-1.5 ml-0.5 uppercase tracking-wide";

  return (
    <div className="w-full max-w-3xl mx-auto p-5 sm:p-7 rounded-3xl bg-zinc-900/50 border border-zinc-800/80 shadow-[0_0_50px_-10px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
      {/* Başlık */}
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 leading-tight">
          {initialData ? '✏️ Şarkıyı Düzenle' : '✨ Yeni Şarkı Ekle'}
        </h2>
        <p className="text-zinc-500 text-xs mt-1">
          {initialData ? 'Seçili şarkının detaylarını güncelleyin.' : 'Repertuvarınıza yeni bir parça ekleyin.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Şarkı Adı + Sanatçı */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className={labelStyles}>Şarkı Adı</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange}
              required className={inputStyles} placeholder="Örn: The Unforgiven" />
          </div>
          <div>
            <label htmlFor="artist" className={labelStyles}>Sanatçı</label>
            <input type="text" id="artist" name="artist" value={formData.artist} onChange={handleChange}
              required className={inputStyles} placeholder="Örn: Metallica" />
          </div>
        </div>

        {/* BPM + Ton + Tür */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div>
            <label htmlFor="bpm" className={labelStyles}>BPM</label>
            <input type="number" id="bpm" name="bpm" value={formData.bpm} onChange={handleChange}
              className={inputStyles} placeholder="120" />
          </div>
          <div>
            <label htmlFor="key" className={labelStyles}>Ton (Key)</label>
            <input type="text" id="key" name="key" value={formData.key} onChange={handleChange}
              className={inputStyles} placeholder="E Minor" />
          </div>
          <div>
            <label htmlFor="genre" className={labelStyles}>Tür</label>
            <input type="text" id="genre" name="genre" value={formData.genre} onChange={handleChange}
              className={inputStyles} placeholder="Heavy Metal" />
          </div>
        </div>

        {/* Durum + Zorluk */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Durum */}
          <div>
            <label className={labelStyles}>Durum</label>
            <div className="flex flex-col gap-2">
              {STATUSES.map(s => (
                <label key={s.value}
                  className={`flex items-center gap-3 cursor-pointer rounded-xl px-3 py-2.5 border transition-all duration-150
                    ${formData.status === s.value
                      ? `bg-zinc-800 border-zinc-600 ring-2 ${s.ring}`
                      : 'bg-zinc-950/40 border-zinc-800 hover:border-zinc-700'}`}>
                  <input
                    type="radio"
                    name="status"
                    value={s.value}
                    checked={formData.status === s.value}
                    onChange={handleChange}
                    className="hidden"
                  />
                  <span className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center shrink-0
                    ${formData.status === s.value ? 'border-transparent bg-purple-500' : 'border-zinc-600'}`}>
                    {formData.status === s.value && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </span>
                  <span className={`text-sm font-medium ${formData.status === s.value ? s.color : 'text-zinc-400'}`}>
                    {s.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Zorluk Seviyesi */}
          <div>
            <label className={labelStyles}>Zorluk Seviyesi</label>
            <div className="bg-zinc-950/40 border border-zinc-800 rounded-xl p-4 flex flex-col gap-3">
              <div className="flex gap-2 justify-center">
                {[1, 2, 3, 4, 5].map(n => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, difficulty: n }))}
                    className={`text-3xl transition-all duration-150 hover:scale-110 active:scale-95
                      ${n <= formData.difficulty
                        ? DIFFICULTY_COLORS[formData.difficulty]
                        : 'text-zinc-700 hover:text-zinc-500'}`}
                  >
                    ★
                  </button>
                ))}
              </div>
              <p className={`text-center text-sm font-semibold ${DIFFICULTY_COLORS[formData.difficulty]}`}>
                {DIFFICULTY_LABELS[formData.difficulty]}
              </p>
            </div>
          </div>
        </div>

        {/* Rol Bazlı Notlar */}
        <div className="space-y-2">
          <label className={labelStyles}>Sözler & Enstrüman Notları</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {ROLES.map(role => (
              <button
                key={role.id}
                type="button"
                onClick={() => setActiveNoteTab(role.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all
                  ${activeNoteTab === role.id 
                    ? 'bg-purple-500/20 text-purple-400 border border-purple-500/50' 
                    : 'bg-zinc-950/40 border border-zinc-800 text-zinc-500 hover:text-zinc-300'}`}
              >
                <span className="text-sm">{role.icon}</span> {role.label}
              </button>
            ))}
          </div>
          <textarea
            value={formData.notes[activeNoteTab]}
            onChange={handleNoteChange}
            rows="3" className={`${inputStyles} resize-none`}
            placeholder={`${ROLES.find(r => r.id === activeNoteTab)?.label} için şarkı sözleri, akorlar, davul atakları veya teknik notlar…`}
          />
        </div>

        {/* Butonlar */}
        <div className="flex justify-end gap-3 pt-2">
          {onCancel && (
            <button type="button" onClick={onCancel}
              className="rounded-xl bg-zinc-800 px-5 py-2.5 text-sm font-semibold text-zinc-300 hover:bg-zinc-700 transition-colors">
              İptal
            </button>
          )}
          <button
            type="submit"
            id="song-submit-btn"
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-7 py-2.5 text-sm font-semibold text-white shadow-lg shadow-purple-600/30 hover:shadow-purple-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              {initialData
                ? <><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></>
                : <><path d="M5 12h14" /><path d="M12 5v14" /></>
              }
            </svg>
            {initialData ? 'Kaydet' : 'Repertuvara Ekle'}
          </button>
        </div>
      </form>
    </div>
  );
}
