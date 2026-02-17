const CONFIG = {
  youtubeChannel: "https://www.youtube.com/@hemsi06",
  instagram: "https://www.instagram.com/hemsi06/",
  email: "hemsi.contact@gmail.com",
  paypalMe: "https://paypal.me/clementmc34",
  prices: {
    basic: 25,
    wav: 40,
    unlimited: 80
  }
};


// ====== Init links ======
document.getElementById("year").textContent = new Date().getFullYear();

const yt = document.getElementById("ytLink");
const ig = document.getElementById("igLink");
const mail = document.getElementById("mailLink");

yt.href = CONFIG.youtubeChannel;
ig.href = CONFIG.instagram;
mail.href = `mailto:${CONFIG.email}?subject=Beat%20Purchase%20/%20Custom%20(HEMSI)`;

document.getElementById("emailShow").textContent = CONFIG.email;
document.getElementById("emailShow").href = `mailto:${CONFIG.email}?subject=Beat%20Purchase%20/%20Custom%20(HEMSI)`;

document.getElementById("igShow").textContent = "Instagram";
document.getElementById("igShow").href = CONFIG.instagram;

document.getElementById("paypalShow").textContent = "PayPal.me";
document.getElementById("paypalShow").href = CONFIG.paypalMe;

// ====== Buy buttons (PayPal.me simple) ======
// Mode ultra simple: bouton -> PayPal.me + montant + note
// Tu envoies ensuite le pack manuellement.
function buildPayPalLink(license, beatName) {
  const amount = CONFIG.prices[license] ?? "";
  // PayPal.me permet souvent /amount (selon config). Sinon laisse sans montant.
  const base = CONFIG.paypalMe.replace(/\/$/, "");
  const withAmount = amount ? `${base}/${amount}` : base;

  const note = encodeURIComponent(`HEMSI - ${beatName} - ${license.toUpperCase()} LICENSE`);
  // La "note" ne s’ajoute pas toujours automatiquement selon PayPal,
  // donc on met aussi un mailto fallback dans l’UI si besoin.
  return `${withAmount}?country.x=FR&locale.x=fr_FR&note=${note}`;
}

document.querySelectorAll("[data-buy]").forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const license = btn.getAttribute("data-buy");
    const card = btn.closest(".card");
    const beatName = card.querySelector(".beatTitle")?.textContent?.trim() || "Beat";

    const link = buildPayPalLink(license, beatName);
    window.open(link, "_blank", "noreferrer");
  });
});

// ====== Search + Filter ======
const searchEl = document.getElementById("search");
const filterEl = document.getElementById("filter");
const cards = Array.from(document.querySelectorAll(".card"));

function applyFilters() {
  const q = (searchEl.value || "").toLowerCase().trim();
  const f = filterEl.value;

  cards.forEach(card => {
    const tags = (card.getAttribute("data-tags") || "").toLowerCase();
    const title = (card.querySelector(".beatTitle")?.textContent || "").toLowerCase();
    const meta = (card.querySelector(".meta")?.textContent || "").toLowerCase();

    const matchQuery = !q || tags.includes(q) || title.includes(q) || meta.includes(q);
    const matchFilter = (f === "all") || tags.includes(f);

    card.style.display = (matchQuery && matchFilter) ? "" : "none";
  });
}

searchEl.addEventListener("input", applyFilters);
filterEl.addEventListener("change", applyFilters);

