# 🧭 Pusula Sahne Asistanı

Modern, şık tasarımlı ve akıllı sekme yapısına sahip bir müzik grubu asistanı uygulaması. Bu uygulama ile müzik grupları kendi repertuvarlarını oluşturabilir, şarkıların zorluklarını/durumlarını takip edebilir, provalarını planlayıp sonuçlandırabilir ve konserler için setlist'ler (şarkı listeleri) hazırlayabilir.
Web'de görüntülemek için: https://pusula-sahne-asistani.netlify.app

## 🚀 Özellikler

- **🎵 Repertuvar Yönetimi (Ana Sayfa & Repertuvar Sekmesi):** Şarkı adı, sanatçı, BPM, ton, tür, durum, zorluk seviyesi ve şarkı notları ile yepyeni şarkılar (Create). Şarkıların durumlarına (Tamamlandı, Öğreniliyor, Eklenebilir) göre filtrelenip (Read) listelenmesi. İstenildiği zaman detayların güncellenmesi (Update) ve silinmesi (Delete).
- **📅 Provalar (Provalar Sekmesi):** Belirli bir tarih ve not ile provalar "Planlandı" veya "Yapıldı" durumlarıyla eklenebilir.
- **🎸 Setlistler (Setlistler Sekmesi):** Repertuvardaki şarkı havuzundan (durum filtrelemeleriyle birlikte) şarkılar seçilebilir, sıra değiştirilerek (sürükle-bırak mantığına benzer ikonlarla) etkinlik listeleri oluşturulabilir.

Tüm veriler tarayıcınızın **LocalStorage** alanına kaydedilir, sayfa yenilense de veri kaybı yaşanmaz.

## 💻 Kullanılan Teknolojiler

- **ReactJS (.jsx):** Fonksiyonel bileşenler ve Hook'lar (useState, useEffect vb.) kullanılarak.
- **Vite:** Çok daha hızlı derleme süreci ve geliştirme ortamı için.
- **Tailwind CSS:** Custom ve responsive tasarımlar, animasyonlar, glow (parlama) efektleri ve mobil uyumluluk için.

## 🛠️ Kurulum ve Çalıştırma

Projenin yerel bilgisayarınızda (local) çalıştırılabilmesi için sisteminizde Node.js yüklü olması gerekmektedir.

1. Projeyi bilgisayarınıza indirin (ya da klonlayın).
2. Terminal (Komut İstemi) üzerinden proje klasörüne gidin.
3. Gerekli bağımlılıkları (paketleri) yüklemek için şu komutu çalıştırın:
   ```bash
   npm install
   ```
4. Geliştirme (development) sunucusunu başlatmak için şu komutu çalıştırın:
   ```bash
   npm run dev
   ```
5. Terminalde beliren bağlantıya (genellikle `http://localhost:5173`) tıklayarak projeyi tarayıcınızda açabilirsiniz.

## 📱 Mobil Uyumluluk

Tamamen Responsive (duyarlı) bir tasarıma sahiptir. iOS/Android cihazlardaki deneyime uygun şekilde menüler, formlar ve görünümler küçük ekranlara otomatik uyum sağlar. Müzisyenlerin provalarda cep telefonundan kolayca kullanabilmesi için test edilmiş ve optimize edilmiştir.

## 🔧 Proje Yapısı

Dosya dizilimi düzenli bir mimari baz alınarak (`Components`, `Pages`, `Interfaces` gibi ek klasörlerle) inşa edilmiştir. İkonlar harici bağımlılık yaratmamak adına `inline SVG` olarak eklenmiştir.
