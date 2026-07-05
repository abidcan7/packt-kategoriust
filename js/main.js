/* ============================================================
   PACKT landing page
   ============================================================ */

/* ---------- LİNKLER ----------------------------------------
   Tırnakların arasına ikas'taki gerçek URL'leri yapıştır.
   Boş ("") bırakılanlar tıklanamaz durumda kalır.

   Örnek:
   plato: "https://magazan.com/kategori/plato",              */
const LINKS = {
  logo:     "https://thepackt.co",   // Üstteki PACKT logosu (genelde anasayfa)

  plato:    "",   // PLATO kategorisi
  bolme:    "",   // BÖLME kategorisi
  stant:    "",   // STANT kategorisi
  cekmece:  "",   // ÇEKMECE kategorisi
  solo:     "",   // SOLO kategorisi

  siparis:  "",   // "Sipariş Ver" yazısı
  iletisim: "",   // "İletişime Geçin" butonu
};

document.querySelectorAll("[data-link]").forEach((a) => {
  const url = LINKS[a.dataset.link];
  if (url) {
    a.href = url;
  } else {
    a.addEventListener("click", (e) => e.preventDefault());
    a.style.cursor = "default";
  }
});

/* ---------- SAHNE ÖLÇEKLEME ---------------------------------
   Tasarım 1920px sabit genişlik; viewport'a oranla küçültülür/
   büyütülür, böylece oranlar her ekranda birebir korunur.     */
const stage = document.getElementById("stage");
const viewport = document.getElementById("viewport");
const DESIGN_W = 1920;
const DESIGN_H = 1200;

function isMobile() {
  return document.documentElement.clientWidth < 768;
}

function rescale() {
  if (!isMobile()) {
    const scale = document.documentElement.clientWidth / DESIGN_W;
    stage.style.transform = "scale(" + scale + ")";
    viewport.style.height = DESIGN_H * scale + "px";
  }
  sendHeight();
}
window.addEventListener("resize", rescale);

/* ---------- SCROLL ANİMASYONLARI ---------------------------- */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("on");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll(".rv, .desk-clip").forEach((el) => observer.observe(el));

/* ---------- IFRAME OTO YÜKSEKLİK -----------------------------
   ikas sayfasına gömülen iframe'in yüksekliğini üst pencereye
   bildirir. README'deki embed kodu bu mesajı dinler.          */
function sendHeight() {
  if (window.parent !== window) {
    const mobileEl = document.getElementById("mobile");
    const h = isMobile()
      ? mobileEl.offsetHeight
      : Math.ceil(viewport.getBoundingClientRect().height);
    window.parent.postMessage({ type: "packt-height", height: h }, "*");
  }
}
window.addEventListener("load", () => {
  rescale();
  sendHeight();
});

/* mobil düzende içerik yüksekliği değişince (görsel yüklenmesi vb.) bildir */
if (window.ResizeObserver) {
  new ResizeObserver(() => sendHeight()).observe(document.getElementById("mobile"));
}

rescale();
