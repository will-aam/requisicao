const sectors = [
  { code: "44", name: "Cozinha", number: "01" },
  { code: "58", name: "Padaria", number: "02" },
  { code: "56", name: "Bruna", number: "03" },
  { code: "53", name: "Produção de Bolos", number: "04" },
  { code: "55", name: "Eduardo", number: "05" },
  { code: "54", name: "Pizzaria", number: "06" },
  { code: "52", name: "Rozi", number: "07" },
  { code: "51", name: "Fernando", number: "08" },
];

let currentSectorIndex = 0;

function updateSectorDisplay() {
  const currentSectorButton = document.querySelector(".current-sector");
  const prevButton = document.querySelector(".prev-sector");
  const nextButton = document.querySelector(".next-sector");

  currentSectorButton.textContent = sectors[currentSectorIndex].name;
  currentSectorButton.dataset.tab = sectors[currentSectorIndex].code;

  prevButton.disabled = currentSectorIndex === 0;
  nextButton.disabled = currentSectorIndex === sectors.length - 1;
}

function showSector(code) {
  document
    .querySelectorAll(".tab-content")
    .forEach((content) => content.classList.remove("active"));
  document.getElementById(`tab-${code}`).classList.add("active");
}

document.querySelector(".current-sector").addEventListener("click", () => {
  showSector(sectors[currentSectorIndex].code);
});

document.querySelector(".prev-sector").addEventListener("click", () => {
  if (currentSectorIndex > 0) {
    currentSectorIndex--;
    updateSectorDisplay();
  }
});

document.querySelector(".next-sector").addEventListener("click", () => {
  if (currentSectorIndex < sectors.length - 1) {
    currentSectorIndex++;
    updateSectorDisplay();
  }
});

// Inicializa com o primeiro setor
updateSectorDisplay();
showSector(sectors[0].code);
