document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("cadastroForm");
  const cepInput = document.querySelector("[name=cep]");
  const telefoneInput = document.querySelector("[name=telefone]");
  
  // INICIALIZAÇÃO
  inicializarFormulario();
  
  /**
   * Configura os event listeners e máscaras do formulário
   */
  function inicializarFormulario() {
    // Configurar submit do formulário
    form.addEventListener("submit", tratarSubmissaoFormulario);
    
    // Configurar evento de busca automática de CEP
    if (cepInput) {
      cepInput.addEventListener("blur", verificarCEP);
      aplicarMascara(cepInput, "99999-999");
    }
    
    // Configurar máscara para telefone
    if (telefoneInput) {
      aplicarMascara(telefoneInput, "(99) 99999-9999");
    }
  }

  /**
   * Processa a submissão do formulário
   */
  async function tratarSubmissaoFormulario(event) {
    event.preventDefault();
    
    const usuario = obterDadosFormulario();
    const resultadoValidacao = validarCampos(usuario);
    
    if (!resultadoValidacao.valido) {
      alert(resultadoValidacao.mensagem);
      return;
    }
    
    await enviarDadosCadastro(usuario);
  }

  /**
   * Captura todos os dados do formulário
   */
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

  /**
   * Valida os campos do formulário e retorna o resultado
   */
  function validarCampos(usuario) {
    // Verifica campos vazios
    for (const chave in usuario) {
      if (!usuario[chave]) {
        return { 
          valido: false, 
          mensagem: `O campo ${traduzirCampo(chave)} é obrigatório.` 
        };
      }
    }

    // Valida idade
    if (isNaN(usuario.idade) || usuario.idade < 1 || usuario.idade > 120) {
      return { 
        valido: false, 
        mensagem: "A idade deve ser um número entre 1 e 120." 
      };
    }

    // Valida email
    if (!usuario.email.includes("@") || !usuario.email.includes(".")) {
      return { 
        valido: false, 
        mensagem: "Digite um endereço de e-mail válido." 
      };
    }

    // Valida senha
    if (usuario.senha.length < 6) {
      return { 
        valido: false, 
        mensagem: "A senha deve ter pelo menos 6 caracteres." 
      };
    }

    // Valida tipo de usuário
    if (!['medico', 'idoso', 'cuidador'].includes(usuario.tipo_usuario)) {
      return { 
        valido: false, 
        mensagem: "Por favor, selecione um perfil válido (médico, idoso ou cuidador)." 
      };
    }

    return { valido: true };
  }

  /**
   * Traduz nomes de campos para exibição ao usuário
   */
  function traduzirCampo(campo) {
    const traducoes = {
      nome: "Nome",
      idade: "Idade",
      email: "E-mail",
      telefone: "Telefone",
      cep: "CEP",
      rua: "Rua",
      numero: "Número",
      cidade: "Cidade",
      senha: "Senha",
      tipo_usuario: "Tipo de usuário"
    };
    
    return traducoes[campo] || campo;
  }

  /**
   * Envia os dados do formulário para a API
   */
  async function enviarDadosCadastro(usuario) {
    try {
      const response = await fetch("http://localhost:3000/cadastro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usuario),
      });
      
      let data = {};
      if (response.ok) {
        data = await response.json();
      }

      if (response.ok) {
        alert("Cadastro realizado com sucesso!");
        window.location.href = "./login.html";
      } else {
        const mensagemErro = data.error || "Ocorreu um erro inesperado";
        alert(`Erro no cadastro: ${mensagemErro}`);
      }
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      alert("Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.");
    }
  }

  /**
   * Verifica e busca o endereço pelo CEP
   */
  function verificarCEP() {
    const cep = cepInput.value.replace(/\D/g, ""); // Remove caracteres não numéricos
    
    if (cep.length === 8) {
      buscarEndereco(cep);
    } else if (cep.length > 0) {
      alert("CEP inválido. Certifique-se de que possui 8 dígitos.");
    }
  }

  /**
   * Consulta a API ViaCEP e preenche os campos de endereço
   */
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
      
      // Focar no campo número para melhorar a experiência
      document.querySelector("[name=numero]").focus();
    } catch (error) {
      console.error("Erro ao buscar o endereço:", error);
      alert("Não foi possível buscar o endereço. Verifique o CEP e tente novamente.");
    }
  }

  /**
   * Aplica máscara de formatação a campos de input
   */
  function aplicarMascara(input, mascara) {
    input.addEventListener("input", function () {
      let valor = input.value.replace(/\D/g, ""); // Remove caracteres não numéricos
      let resultado = "";
      let indiceMascara = 0;

      for (let i = 0; i < valor.length && indiceMascara < mascara.length; i++) {
        // Se o caractere atual da máscara for um caractere especial (não é '9')
        while (mascara[indiceMascara] !== '9' && indiceMascara < mascara.length) {
          resultado += mascara[indiceMascara];
          indiceMascara++;
        }

        // Adiciona o dígito do valor na posição onde a máscara tem '9'
        if (indiceMascara < mascara.length) {
          resultado += valor[i];
          indiceMascara++;
        }
      }

      input.value = resultado;
    });
  }
});
