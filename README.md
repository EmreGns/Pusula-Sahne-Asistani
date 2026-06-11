# 🧭 Pusula Sahne Asistanı

Modern, şık tasarımlı ve akıllı sekme yapısına sahip bir **müzik grubu asistanı** uygulaması. Müzisyenlerin canlı sahne performanslarında, provalarda ve hazırlık süreçlerinde repertuvarlarını oluşturabilmesini, şarkı durumlarını takip edebilmesini, provalarını planlayabilmesini ve konserler için dinamik setlist'ler hazırlayabilmesini sağlar.

🌐 **Canlı Demo:** [pusula-sahne-asistani.netlify.app](https://pusula-sahne-asistani.netlify.app)

---

## 🚀 Özellikler

### 🎵 Repertuvar Yönetimi
Şarkı adı, sanatçı, BPM, ton, tür, durum, zorluk seviyesi ve özel enstrüman/söz notlarıyla şarkı yönetimi (CRUD). Durum filtreleriyle (Tamamlandı / Öğreniliyor / Eklenebilir) akıllı listeleme.

### 📅 Prova Takvimi
Belirli bir tarih, konu ve açıklama notu ile "Planlandı" veya "Yapıldı" durumlarında prova kayıtları oluşturma ve geçmiş takibi.

### 🎸 Setlist (Konser Akışı) Oluşturma
Repertuvardaki şarkı havuzundan hızlıca parça seçerek konser veya sahneler için özel etkinlik akışları ve şarkı sıralamaları hazırlama.

> 💾 Tüm veriler tarayıcının **LocalStorage** alanına kaydedilir — sayfa yenilense veya internet kesilse de veri kaybı yaşanmaz, tamamen lokalde çalışır.

---

## 💻 Kullanılan Teknolojiler

| Teknoloji | Kullanım Amacı |
|-----------|---------------|
| **ReactJS (.jsx)** | Fonksiyonel bileşenler ve Hook'lar (`useState`, `useEffect` vb.) ile reaktif arayüz yönetimi |
| **Vite** | Hızlı derleme ve optimize geliştirme ortamı |
| **Tailwind CSS** | Responsive tasarım, modern neon/glow efektleri, koyu tema (dark mode) mimarisi ve mobil uyumluluk |

---

## 📸 Uygulama Ekran Görüntüleri

### 📊 1. Ana Sayfa & Genel Bakış
Grubun müzik yolculuğuna genel bakış sağlayan, şarkı havuzundaki istatistikleri (Tamamlanan, öğrenilecek şarkı sayıları vb.) gösteren ve hızlıca yeni şarkı eklemeyi sağlayan dashboard ekranı:

<p align="center">
  <img width="1067" height="797" alt="proje_gorsel_1" src="https://github.com/user-attachments/assets/fa076daa-9f99-4b70-b645-068c4662da44" />
</p>

---

### 🎵 2. Repertuvar Yönetimi
Şarkıların zorluk seviyelerine, çalışma durumlarına göre gruplandığı ve arama/filtreleme yapılabilen dinamik repertuvar listesi:

<p align="center">
  <img width="1416" height="918" alt="proje_gorsel_3" src="https://github.com/user-attachments/assets/47e5f7e5-8587-4a12-845d-1e98f3b5b8de" />
</p>

---

### 📝 3. Şarkı Detayı ve Akor/Söz Notları
Repertuvardan bir şarkıya tıklandığında açılan; vokal, gitar, bas gitar veya bateri için özel alınmış sahne notlarını, akorları ve sözleri gösteren modal (popup) ekranı:

<p align="center">
  <img width="1107" height="725" alt="proje_gorsel_2" src="https://github.com/user-attachments/assets/84312361-dd07-404b-beae-f0e01b4258c9" />
</p>

---

### 📅 4. Prova Planlama Panelı
Gelecek provaları tarih ve açıklama ekleyerek planlamayı, yapılmış eski provaları ise notlarıyla birlikte arşivlemeyi sağlayan yönetim alanı:

<p align="center">
  <img width="1367" height="847" alt="proje_gorsel_4" src="https://github.com/user-attachments/assets/27abc835-f7c0-4c05-8cc7-797ab24542ca" />
</p>

---

### 🎤 5. Konser Setlistleri
Farklı sahneler ve etkinlik günleri için repertuvardan seçilen şarkılarla oluşturulmuş, sahne akış sırasına göre dizilmiş canlı performans listeleri:

<p align="center">
  <img width="1631" height="885" alt="proje_gorsel_5" src="https://github.com/user-attachments/assets/1acbeea7-40cf-4a0c-85cd-95dd3c90eb1f" />
</p>

---

## 🛠️ Kurulum ve Çalıştırma

Yerel çalıştırma için sisteminizde **Node.js** yüklü olması gerekmektedir.

1. Projeyi klonlayın:
   ```bash
   git clone [https://github.com/EmreGns/Pusula-Sahne-Asistani.git](https://github.com/EmreGns/Pusula-Sahne-Asistani.git)
