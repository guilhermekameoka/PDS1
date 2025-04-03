document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("medicamento-form")
    .addEventListener("submit", cadastrarMedicamento);
});

async function cadastrarMedicamento(event) {
  event.preventDefault();

  const dados = {
    nome: document.getElementById("nome").value,
    data_inicial: document.getElementById("data-inicial").value,
    data_final: document.getElementById("data-final").value,
    frequencia: document.getElementById("frequencia").value,
    hora: document.getElementById("hora").value,
    dose: document.getElementById("dose").value,
  };

  try {
    const response = await fetch("http://localhost:3000/medicamentos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    });

    const result = await response.json();
    if (response.ok) {
      alert("Medicamento cadastrado com sucesso!");
      document.getElementById("medicamento-form").reset();
    } else {
      alert("Erro: " + result.error);
    }
  } catch (error) {
    console.error("Erro ao cadastrar medicamento:", error);
  }
}
