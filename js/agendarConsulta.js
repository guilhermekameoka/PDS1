document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("consulta-form")
    .addEventListener("submit", agendarConsulta);
});

async function agendarConsulta(event) {
  event.preventDefault();

  // Obtém o ID do médico logado
  const medicoId = localStorage.getItem("usuarioId");
  
  if (!medicoId) {
    alert("Médico não identificado. Por favor, faça login novamente.");
    window.location.href = "../comum/login.html";
    return;
  }
  
  // Verifica se é um médico
  const usuarioTipo = localStorage.getItem("usuarioTipo");
  if (usuarioTipo !== "medico") {
    alert("Apenas médicos podem agendar consultas.");
    window.location.href = "../comum/home.html";
    return;
  }
  
  // Obtém o ID do paciente selecionado
  const pacienteSelect = document.getElementById("paciente");
  const pacienteId = pacienteSelect.value;
  
  if (!pacienteId) {
    alert("Por favor, selecione um paciente.");
    return;
  }

  // Prepara os dados da consulta
  const dados = {
    data: document.getElementById("data").value,
    hora: document.getElementById("hora").value,
    local: document.getElementById("local").value,
    observacoes: document.getElementById("observacoes").value,
    id_medico: parseInt(medicoId),
    id_paciente: parseInt(pacienteId)
  };

  try {
    const response = await fetch("http://localhost:3000/consulta", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    });

    const result = await response.json();
    if (response.ok) {
      alert("Consulta agendada com sucesso!");
      document.getElementById("consulta-form").reset();
    } else {
      alert("Erro: " + (result.error || "Erro desconhecido ao agendar consulta"));
    }
  } catch (error) {
    console.error("Erro ao agendar consulta:", error);
    alert("Erro de conexão ao agendar consulta. Verifique sua conexão com a internet.");
  }
}