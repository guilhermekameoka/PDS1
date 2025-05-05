document.addEventListener("DOMContentLoaded", async () => {
  // Verifica se o usuário está logado como médico
  const usuarioTipo = localStorage.getItem("usuarioTipo");

  if (usuarioTipo !== "medico") {
    console.error(
      "Acesso não autorizado. Esta função é exclusiva para médicos."
    );
    return;
  }

  const pacienteSelect = document.getElementById("paciente");

  // Desabilita o select enquanto carrega os dados
  pacienteSelect.disabled = true;

  try {
    // Busca a lista de pacientes (idosos) da API
    const response = await fetch("http://localhost:3000/usuarios/idosos", {
      method: "GET",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("jwt") || ""}`
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao carregar a lista de pacientes");
    }

    const pacientes = await response.json();

    // Adiciona as opções de pacientes ao select
    if (pacientes && pacientes.length > 0) {
      pacientes.forEach((paciente) => {
        const option = document.createElement("option");
        option.value = paciente.id;
        option.textContent = paciente.nome;
        pacienteSelect.appendChild(option);
      });
    } else {
      // Se não houver pacientes, adiciona uma opção informativa
      const option = document.createElement("option");
      option.value = "";
      option.textContent = "Nenhum paciente encontrado";
      option.disabled = true;
      pacienteSelect.appendChild(option);
    }
  } catch (error) {
    console.error("Erro ao carregar pacientes:", error);

  } finally {
    // Reativa o select após carregar os dados
    pacienteSelect.disabled = false;
  }
});
