import AddSongForm from '../Components/AddSongForm';

function StatCard({ icon, value, label, color, bg }) {
  return (
    <div className={`rounded-2xl border p-5 flex items-center gap-4 ${bg}`}>
      <div className={`text-3xl w-12 h-12 flex items-center justify-center rounded-xl ${color} bg-white/5`}>
        {icon}
      </div>
      <div>
        <div className={`text-3xl font-extrabold leading-none ${color}`}>{value}</div>
        <div className="text-zinc-500 text-xs mt-1 font-medium">{label}</div>
      </div>
    </div>
  );
}

export default function AnaSayfaPage({ songs, editingSong, onSave, onCancelEdit, provalar }) {
  const tamamlandi = songs.filter(s => s.status === 'tamamlandı').length;
  const ogrenilenler = songs.filter(s => s.status === 'öğreniliyor').length;
  const toplamSarki = songs.length;
  // Şarkı Havuzu = Tüm şarkılar (her statüden)
  const havuz = toplamSarki;

  const provaYapildi = provalar.filter(p => p.status === 'yapıldı').length;
  const provaPlanli = provalar.filter(p => p.status === 'planlandı').length;

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8 pb-12">

      {/* Başlık */}
      <div>
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-300">
          Ana Sayfa
        </h2>
        <p className="text-zinc-500 text-sm mt-1">Grubunuzun müzik yolculuğuna genel bakış.</p>
      </div>

      {/* İstatistikler */}
      {toplamSarki > 0 || provaYapildi > 0 || provaPlanli > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <StatCard
            icon="✅"
            value={tamamlandi}
            label="Tamamlanan Şarkılar"
            color="text-emerald-400"
            bg="border-emerald-500/20 bg-emerald-500/5"
          />
          <StatCard
            icon="⏳"
            value={ogrenilenler}
            label="Öğrenilecek Şarkılar"
            color="text-amber-400"
            bg="border-amber-500/20 bg-amber-500/5"
          />
          <StatCard
            icon="🎵"
            value={havuz}
            label="Şarkı Havuzu"
            color="text-blue-400"
            bg="border-blue-500/20 bg-blue-500/5"
          />
          <StatCard
            icon="🎸"
            value={toplamSarki}
            label="Toplam Şarkı"
            color="text-purple-400"
            bg="border-purple-500/20 bg-purple-500/5"
          />
          <StatCard
            icon="🥁"
            value={provaYapildi}
            label="Prova Yapıldı"
            color="text-emerald-400"
            bg="border-emerald-500/20 bg-emerald-500/5"
          />
          <StatCard
            icon="📅"
            value={provaPlanli}
            label="Prova Planlandı"
            color="text-amber-400"
            bg="border-amber-500/20 bg-amber-500/5"
          />
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/30 px-6 py-8 text-center">
          <div className="text-4xl mb-3 opacity-40">🧭</div>
          <p className="text-zinc-500 text-sm">Henüz veri yok. İlk şarkınızı ekleyerek başlayın!</p>
        </div>
      )}

      {/* Ayraç */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

      {/* Şarkı Ekleme Formu */}
      <AddSongForm
        onSave={onSave}
        initialData={editingSong}
        onCancel={editingSong ? onCancelEdit : null}
      />
    </div>
  );
}
