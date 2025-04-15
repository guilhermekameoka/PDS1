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
        window.location.href = "./login.html";
      } else {
        alert("Erro: " + (data.error || "Ocorreu um erro inesperado"));
      }
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      alert("Erro ao cadastrar. Verifique sua conexão.");
    }
  });

  document.querySelector("[name=cep]").addEventListener("blur", function () {
    const cep = this.value.replace(/\D/g, ""); // Remove caracteres não numéricos
    if (cep.length === 8) {
      buscarEndereco(cep);
    } else {
      alert("CEP inválido. Certifique-se de que possui 8 dígitos.");
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
      tipo_usuario: document.querySelector("[name=tipo_usuario]").value.trim(),
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

    // Validar o tipo de usuário
    if (!['medico', 'idoso', 'cuidador'].includes(usuario.tipo_usuario)) {
      alert("Por favor, selecione um perfil válido.");
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


  function aplicarMascara(input, mascara) {
    input.addEventListener("input", function () {
      let valor = input.value.replace(/\D/g, ""); // Remove caracteres não numéricos
      let resultado = "";
      let indiceMascara = 0;

      for (let i = 0; i < valor.length; i++) {
        if (indiceMascara >= mascara.length) break;

        if (mascara[indiceMascara] === "9") {
          resultado += valor[i];
          indiceMascara++;
        } else {
          resultado += mascara[indiceMascara];
          indiceMascara++;
          i--; // Reprocessa o mesmo caractere
        }
      }

      input.value = resultado;
    });
  }

  // Aplica a máscara ao campo de Telefone
  const telefoneInput = document.querySelector("[name=telefone]");
  if (telefoneInput) {
    aplicarMascara(telefoneInput, "(99) 99999-9999");
  }

  // Aplica a máscara ao campo de CEP
  const cepInput = document.querySelector("[name=cep]");
  if (cepInput) {
    aplicarMascara(cepInput, "99999-999");
  }


  async function buscarEndereco(cep) {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      if (!response.ok) {
        throw new Error("Erro ao buscar o endereço.");
      }

      const data = await response.json();
      if (data.erro) {
        alert("CEP não encontrado.");
        return;
      }

      // Preencher os campos do formulário
      document.querySelector("[name=rua]").value = data.logradouro || "";
      document.querySelector("[name=cidade]").value = data.localidade || "";
    } catch (error) {
      console.error("Erro ao buscar o endereço:", error);
      alert("Não foi possível buscar o endereço. Verifique o CEP e tente novamente.");
    }
  }
});
