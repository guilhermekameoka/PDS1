document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const inputs = form.querySelectorAll("input");

  form.addEventListener("submit", function (event) {
    let allFilled = true;

    inputs.forEach(function (input) {
      if (input.value.trim() === "") {
        allFilled = false;
        input.classList.add("border-red-500"); // Adiciona uma borda vermelha ao campo vazio
      } else {
        input.classList.remove("border-red-500"); // Remove a borda vermelha se o campo estiver preenchido
      }
    });

    if (!allFilled) {
      event.preventDefault(); // Impede o envio do formulário
      alert("Por favor, preencha todos os campos."); // Exibe um alerta
    }
  });
});
