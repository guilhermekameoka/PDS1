document
  .getElementById("cadastroForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const usuario = {
      nome: document.getElementById("nome").value,
      idade: document.getElementById("idade").value,
      email: document.getElementById("email").value,
      telefone: document.getElementById("telefone").value,
      cep: document.getElementById("cep").value,
      rua: document.getElementById("rua").value,
      numero: document.getElementById("numero").value,
      cidade: document.getElementById("cidade").value,
      senha: document.getElementById("senha").value,
    };

    try {
      const response = await fetch("http://localhost:3000/cadastro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usuario),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Cadastro realizado com sucesso!");
        window.location.href = "./login.html";
      } else {
        alert("Erro: " + data.error);
      }
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      alert("Erro ao cadastrar.");
    }
  });
