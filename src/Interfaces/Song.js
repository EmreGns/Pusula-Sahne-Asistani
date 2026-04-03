/**
 * Song bileşeni veri yapısı ve fabrika (factory) fonksiyonu.
 * Pusula repertuarındaki her bir şarkıyı temsil eder.
 * @typedef {Object} Song
 * @property {string} id - Şarkının eşsiz kimliği
 * @property {string} name - Şarkı adı
 * @property {string} artist - Sanatçı/Grup
 * @property {number|string} bpm - Şarkı temposu
 * @property {string} key - Şarkı tonu
 * @property {string} lyrics - Şarkı sözleri veya nota/akor açıklamaları
 * @property {string} genre - Müzik türü
 * @property {'öğreniliyor' | 'tamamlandı' | 'eklenebilir'} status - Öğrenilme durumu
 * @property {number} difficulty - Zorluk seviyesi (1-5)
 */

/**
 * Yeni bir şarkı nesnesi oluşturur.
 * @param {Partial<Song>} data - Şarkı özellikleri
 * @returns {Song}
 */
export const createSong = (data = {}) => ({
  id: crypto.randomUUID(),
  name: data.name || '',
  artist: data.artist || '',
  bpm: data.bpm || '',
  key: data.key || '',
  lyrics: data.lyrics || '',
  genre: data.genre || '',
  status: data.status || 'öğreniliyor',
  difficulty: data.difficulty || 3,
});
