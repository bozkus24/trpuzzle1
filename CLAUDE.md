# CLAUDE.md

Türkçe "Connections" tarzı grup bulmaca oyunu — **Bağla**. Statik site, build yok.

## Proje yapısı (tarama yapmadan bil)

- **`index.html`** — Tüm uygulama tek dosyada (~1600 satır): HTML + CSS + JS gömülü. Neredeyse her değişiklik burada.
- `gizlilik.html`, `kosullar.html` — Statik gizlilik/koşullar sayfaları.
- `README.md`, `netlify.toml`, `logo.png`, `og.png` — Doküman, Netlify config, görseller.
- **Build/paket yok** — `package.json`, framework, bundler yok. Sadece dosyayı düzenle.

### `index.html` bölüm haritası (`====` yorum işaretleriyle ara)

- `<style>` (satır ~30–492) ve sayfa sonunda küçük ikinci `<style>` — CSS değişkenleri: `--secili`, `--tile`, `--zemin`, `--cizgi`, `--panel`, `--ink`, renk körü paleti `--s1..--s4` (ör. `--s2:#e69f00`).
- Header ikonları (`btnArsiv`, `btnIst`, `btnYardim`, `btnAyar`) ve modallar (`perdeArsiv/Ist/Yardim/Ayar/Sonuc`) `<body>` içinde.
- `================= VERİ =================` → `window.BaglantilarVeri`: bulmaca verisi + `BASLANGIC` (1. gün tarihi).
- `================= DEPO =================` → `window.BaglantilarDepo`: localStorage kalıcılığı (ayarlar, ilerleme, istatistik).
- `================= OYUN + ARAYÜZ =================` → oyun mantığı ve DOM çizimi (`ciz`, `cizDateline`, `renkKoruUygula`, `yeniOyun`, vb.). Yardımcı: `el(id)`.

## Dil ve stil kuralları

- **Her şey Türkçe**: değişken/fonksiyon adları, yorumlar, tüm UI metni. Mevcut Türkçe adlandırma ve idiomu koru (ör. `perde`=modal, `dugme`=buton, `etiket`=label, `anahtar`=toggle).
- Türkçe büyük harf inceliğine dikkat (İ/ı). UI dili `lang="tr"`.

## Test (Playwright — kurulum gerekmez)

Global Playwright + Chromium önyüklü. `file://` ile aç:

```bash
NODE_PATH=/opt/node22/lib/node_modules node <script>.js   # require('playwright')
```

- Açılışta "Nasıl Oynanır" modalı otomatik gelir → tıklamalardan önce `Escape` bas.
- İlerleme/ayar localStorage'da; kalıcılığı `reload` ile doğrula.
- Geçici dosyalar için scratchpad dizinini kullan, repo'yu kirletme.

## Git iş akışı (her değişiklikte)

1. Geliştirme dalı: **`claude/connections-turkce-ceviri-hz3k6f`**. Varsayılan dal: `main`.
2. `index.html`'i düzenle → commit → `git push -u origin claude/connections-turkce-ceviri-hz3k6f`.
3. PR aç → **squash merge** ile `main`'e al (kullanıcının canlı önizlemesi main'den güncellenir).
4. Merge sonrası dalı senkronla:
   `git fetch origin main && git checkout -B claude/connections-turkce-ceviri-hz3k6f origin/main && git push -f -u origin claude/connections-turkce-ceviri-hz3k6f`
5. Commit mesajları Türkçe ve açıklayıcı. Model kimliği (opus vb.) commit/PR/kod'a yazma.
