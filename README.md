# Bağlantılar — Türkçe grup bulmacası

16 kelimeyi, ortak bir bağı olan **dört gizli gruba** ayırmaya çalıştığınız bir
kelime oyunu. NYT *Connections*'ın Türkçe uyarlaması — ama bulmacalar Türkçeye
özgün olarak hazırlanmıştır (kelime oyunları ve tuzaklar Türkçe çalışacak
şekilde tasarlandı).

## Nasıl oynanır?

- Izgarada **16 kelime** vardır; bunlar **4 kelimelik 4 gruba** aittir.
- Bir grup seçmek için dört kelimeye dokunup **Onayla**'ya basın.
- Doğruysa grup açılır ve rengiyle üste yerleşir.
- Yanlışsa bir **hak** gider. Toplam **4 hata** hakkınız var.
- Seçtiğiniz dördün üçü aynı gruptaysa **"Bir tanesi yanlış!"** uyarısı gelir.

Renkler zorluğu gösterir: **sarı** (en kolay) → **yeşil** → **mavi** →
**mor** (genelde bir kelime oyunu, en zor).

## Özellikler

- **Günlük bulmaca:** herkese aynı, her gün yeni bulmaca.
- **İstatistikler:** oynanan, kazanma yüzdesi, güncel/en uzun seri, kusursuz
  oyun sayısı ve hata dağılımı.
- **Paylaşım:** sonucu, her tahmini zorluk numaralarıyla (1–4) gösteren bir
  metin olarak panoya kopyalayıp paylaşma.
- **Tasarım:** *Broadsheet* editoryal gazete estetiği — gömülü Playfair Display
  serif masthead, newsprint/mürekkep paleti, çift kural ve Türkçe dateline.
- **Tema:** açık / koyu / sistem.
- **Karıştır:** kalan kutuları animasyonlu (FLIP) yeniden dizer.
- **Klavye:** Enter ile onayla, Esc ile kapat.
- **Çevrimdışı dostu:** ilerleme ve ayarlar `localStorage` içinde tutulur;
  sunucuya veri gönderilmez, giriş gerekmez.

## Çalıştırma

Tek dosyalık statik bir uygulamadır — derleme gerektirmez. `index.html`
dosyasını doğrudan tarayıcıda açmanız yeterlidir:

```sh
# ya da basit bir yerel sunucuyla:
python3 -m http.server 8000
# sonra http://localhost:8000 adresini açın
```

## Yapı

- **`index.html`** — tüm oyun (veri, mantık, arayüz) tek dosyada. Üç modül:
  - `BaglantilarVeri` — bulmaca havuzu (`BULMACALAR`) ve günlük başlangıç tarihi.
  - `BaglantilarDepo` — `localStorage` üzerinden ayar/istatistik/günlük kayıt.
  - Oyun + Arayüz — bulmaca kurulumu, seçim/kontrol mantığı, çizim ve paylaşım.
- **`gizlilik.html` / `kosullar.html`** — politika sayfaları.
- **`netlify.toml`** — dağıtım yapılandırması (statik, derleme yok).
- **`og.png`** — sosyal medya önizleme görseli.

## Yeni bulmaca ekleme

`index.html` içindeki `BaglantilarVeri.BULMACALAR` dizisine yeni bir nesne
ekleyin. Gruplar **kolaydan zora** (sarı→yeşil→mavi→mor) sıralı olmalıdır ve her
grupta **tam 4 kelime** bulunmalıdır:

```js
{ gruplar: [
  { tema: "Meyveler",   kelimeler: ["ELMA", "ARMUT", "ERİK", "NAR"] },   // sarı
  { tema: "…",          kelimeler: ["…", "…", "…", "…"] },               // yeşil
  { tema: "…",          kelimeler: ["…", "…", "…", "…"] },               // mavi
  { tema: "Kelime oyunu", kelimeler: ["…", "…", "…", "…"] }              // mor
] }
```

Günlük bulmaca, `BASLANGIC` tarihinden itibaren gün sayısına göre havuzdan
sırayla seçilir.

## trpuzzle ailesi

Bu proje, Türkçe bulmacaları **trpuzzle.com** altında toplama planının bir
parçasıdır (word500tr ile aynı çizgide: tek dosya statik site, Türkçe, Netlify).
