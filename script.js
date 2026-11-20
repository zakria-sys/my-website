const searchInput = document.getElementById("gameSearch");
const cards = [...document.querySelectorAll(".game-card")];
const filters = [...document.querySelectorAll(".filter")];
const resultCount = document.getElementById("resultCount");
const emptyState = document.getElementById("emptyState");
let activeCategory = "all";

function updateGames() {
  const term = searchInput.value.trim().toLocaleLowerCase("ar");
  let visible = 0;
  cards.forEach((card) => {
    const matchesName = card.dataset.name.toLocaleLowerCase("ar").includes(term)
      || card.querySelector("h3").textContent.toLocaleLowerCase("ar").includes(term);
    const matchesCategory = activeCategory === "all" || card.dataset.category === activeCategory;
    const show = matchesName && matchesCategory;
    card.hidden = !show;
    if (show) visible++;
  });
  resultCount.textContent = visible + " ألعاب";
  emptyState.hidden = visible !== 0;
}

searchInput.addEventListener("input", updateGames);
filters.forEach((button) => {
  button.addEventListener("click", () => {
    activeCategory = button.dataset.category;
    filters.forEach((item) => item.classList.toggle("active", item === button));
    updateGames();
  });
});
document.getElementById("year").textContent = new Date().getFullYear();
updateGames();