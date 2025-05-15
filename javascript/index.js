// Lista de itens para autocomplete (exemplo)
const items = [
  { code: "001", name: "Farinha de Trigo", unit: "kg" },
  { code: "002", name: "Açúcar", unit: "kg" },
  { code: "003", name: "Ovo", unit: "un" },
];

// Data atual
function setCurrentDate() {
  const date = new Date().toLocaleDateString("pt-BR");
  document
    .querySelectorAll('[id^="current-date-"]')
    .forEach((el) => (el.textContent = date));
}

// Autocomplete
function setupAutocomplete(sector) {
  const searchInput = document.getElementById(`search-${sector}`);
  const suggestionsDiv = document.getElementById(`suggestions-${sector}`);
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    suggestionsDiv.innerHTML = "";
    if (query) {
      const filteredItems = items.filter((item) =>
        item.name.toLowerCase().includes(query)
      );
      filteredItems.forEach((item) => {
        const div = document.createElement("div");
        div.textContent = item.name;
        div.addEventListener("click", () => {
          addItemToTable(sector, item);
          searchInput.value = "";
          suggestionsDiv.innerHTML = "";
        });
        suggestionsDiv.appendChild(div);
      });
    }
  });
}

// Adicionar item à tabela
function addItemToTable(sector, item) {
  const tbody = document.getElementById(`table-body-${sector}`);
  const row = document.createElement("tr");
  row.innerHTML = `
        <td class="border p-2">${item.code}</td>
        <td class="border p-2">${item.name}</td>
        <td class="border p-2">${item.unit}</td>
        <td class="border p-2"><input type="number" class="w-full p-1" placeholder="Quantidade" min="0"></td>
        <td.................................................................................... class="border p-2">
          <button class="bg-red-500 text-white px-2 py-1 rounded" onclick="this.parentElement.parentElement.remove()">Remover</button>
        </td>
      `;
  tbody.appendChild(row);
}

// Gerar relatório em PDF
function generateReport() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const date = new Date().toLocaleDateString("pt-BR");
  let y = 10;

  doc.setFontSize(16);
  doc.text("Relatório de Requisições de Insumos", 10, y);
  y += 10;

  doc.setFontSize(12);
  doc.text(`Data: ${date}`, 10, y);
  y += 10;

  const tableData = [];
  const sectorCodes = ["44", "58", "56", "53", "55", "54", "52", "51"];

  sectorCodes.forEach((code) => {
    const tbody = document.getElementById(`table-body-${code}`);
    const rows = tbody.querySelectorAll("tr");
    rows.forEach((row) => {
      const cells = row.querySelectorAll("td");
      const quantity = cells[3].querySelector("input").value;
      if (quantity && Number(quantity) > 0) {
        const sector = sectors.find((s) => s.code === code);
        tableData.push([
          date,
          sector.name,
          code,
          sector.number,
          cells[0].textContent,
          cells[1].textContent,
          cells[2].textContent,
          quantity,
        ]);
      }
    });
  });

  if (tableData.length === 0) {
    alert("Nenhuma requisição preenchida encontrada.");
    return;
  }

  doc.autoTable({
    startY: y,
    head: [
      [
        "Data",
        "Setor",
        "Código Setor",
        "Número Setor",
        "Código Item",
        "Item",
        "Unidade",
        "Quantidade Removida",
      ],
    ],
    body: tableData,
    theme: "grid",
    styles: { fontSize: 8 },
    headStyles: { fillColor: [100, 100, 100] },
  });

  doc.save(`relatorio_requisicoes_${date.replace(/\//g, "-")}.pdf`);
}

// Inicialização
setCurrentDate();
["44", "58", "56", "53", "55", "54", "52", "51"].forEach(setupAutocomplete);
document
  .getElementById("generate-report")
  .addEventListener("click", generateReport);
