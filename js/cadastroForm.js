document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("cadastroForm");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const usuario = obterDadosFormulario();

    if (!validarCampos(usuario)) {
      alert("Preencha todos os campos corretamente.");
      return;
    }

    try {
      const response = await enviarCadastro(usuario);
      const data = await response.json();

      if (response.ok) {
        alert("Cadastro realizado com sucesso!");
        window.location.href = "../home.html";
      } else {
        alert("Erro: " + (data.error || "Erro desconhecido"));
      }
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      alert("Erro ao cadastrar. Verifique sua conexão.");
    }
  });

  function obterDadosFormulario() {
    return {
      nome: document.querySelector("[name=nome]").value.trim(),
      idade: Number(document.querySelector("[name=idade]").value),
      email: document.querySelector("[name=email]").value.trim(),
      telefone: document.querySelector("[name=telefone]").value.trim(),
      cep: document.querySelector("[name=cep]").value.trim(),
      rua: document.querySelector("[name=rua]").value.trim(),
      numero: Number(document.querySelector("[name=numero]").value),
      cidade: document.querySelector("[name=cidade]").value.trim(),
      senha: document.querySelector("[name=senha]").value,
    };
  }

  function validarCampos(usuario) {
    if (
      !usuario.nome ||
      !usuario.email ||
      !usuario.telefone ||
      !usuario.cep ||
      !usuario.rua ||
      !usuario.numero ||
      !usuario.cidade ||
      !usuario.senha
    ) {
      return false;
    }

    if (usuario.idade < 1 || usuario.idade > 120 || isNaN(usuario.idade)) {
      return false;
    }

    if (!usuario.email.includes("@")) {
      return false;
    }

    if (usuario.senha.length < 6) {
      return false;
    }

    return true;
  }

  async function enviarCadastro(usuario) {
    return fetch("http://localhost:3000/cadastro", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    });
  }
});
