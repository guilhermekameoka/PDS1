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
        let data;
        try {
          data = await response.json();
        } catch (error) {
          data = {}; // Caso a resposta não seja um JSON válido
        }

        if (response.ok) {
          alert("Cadastro realizado com sucesso!");
          window.location.href = "../home.html";
        } else {
          alert("Erro: " + (data.error || "Ocorreu um erro inesperado"));
        }
      } catch (error) {
        console.error("Erro ao enviar dados:", error);
        alert("Erro ao cadastrar. Verifique sua conexão.");
      }
  });

  function obterDadosFormulario() {
    return {
      nome: document.querySelector("[name=nome]").value.trim(),
      idade: document.querySelector("[name=idade]").value.trim(),
      email: document.querySelector("[name=email]").value.trim(),
      telefone: document.querySelector("[name=telefone]").value.trim(),
      cep: document.querySelector("[name=cep]").value.trim(),
      rua: document.querySelector("[name=rua]").value.trim(),
      numero: document.querySelector("[name=numero]").value.trim(),
      cidade: document.querySelector("[name=cidade]").value.trim(),
      senha: document.querySelector("[name=senha]").value.trim(),
    };
  }

  function validarCampos(usuario) {
    for (const chave in usuario) {
      if (!usuario[chave]) {
        return false;
      }
    }

    if (isNaN(usuario.idade) || usuario.idade < 1 || usuario.idade > 120) {
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
