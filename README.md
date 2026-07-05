# PACKT — Üst Bölüm (1/2)

Hero + tanıtım satırları + kategoriler + **Sipariş Ver** butonu.
(Alt bölüm ayrı projedir: `site-alt` — slogan, süreç ve İletişime Geçin butonu orada.)

- Masaüstünde 1920px sabit tasarım orantılı ölçeklenir; **768px altında** mobil düzen devreye girer.
- Linkler: `js/main.js` içindeki `LINKS` nesnesi (logo, plato, bolme, stant, cekmece, solo, siparis).

## Yayınlama

Bu klasörü bir GitHub reposuna yükle → Settings → Pages → main / (root).

## ikas'a gömme

İki bölümü ikas anasayfaya alt alta iki iframe olarak ekle (URL'leri kendi Pages adreslerinle değiştir).
Yükseklik dinleyicisi **tek sefer** eklenir, iki iframe'i de yönetir:

```html
<iframe class="packt-frame" src="https://KULLANICI.github.io/packt-ust/"
        style="width:100%;border:0;display:block" scrolling="no" title="PACKT 1"></iframe>

<iframe class="packt-frame" src="https://KULLANICI.github.io/packt-alt/"
        style="width:100%;border:0;display:block" scrolling="no" title="PACKT 2"></iframe>

<script>
  window.addEventListener("message", function (e) {
    if (e.data && e.data.type === "packt-height") {
      document.querySelectorAll("iframe.packt-frame").forEach(function (f) {
        if (f.contentWindow === e.source) f.style.height = e.data.height + "px";
      });
    }
  });
</script>
```

Not: Tek repo da kullanabilirsin — `ust/` ve `alt/` diye iki klasör aç, iframe'leri
`.../repo/ust/` ve `.../repo/alt/` adreslerine yönlendir.
