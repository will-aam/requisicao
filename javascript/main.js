// Mapa de listas por setor
const listas = {
  44: listaCozinha,
  58: listaPadaria,
  56: listaBruna,
  53: listaProducaoBolos,
  55: listaEduardo,
  54: listaPizzaria,
  52: listaRozi,
  51: listaFernando,
};

// Data atual
function setCurrentDate() {
  const date = new Date().toLocaleDateString("pt-BR");
  document
    .querySelectorAll('[id^="current-date-"]')
    .forEach((el) => (el.textContent = date));
}

// Carregar lista do localStorage ou usar padrão
function loadList(sector) {
  const storedList = localStorage.getItem(`lista_${sector}`);
  return storedList ? JSON.parse(storedList) : listas[sector] || [];
}

// Salvar lista no localStorage
function saveList(sector, list) {
  localStorage.setItem(`lista_${sector}`, JSON.stringify(list));
}

// Renderizar lista na tabela
function renderList(sector) {
  const tbody = document.getElementById(`table-body-${sector}`);
  tbody.innerHTML = "";
  const list = loadList(sector);

  list.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="border p-2">${item.code}</td>
      <td class="border p-2">${item.name}</td>
      <td class="border p-2">${item.unit}</td>
      <td class="border p-2"><input type="number" class="w-full p-1" placeholder="Quantidade" min="0" value="${
        item.quantity || ""
      }"></td>
      <td class="border p-2">
        <button class="bg-red-500 text-white px-2 py-1 rounded" onclick="removeItem('${sector}', ${index})">Remover</button>
      </td>
    `;
    tbody.appendChild(row);
  });

  // Atualizar quantidade no localStorage ao mudar
  tbody.querySelectorAll("input[type='number']").forEach((input, index) => {
    input.addEventListener("change", () => {
      const list = loadList(sector);
      list[index].quantity = input.value;
      saveList(sector, list);
    });
  });
}

// Remover item
function removeItem(sector, index) {
  const list = loadList(sector);
  list.splice(index, 1);
  saveList(sector, list);
  renderList(sector);
}

// Limpar quantidades e restaurar lista padrão
function clearQuantities() {
  const sectorCodes = ["44", "58", "56", "53", "55", "54", "52", "51"];
  sectorCodes.forEach((code) => {
    // Restaurar apenas os itens da lista padrão do setor
    const list = listas[code] ? [...listas[code]] : [];
    list.forEach((item) => {
      item.quantity = "";
    });
    saveList(code, list);
    renderList(code);
  });
  alert("Quantidades limpas e listas restauradas!");
}

// Autocomplete com baseItens
function setupAutocomplete(sector) {
  const searchInput = document.getElementById(`search-${sector}`);
  const suggestionsDiv = document.getElementById(`suggestions-${sector}`);
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    suggestionsDiv.innerHTML = "";
    if (query) {
      const filteredItems = baseItens.filter((item) =>
        item.name.toLowerCase().includes(query)
      );
      filteredItems.forEach((item) => {
        const div = document.createElement("div");
        div.textContent = item.name;
        div.addEventListener("click", () => {
          const list = loadList(sector);
          // Evitar duplicatas
          if (!list.some((i) => i.code === item.code)) {
            list.push({
              code: item.code,
              name: item.name,
              unit: item.unit,
              quantity: "1",
            });
            saveList(sector, list);
          } else {
            const index = list.findIndex((i) => i.code === item.code);
            list[index].quantity = list[index].quantity || "1";
            saveList(sector, list);
          }
          renderList(sector);
          searchInput.value = "";
          suggestionsDiv.innerHTML = "";
        });
        suggestionsDiv.appendChild(div);
      });
    }
  });
}

// Gerar relatório em PDF e CSV
function generateReport() {
  const date = new Date().toLocaleDateString("pt-BR");
  const sectorCodes = ["44", "58", "56", "53", "55", "54", "52", "51"];
  const tableData = [];

  // Coleta de dados para PDF
  sectorCodes.forEach((code) => {
    const list = loadList(code);
    const sector = sectors.find((s) => s.code === code);
    list.forEach((item) => {
      if (item.quantity && Number(item.quantity) > 0) {
        tableData.push([
          code,
          sector.name,
          item.code,
          item.name,
          item.unit,
          item.quantity,
        ]);
      }
    });
  });

  if (tableData.length === 0) {
    alert("Nenhuma requisição preenchida encontrada.");
    return;
  }

  // Gerar PDF
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  let y = 10;

  doc.setFontSize(16);
  doc.text("Relatório de Requisições de Insumos", 10, y);
  y += 10;

  doc.setFontSize(12);
  doc.text(`Data: ${date}`, 10, y);
  y += 10;

  doc.autoTable({
    startY: y,
    head: [
      [
        "Código Setor",
        "Setor",
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

  // Gerar CSV
  let csvContent = "Código Setor;Setor;Código;Nome;Unidade;Quantidade";
  sectorCodes.forEach((code) => {
    const tbody = document.getElementById(`table-body-${code}`);
    const sector = sectors.find((s) => s.code === code);
    if (tbody) {
      const rows = tbody.querySelectorAll("tr");
      rows.forEach((row) => {
        const codigo = row.querySelector("td:nth-child(1)").textContent.trim();
        const nome = row.querySelector("td:nth-child(2)").textContent.trim();
        const unidade = row.querySelector("td:nth-child(3)").textContent.trim();
        const input = row.querySelector("td:nth-child(4) input");
        const quantidade =
          input && input.value.trim() && Number(input.value.trim()) > 0
            ? input.value.trim()
            : "0";

        if (quantidade !== "0") {
          csvContent += `\n${code};${sector.name};${codigo};${nome};${unidade};${quantidade}`;
        }
      });
    }
  });

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `relatorio_requisicoes_${date.replace(/\//g, "-")}.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
}

// Inicialização
setCurrentDate();
const sectorCodes = ["44", "58", "56", "53", "55", "54", "52", "51"];
sectorCodes.forEach((code) => {
  setupAutocomplete(code);
  renderList(code);
});
document
  .getElementById("generate-report")
  .addEventListener("click", generateReport);
document
  .getElementById("clear-quantities")
  .addEventListener("click", clearQuantities);

// Carregar lista ao mudar de setor
document.querySelector(".current-sector").addEventListener("click", () => {
  const sectorCode = document.querySelector(".current-sector").dataset.tab;
  renderList(sectorCode);
});
document.querySelector(".prev-sector").addEventListener("click", () => {
  setTimeout(() => {
    const sectorCode = document.querySelector(".current-sector").dataset.tab;
    renderList(sectorCode);
  }, 100);
});
document.querySelector(".next-sector").addEventListener("click", () => {
  setTimeout(() => {
    const sectorCode = document.querySelector(".current-sector").dataset.tab;
    renderList(sectorCode);
  }, 100);
});
