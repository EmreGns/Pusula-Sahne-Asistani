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
  <img width="850" alt="Ana Sayfa ve Şarkı Ekleme Ekranı" src="https://github.com/user-attachments/assets/567c008b-af34-444c-812b-f90c70115b87" />
</p>

---

### 🎵 2. Repertuvar Yönetimi
Şarkıların zorluk seviyelerine, çalışma durumlarına göre gruplandığı ve arama/filtreleme yapılabilen dinamik repertuvar listesi:

<p align="center">
  <img width="850" alt="Repertuvar Listesi" src="https://github.com/user-attachments/assets/963b1667-b6bc-4109-8941-ae8c9b96103d" />
</p>

---

### 📝 3. Şarkı Detayı ve Akor/Söz Notları
Repertuvardan bir şarkıya tıklandığında açılan; vokal, gitar, bas gitar veya bateri için özel alınmış sahne notlarını, akorları ve sözleri gösteren modal (popup) ekranı:

<p align="center">
  <img width="850" alt="Şarkı Sahne Notları Ekranı" src="https://github.com/user-attachments/assets/356c6122-149b-47a9-99ca-6ad9e8b3873a" />
</p>

---

### 📅 4. Prova Planlama Panelı
Gelecek provaları tarih ve açıklama ekleyerek planlamayı, yapılmış eski provaları ise notlarıyla birlikte arşivlemeyi sağlayan yönetim alanı:

<p align="center">
  <img width="850" alt="Provalar Takip Ekranı" src="https://github.com/user-attachments/assets/d2c49172-2699-41aa-aa9d-85a4a417deaa" />
</p>

---

### 🎤 5. Konser Setlistleri
Farklı sahneler ve etkinlik günleri için repertuvardan seçilen şarkılarla oluşturulmuş, sahne akış sırasına göre dizilmiş canlı performans listeleri:

<p align="center">
  <img width="850" alt="Setlist Oluşturma Ekranı" src="https://github.com/user-attachments/assets/proje_gorsel_5.png-3da5e080-652d-49f7-85d3-b51c21505994" />
</p>

---

## 🛠️ Kurulum ve Çalıştırma

Yerel çalıştırma için sisteminizde **Node.js** yüklü olması gerekmektedir.

1. Projeyi klonlayın:
   ```bash
   git clone [https://github.com/EmreGns/Pusula-Sahne-Asistani.git](https://github.com/EmreGns/Pusula-Sahne-Asistani.git)
