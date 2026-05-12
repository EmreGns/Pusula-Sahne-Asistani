# 🧭 Pusula Sahne Asistanı

Modern, şık tasarımlı ve akıllı sekme yapısına sahip bir **müzik grubu asistanı** uygulaması. Müzik grupları repertuvarlarını oluşturabilir, şarkıların durumlarını takip edebilir, provalarını planlayabilir ve konserler için setlist'ler hazırlayabilir.

🌐 **Canlı Demo:** [pusula-sahne-asistani.netlify.app](https://pusula-sahne-asistani.netlify.app)

---

## 🚀 Özellikler

### 🎵 Repertuvar Yönetimi
Şarkı adı, sanatçı, BPM, ton, tür, durum, zorluk seviyesi ve notlarıyla şarkı yönetimi (CRUD). Durum filtreleriyle (Tamamlandı / Öğreniliyor / Eklenebilir) listeleme.

### 📅 Provalar
Belirli bir tarih ve not ile "Planlandı" veya "Yapıldı" durumlarında prova kaydı oluşturma.

### 🎸 Setlistler
Repertuvardaki şarkı havuzundan şarkı seçerek, sıra değiştirilerek (ikona basarak) etkinlik listeleri oluşturma.

> 💾 Tüm veriler tarayıcının **LocalStorage** alanına kaydedilir — sayfa yenilense de veri kaybı yaşanmaz.

---

## 💻 Kullanılan Teknolojiler

| Teknoloji | Kullanım Amacı |
|-----------|---------------|
| **ReactJS (.jsx)** | Fonksiyonel bileşenler ve Hook'lar (`useState`, `useEffect` vb.) |
| **Vite** | Hızlı derleme ve geliştirme ortamı |
| **Tailwind CSS** | Responsive tasarım, animasyonlar, glow efektleri, mobil uyumluluk |

---

## 🛠️ Kurulum ve Çalıştırma

Yerel çalıştırma için sisteminizde **Node.js** yüklü olması gerekmektedir.

1. Projeyi klonlayın:
   ```bash
   git clone https://github.com/EmreGns/Pusula-Sahne-Asistani.git
   ```
2. Proje klasörüne gidin:
   ```bash
   cd Pusula-Sahne-Asistani
   ```
3. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```
4. Geliştirme sunucusunu başlatın:
   ```bash
   npm run dev
   ```
5. Terminalde beliren bağlantıya (genellikle `http://localhost:5173`) tıklayarak projeyi açın.

---

## 📱 Mobil Uyumluluk

Tamamen **Responsive** tasarıma sahiptir. iOS/Android cihazlardaki deneyime uygun şekilde menüler, formlar ve görünümler küçük ekranlara otomatik uyum sağlar. Müzisyenlerin provalarda cep telefonundan kolayca kullanabilmesi için test edilmiş ve optimize edilmiştir.

---

## 🔧 Proje Yapısı

Dosya dizilimi düzenli bir mimari baz alınarak (`Components`, `Pages`, `Interfaces` gibi klasörlerle) inşa edilmiştir. İkonlar harici bağımlılık yaratmamak adına `inline SVG` olarak eklenmiştir.
