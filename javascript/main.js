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

// Exibir mensagem estilizada
function showMessage(message, type = "success") {
  const alertDiv = document.createElement("div");
  alertDiv.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg text-white ${
    type === "success" ? "bg-green-500" : "bg-red-500"
  }`;
  alertDiv.textContent = message;
  document.body.appendChild(alertDiv);
  setTimeout(() => alertDiv.remove(), 3000);
}

// Data atual
function setCurrentDate() {
  const date = new Date().toLocaleDateString("pt-BR");
  document.querySelectorAll('[id^="current-date-"]').forEach((el) => {
    el.textContent = date;
  });
}

// Carregar lista do localStorage ou usar padrão
function loadList(sector) {
  const storedList = localStorage.getItem(`lista_${sector}`);
  return storedList ? JSON.parse(storedList) : [...(listas[sector] || [])];
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
      <td class="border p-2">
        <input 
          type="text" 
          class="w-full p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
          placeholder="Quantidade" 
          value="${item.quantity || ""}"
          aria-label="Quantidade do item ${item.name}"
        >
      </td>
      <td class="border p-2">
        <button 
          class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition" 
          onclick="removeItem('${sector}', ${index})"
          aria-label="Remover item ${item.name}"
        >
          Remover
        </button>
      </td>
    `;
    tbody.appendChild(row);
  });

  // Atualizar quantidade no localStorage ao mudar
  tbody.querySelectorAll("input[type='text']").forEach((input, index) => {
    input.addEventListener("input", () => {
      const value = input.value.trim();
      const list = loadList(sector);
      if (value === "" || !isNaN(value.replace(",", "."))) {
        list[index].quantity = value;
        saveList(sector, list);
      } else {
        showMessage("Quantidade inválida!", "error");
        input.value = list[index].quantity || "";
      }
    });
  });
}

// Remover item
function removeItem(sector, index) {
  const list = loadList(sector);
  const itemName = list[index].name;
  list.splice(index, 1);
  saveList(sector, list);
  renderList(sector);
  showMessage(`Item "${itemName}" removido!`, "success");
}

// Limpar quantidades e restaurar lista padrão
function clearQuantities() {
  const sectorCodes = ["44", "58", "56", "53", "55", "54", "52", "51"];
  sectorCodes.forEach((code) => {
    const list = [...(listas[code] || [])];
    list.forEach((item) => (item.quantity = ""));
    saveList(code, list);
    renderList(code);
  });
  showMessage("Quantidades limpas e listas restauradas!", "success");
}

// Autocomplete com baseItens
function setupAutocomplete(sector) {
  const searchInput = document.getElementById(`search-${sector}`);
  const suggestionsDiv = document.getElementById(`suggestions-${sector}`);

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();
    suggestionsDiv.innerHTML = "";
    if (query.length < 2) return;

    const filteredItems = baseItens.filter((item) =>
      item.name.toLowerCase().includes(query)
    );

    filteredItems.slice(0, 5).forEach((item) => {
      const div = document.createElement("div");
      div.className = "p-2 hover:bg-gray-100 cursor-pointer";
      div.textContent = item.name;
      div.addEventListener("click", () => {
        const list = loadList(sector);
        if (list.some((i) => i.code === item.code)) {
          showMessage("Item já está na lista!", "error");
          return;
        }
        list.push({
          code: item.code,
          name: item.name,
          unit: item.unit,
          quantity: "1",
        });
        saveList(sector, list);
        renderList(sector);
        searchInput.value = "";
        suggestionsDiv.innerHTML = "";
        showMessage(`Item "${item.name}" adicionado!`, "success");
      });
      suggestionsDiv.appendChild(div);
    });
  });

  document.addEventListener("click", (e) => {
    if (!suggestionsDiv.contains(e.target) && e.target !== searchInput) {
      suggestionsDiv.innerHTML = "";
    }
  });
}

// Gerar relatório em PDF e CSV
function generateReport() {
  const spinner = document.getElementById("loading-spinner");
  if (spinner) spinner.classList.remove("hidden");

  setTimeout(() => {
    const date = new Date().toLocaleDateString("pt-BR");
    const sectorCodes = ["44", "58", "56", "53", "55", "54", "52", "51"];
    const tableData = [];

    sectorCodes.forEach((code) => {
      const list = loadList(code);
      const sector = sectors.find((s) => s.code === code);
      list.forEach((item) => {
        if (item.quantity && Number(item.quantity.replace(",", ".")) > 0) {
          tableData.push([
            code,
            sector.name,
            item.code,
            item.name,
            item.unit,
            item.quantity, // Use raw quantity with comma
          ]);
        }
      });
    });

    if (tableData.length === 0) {
      if (spinner) spinner.classList.add("hidden");
      showMessage("Nenhuma requisição preenchida encontrada.", "error");
      return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    let y = 10;

    doc.setFont("Arial", "bold");
    doc.setFontSize(16);
    doc.setTextColor(40, 40, 40);
    doc.text("Relatório de Requisições de Insumos", 10, y);
    y += 10;

    doc.setFont("Arial", "normal");
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
      styles: {
        font: "Arial",
        fontSize: 9,
        textColor: [40, 40, 40],
        lineWidth: 0.1,
      },
      headStyles: {
        fillColor: [200, 220, 255],
        textColor: [40, 40, 40],
        fontStyle: "bold",
      },
      alternateRowStyles: { fillColor: [245, 245, 245] },
      margin: { top: 30 },
    });

    doc.save(`relatorio_requisicoes_${date.replace(/\//g, "-")}.pdf`);

    let csvContent = "Código Setor;Setor;Código;Nome;Unidade;Quantidade\n";
    sectorCodes.forEach((code) => {
      const list = loadList(code);
      const sector = sectors.find((s) => s.code === code);
      list.forEach((item) => {
        if (item.quantity && Number(item.quantity.replace(",", ".")) > 0) {
          csvContent += `${code};${sector.name};${item.code};${item.name};${item.unit};${item.quantity}\n`;
        }
      });
    });

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `relatorio_requisicoes_${date.replace(/\//g, "-")}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);

    if (spinner) spinner.classList.add("hidden");
    showMessage("Relatório gerado com sucesso!", "success");
  }, 1000);
}

// Inicialização
function init() {
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
}

// Executar inicialização
init();
