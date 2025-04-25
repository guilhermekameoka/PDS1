document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("medicamento-form")
    .addEventListener("submit", cadastrarMedicamento);
});

async function cadastrarMedicamento(event) {
  event.preventDefault();

  // Obtém o ID do usuário médico logado
  const medicoId = localStorage.getItem("usuarioId");

  if (!medicoId) {
    alert("Médico não identificado. Por favor, faça login novamente.");
    window.location.href = "../comum/login.html";
    return;
  }

  // Obtém o ID do paciente selecionado
  const pacienteSelect = document.getElementById("paciente");
  const pacienteId = pacienteSelect.value;

  if (!pacienteId) {
    alert("Por favor, selecione um paciente.");
    return;
  }

  const dados = {
    nome: document.getElementById("nome").value,
    data_inicial: document.getElementById("data-inicial").value,
    data_final: document.getElementById("data-final").value,
    frequencia: document.getElementById("frequencia").value,
    hora: document.getElementById("hora").value,
    dose: document.getElementById("dose").value,
    id_usuario: parseInt(pacienteId), // Usa o ID do paciente selecionado
    id_medico: parseInt(medicoId), // Adiciona o ID do médico que está prescrevendo
  };

  try {
    const response = await fetch("http://localhost:3000/medicamento", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    });

    const result = await response.json();
    if (response.ok) {
      alert("Medicamento cadastrado com sucesso para o paciente!");
      document.getElementById("medicamento-form").reset();
    } else {
      alert(
        "Erro: " +
          (result.error || "Erro desconhecido ao cadastrar medicamento")
      );
    }
  } catch (error) {
    console.error("Erro ao cadastrar medicamento:", error);
    alert(
      "Erro de conexão ao cadastrar medicamento. Verifique sua conexão com a internet."
    );
  }
}
