/**
 * Dökümantasyon ve Tip güvenliği için JSDoc tanımlamaları.
 * Proje klasör yapısı gereksinimi (Interfaces) için oluşturulmuştur.
 */

/**
 * @typedef {Object} Song
 * @property {string} id - Benzersiz şarkı ID'si (UUID veya timestamp)
 * @property {string} name - Şarkı adı
 * @property {string} artist - Sanatçı adı
 * @property {string} bpm - Şarkının temposu (BPM)
 * @property {string} key - Şarkının tonu
 * @property {string} genre - Müzik türü
 * @property {('öğreniliyor'|'tamamlandı')} status - Şarkının öğrenim durumu
 * @property {string} lyrics - Şarkı sözleri veya notlar
 */

export const SONG_STATUS = {
    LEARNING: 'öğreniliyor',
    COMPLETED: 'tamamlandı'
};
