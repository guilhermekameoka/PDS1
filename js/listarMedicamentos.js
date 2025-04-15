document.addEventListener("DOMContentLoaded", async () => {
  // Obtém o ID do usuário logado do localStorage
  const usuarioId = localStorage.getItem("usuarioId");

  if (!usuarioId) {
    alert("Usuário não identificado. Por favor, faça login novamente.");
    window.location.href = "../comum/login.html";
    return;
  }

  const medicamentosContainer = document.getElementById("medicamentos-container");
  const searchInput = document.getElementById("search-medicamento");

  // Carrega os medicamentos do usuário
  await carregarMedicamentos();

  // Adiciona evento de pesquisa (se o campo de busca existir)
  if (searchInput) {
    searchInput.addEventListener("input", filtrarMedicamentos);
  }

  // Função para carregar medicamentos do usuário
  async function carregarMedicamentos() {
    try {
      // Exibe mensagem de carregamento
      medicamentosContainer.innerHTML =
        '<p class="text-center text-gray-500 my-4">Carregando medicamentos...</p>';

      // Faz a requisição para a API
      const response = await fetch(
        `http://localhost:3000/medicamento/usuario/${usuarioId}`
      );

      if (!response.ok) {
        throw new Error("Erro ao carregar medicamentos");
      }

      const medicamentos = await response.json();

      // Limpa o container
      medicamentosContainer.innerHTML = "";

      // Verifica se há medicamentos para exibir
      if (medicamentos.length === 0) {
        medicamentosContainer.innerHTML =
          '<p class="text-center text-gray-500 my-4">Nenhum medicamento registrado</p>';
        return;
      }

      // Exibe os medicamentos na página
      medicamentos.forEach((medicamento) => {
        const dataInicial = new Date(medicamento.data_inicial).toLocaleDateString();
        const dataFinal = new Date(medicamento.data_final).toLocaleDateString();

        const medicamentoElement = document.createElement("div");
        medicamentoElement.className =
          "p-4 bg-gray-100 rounded-lg shadow-md medicamento-item flex justfy-between items-center";
        medicamentoElement.dataset.nome = medicamento.nome.toLowerCase();

        // Formata as informações do medicamento
        let medicoInfo = medicamento.medico_nome
          ? `<p class="text-xs text-gray-500">Prescrito por: Dr(a). ${medicamento.medico_nome}</p>`
          : "";

        medicamentoElement.innerHTML = `
        <div>
          <h2 class="text-lg font-semibold text-gray-800">${medicamento.nome}</h2>
          <p class="text-sm text-gray-600">Dosagem: ${medicamento.dose}, ${medicamento.frequencia}, às ${medicamento.hora}</p>
          <p class="text-xs text-gray-500">Período: ${dataInicial} - ${dataFinal}</p>
          ${medicoInfo}
          </div>
          <button class="delete-btn">
            <img src="../../assets/trash.png" alt="Excluir" class="w-6 h-6 hover:opacity-80"
          </button>
        `;

        // Adiciona evento ao botão de exclusão
        medicamentoElement.querySelector(".delete-btn").addEventListener("click", () => {
          excluirMedicamento(medicamento.id, medicamentoElement);
        });

        medicamentosContainer.appendChild(medicamentoElement);
      });
    } catch (error) {
      console.error("Erro ao carregar medicamentos:", error);
      medicamentosContainer.innerHTML =
        '<p class="text-center text-red-500 my-4">Erro ao carregar medicamentos. Tente novamente mais tarde.</p>';
    }
  }

  // Função para excluir medicamento
  async function excluirMedicamento(medicamentoId, elementoDOM) {
    // Confirma com o usuário antes de excluir
    if (!confirm("Tem certeza que deseja excluir este medicamento?")) {
      return;
    }

    try {
      // Faz a requisição DELETE para a API usando a rota específica para exclusão
      const response = await fetch(
        `http://localhost:3000/excluir-medicamento/${medicamentoId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao excluir medicamento");
      }

      // Se a exclusão for bem sucedida, remove o elemento da DOM
      elementoDOM.remove();
      
      // Verifica se não há mais medicamentos na lista
      if (medicamentosContainer.children.length === 0) {
        medicamentosContainer.innerHTML =
          '<p class="text-center text-gray-500 my-4">Nenhum medicamento registrado</p>';
      }

      // Exibe mensagem de sucesso
      alert("Medicamento excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir medicamento:", error);
      alert("Erro ao excluir medicamento. Tente novamente mais tarde.");
    }
  }

  // Função para filtrar medicamentos com base na pesquisa
  function filtrarMedicamentos() {
    const termo = searchInput.value.toLowerCase().trim();
    const medicamentos = document.querySelectorAll(".medicamento-item");

    medicamentos.forEach((item) => {
      const nome = item.dataset.nome;
      if (nome.includes(termo)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });

    // Se não houver resultados visíveis após a filtragem
    let todosOcultos = true;
    medicamentos.forEach((item) => {
      if (item.style.display !== "none") {
        todosOcultos = false;
      }
    });

    // Exibe mensagem se nenhum resultado for encontrado
    const nenhumResultado = document.getElementById("nenhum-resultado");
    if (todosOcultos && termo !== "") {
      if (!nenhumResultado) {
        const mensagem = document.createElement("p");
        mensagem.id = "nenhum-resultado";
        mensagem.className = "text-center text-gray-500 my-4";
        mensagem.textContent = "Nenhum medicamento encontrado";
        medicamentosContainer.appendChild(mensagem);
      }
    } else if (nenhumResultado) {
      nenhumResultado.remove();
    }
  }
});
