const searchInput = document.getElementById("gameSearch");
const cards = [...document.querySelectorAll(".game-card")];
const filters = [...document.querySelectorAll(".filter")];
const resultCount = document.getElementById("resultCount");
const emptyState = document.getElementById("emptyState");
const languageToggle = document.getElementById("languageToggle");
let activeCategory = "all";
let language = "ar";

function updateGames() {
  const term = searchInput.value.trim().toLocaleLowerCase();
  let visible = 0;
  cards.forEach((card) => {
    const searchable = (card.dataset.name + " " + card.textContent).toLocaleLowerCase();
    const matchesName = searchable.includes(term);
    const matchesCategory = activeCategory === "all" || card.dataset.category === activeCategory;
    const show = matchesName && matchesCategory;
    card.hidden = !show;
    if (show) visible++;
  });
  resultCount.textContent = language === "ar" ? visible + " ألعاب" : visible + (visible === 1 ? " game" : " games");
  emptyState.hidden = visible !== 0;
}

function setLanguage(nextLanguage) {
  language = nextLanguage;
  const isArabic = language === "ar";
  document.documentElement.lang = language;
  document.documentElement.dir = isArabic ? "rtl" : "ltr";
  document.title = isArabic ? "لعبة | اكتشف ألعابك القادمة" : "GameHub | Discover your next game";
  document.querySelectorAll("[data-ar][data-en]").forEach((element) => {
    element.innerHTML = element.dataset[language];
  });
  searchInput.placeholder = isArabic ? searchInput.dataset.arPlaceholder : searchInput.dataset.enPlaceholder;
  languageToggle.textContent = isArabic ? "English" : "العربية";
  languageToggle.setAttribute("aria-label", isArabic ? "Switch to English" : "التبديل إلى العربية");
  document.body.classList.toggle("english", !isArabic);
  updateGames();
}

searchInput.addEventListener("input", updateGames);
filters.forEach((button) => {
  button.addEventListener("click", () => {
    activeCategory = button.dataset.category;
    filters.forEach((item) => item.classList.toggle("active", item === button));
    updateGames();
  });
});
languageToggle.addEventListener("click", () => setLanguage(language === "ar" ? "en" : "ar"));
document.getElementById("year").textContent = new Date().getFullYear();
setLanguage("ar");