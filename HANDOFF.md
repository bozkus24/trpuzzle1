# HANDOFF.md

Sonraki oturum için devir notu. Detaylı proje rehberi: **`CLAUDE.md`**.

## Güncel durum

- Proje: **Bağla** — Türkçe "Connections" tarzı grup bulmacası. Statik site, build yok, tek dosya `index.html`.
- `main` en güncel; commit `d63c7ce`. Geliştirme dalı `claude/connections-turkce-ceviri-hz3k6f` main ile senkron (0 commit fark).
- Canlı: `trpuzzle.com/bagla` (Netlify). Kullanıcının önizlemesi `main`'den güncellenir.

## Bu oturumda tamamlanan işler (hepsi main'de)

- **#37** — Ayarlar'daki "Renk körü modu": alttaki açıklama kaldırıldı, dropdown yerine aç/kapa anahtarı (`btnRenkKoru`, `role="switch"`).
- **#38** — Dateline etiketi "Günün bulmacası" → "Günün **B**ulmacası".
- **#40** — Header ikon sırası: **Arşiv → İstatistikler → Nasıl Oynanır → Ayarlar**.
- **#42** — Proje köküne `CLAUDE.md` (kalıcı proje talimatları) eklendi.
- (Başka dallarda main'e girenler: **#39** adresler `trpuzzle.com/bagla`, **#41** AdSense hazırlığı + bilgi bölümü/meta etiketler.)

## Önemli kararlar / konvansiyonlar

- Tüm kod ve UI **Türkçe** (adlandırma dahil: `perde`=modal, `dugme`=buton, `anahtar`=toggle, `etiket`=label).
- İş akışı: dalda geliştir → push → PR → **squash merge** main'e → merge sonrası dalı main'e senkronla (`git checkout -B <dal> origin/main && git push -f`).
- Kalıcılık `localStorage` (`window.BaglantilarDepo`); renk körü paleti CSS `--s1..--s4`.
- Test: global Playwright, `NODE_PATH=/opt/node22/lib/node_modules node ...`, `file://` ile. Açılıştaki "Nasıl Oynanır" modalını `Escape` ile kapat.

## İlgili dosyalar

- `index.html` — tüm uygulama. Bölümler: `==== VERİ ====` (bulmaca verisi + `BASLANGIC`), `==== DEPO ====` (localStorage), `==== OYUN + ARAYÜZ ====` (`ciz`, `cizDateline`, `renkKoruUygula`, `yeniOyun`).
- `CLAUDE.md` — bölüm haritası, dil kuralları, test ve git akışı.
- `gizlilik.html`, `kosullar.html`, `netlify.toml`.

## Yarım kalan iş / bilinen sorunlar

- Açık talep veya bilinen bug **yok**; her istek merge edilmiş durumda.
- Otomatik test paketi repo'da yok; testler elle Playwright script'i ile yapılıyor.
- Bulmaca verisi `BASLANGIC`'tan (1 Ağustos 2026) itibaren gün gün ilerliyor — ileride veri tükenirse `window.BaglantilarVeri` genişletilmeli.
