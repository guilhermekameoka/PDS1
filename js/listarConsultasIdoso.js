document.addEventListener("DOMContentLoaded", async () => {
  // Obtém o ID do idoso logado do localStorage
  const idosoId = localStorage.getItem("usuarioId");

  if (!idosoId) {
    alert("Usuário não identificado. Por favor, faça login novamente.");
    window.location.href = "../comum/login.html";
    return;
  }

  // Verifica se é um idoso
  const usuarioTipo = localStorage.getItem("usuarioTipo");
  if (usuarioTipo !== "idoso") {
    alert("Esta página é exclusiva para idosos.");
    window.location.href = "../comum/home.html";
    return;
  }

  const consultasContainer = document.getElementById("consultas-container");
  const searchInput = document.getElementById("search-consulta");

  // Carrega as consultas do idoso
  await carregarConsultas();

  // Adiciona evento de pesquisa
  if (searchInput) {
    searchInput.addEventListener("input", filtrarConsultas);
  }

  // Função para carregar consultas do idoso
  async function carregarConsultas() {
    try {
      // Exibe mensagem de carregamento
      consultasContainer.innerHTML =
        '<p class="text-center text-gray-500 my-4">Carregando consultas...</p>';

      // Faz a requisição para a API
      const response = await fetch(
        `http://localhost:3000/consulta/paciente/${idosoId}`
      );

      if (!response.ok) {
        throw new Error("Erro ao carregar consultas");
      }

      const consultas = await response.json();

      // Limpa o container
      consultasContainer.innerHTML = "";

      // Verifica se há consultas para exibir
      if (consultas.length === 0) {
        consultasContainer.innerHTML =
          '<p class="text-center text-gray-500 my-4">Nenhuma consulta agendada</p>';
        return;
      }

      // Organiza consultas por data
      const consultasOrganizadas = organizarPorData(consultas);

      // Exibe as consultas organizadas na página
      for (const [data, consultasData] of Object.entries(
        consultasOrganizadas
      )) {
        // Adiciona cabeçalho de data se houver mais de um dia
        if (Object.keys(consultasOrganizadas).length > 1) {
          const headerDate = document.createElement("h3");
          headerDate.className = "font-medium text-blue-800 mt-6 mb-2";
          headerDate.textContent = formatarData(data);
          consultasContainer.appendChild(headerDate);
        }

        // Adiciona cada consulta do dia
        consultasData.forEach((consulta) => {
          const consultaElement = document.createElement("div");
          consultaElement.className =
            "bg-white p-4 rounded-lg shadow flex items-center mb-3 consulta-item";
          consultaElement.dataset.medico = consulta.nome_medico.toLowerCase();

          consultaElement.innerHTML = `
            <div class="flex-1">
              <p class="font-medium">Dr(a). ${consulta.nome_medico}</p>
              <p class="text-blue-500">${formatarHora(consulta.hora)}</p>
              <p class="text-sm text-gray-500">${consulta.local}</p>
              ${
                consulta.observacoes
                  ? `<p class="text-xs text-gray-500 mt-1">${consulta.observacoes}</p>`
                  : ""
              }
            </div>
            <div class="w-10 h-10 bg-blue-300 rounded-full flex items-center justify-center">
              <img src="../../assets/Lifesavers Stethoscope from Saude Senior.png" alt="Doctor" class="rounded-full w-8 h-8">
            </div>
          `;

          consultasContainer.appendChild(consultaElement);
        });
      }
    } catch (error) {
      console.error("Erro ao carregar consultas:", error);
      consultasContainer.innerHTML =
        '<p class="text-center text-red-500 my-4">Erro ao carregar consultas. Tente novamente mais tarde.</p>';
    }
  }

  // Função para filtrar consultas com base na pesquisa
  function filtrarConsultas() {
    const termo = searchInput.value.toLowerCase().trim();
    const consultas = document.querySelectorAll(".consulta-item");

    consultas.forEach((item) => {
      const medico = item.dataset.medico;
      if (medico.includes(termo)) {
        item.style.display = "flex";
      } else {
        item.style.display = "none";
      }
    });

    // Se não houver resultados visíveis após a filtragem
    let todosOcultos = true;
    consultas.forEach((item) => {
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
        mensagem.textContent = "Nenhuma consulta encontrada";
        consultasContainer.appendChild(mensagem);
      }
    } else if (nenhumResultado) {
      nenhumResultado.remove();
    }
  }

  // Função para organizar consultas por data
  function organizarPorData(consultas) {
    const organizadas = {};

    consultas.forEach((consulta) => {
      const data = consulta.data.split("T")[0]; // Formato ISO

      if (!organizadas[data]) {
        organizadas[data] = [];
      }

      organizadas[data].push(consulta);
    });

    // Ordena cada grupo de consultas por hora
    for (const data in organizadas) {
      organizadas[data].sort((a, b) => {
        return (
          new Date(`2000-01-01T${a.hora}`) - new Date(`2000-01-01T${b.hora}`)
        );
      });
    }

    return organizadas;
  }

  // Função para formatar data de YYYY-MM-DD para DD/MM/YYYY
  function formatarData(dataISO) {
    const data = new Date(dataISO);
    const dia = String(data.getDate()).padStart(2, "0");
    const mes = String(data.getMonth() + 1).padStart(2, "0");

    // Adiciona nome do dia da semana
    const diasSemana = [
      "Domingo",
      "Segunda-feira",
      "Terça-feira",
      "Quarta-feira",
      "Quinta-feira",
      "Sexta-feira",
      "Sábado",
    ];
    const diaSemana = diasSemana[data.getDay()];

    return `${diaSemana}, ${dia}/${mes}`;
  }

  // Função para formatar hora de HH:MM:SS para HH:MM
  function formatarHora(horaCompleta) {
    return horaCompleta.substr(0, 5);
  }
});
