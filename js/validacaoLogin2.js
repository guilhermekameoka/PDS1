document.addEventListener("DOMContentLoaded", function () {
    const emailInput = document.querySelector("input[type='email']");
    const passwordInput = document.querySelector("input[type='password']");
    const loginButton = document.querySelector("button");
    const togglePassword = document.querySelector(".relative span"); // Ícone do olho 👁
    const loginStatus = document.getElementById("login-status");
    
    // Função para validar e-mail
    function validarEmail(email) {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regexEmail.test(email);
    }

    // Função para exibir mensagens de erro
    function exibirErro(input, mensagem) {
        input.classList.add("border-red-500");
        input.classList.remove("border-gray-300");

        // Verifica se já existe uma mensagem de erro associada ao input
        let errorSpan = input.nextElementSibling;
        if (!errorSpan?.classList.contains("error-message")) {
            errorSpan = document.createElement("span");
            errorSpan.classList.add("text-red-500", "text-xs", "error-message");
            input.parentNode.insertBefore(errorSpan, input.nextSibling);
        }
        errorSpan.textContent = mensagem;
    }

    // Função para remover mensagens de erro
    function removerErro(input) {
        input.classList.remove("border-red-500");
        input.classList.add("border-gray-300");

        let errorSpan = input.nextElementSibling;
        if (errorSpan?.classList.contains("error-message")) {
            errorSpan.remove();
        }
    }
    
    // Função para redirecionar com base no tipo de usuário
    function redirecionarPorTipoUsuario(tipoUsuario) {
        switch(tipoUsuario) {
            case 'medico':
                window.location.href = "../medico/medico.html";
                break;
            case 'idoso':
                window.location.href = "../idoso/idoso.html";
                break;
            case 'cuidador':
                mostrarMensagem("O acesso para cuidadores está temporariamente desativado.", "error");
                break;
            default:
                // Caso o tipo não seja reconhecido, redireciona para idoso por padrão
                window.location.href = "../idoso/idoso.html";
        }
    }
    
    // Função para mostrar mensagens de status
    function mostrarMensagem(mensagem, tipo) {
        loginStatus.textContent = mensagem;
        loginStatus.classList.remove("hidden", "text-green-500", "text-red-500");
        
        if (tipo === "success") {
            loginStatus.classList.add("text-green-500");
        } else if (tipo === "error") {
            loginStatus.classList.add("text-red-500");
        }
    }

    // Alternar visibilidade da senha
    togglePassword?.addEventListener("click", function () {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            togglePassword.textContent = "👁‍🗨"; // Ícone de olho aberto
        } else {
            passwordInput.type = "password";
            togglePassword.textContent = "👁"; // Ícone de olho fechado
        }
    });

    // Evento de clique no botão de login
    loginButton.addEventListener("click", function (event) {
        event.preventDefault(); // Evita o envio do formulário

        let emailValido = validarEmail(emailInput.value);
        let senhaValida = passwordInput.value.trim() !== "";

        if (!emailValido) {
            exibirErro(emailInput, "Digite um e-mail válido.");
        } else {
            removerErro(emailInput);
        }

        if (!senhaValida) {
            exibirErro(passwordInput, "A senha não pode estar vazia.");
        } else {
            removerErro(passwordInput);
        }

        // Se tudo estiver válido, submete o formulário
        if (emailValido && senhaValida) {
            document.getElementById("loginForm").dispatchEvent(new Event('submit'));
        }
    });

    // Evento de submissão do formulário de login
    document.getElementById("loginForm").addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;

        try {
            mostrarMensagem("Verificando credenciais...", "info");
            
            const response = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, senha }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Login bem-sucedido!", data); // Log de sucesso

                // Armazena os dados do usuário no localStorage
                localStorage.setItem("usuarioId", data.usuario.id);
                localStorage.setItem("usuarioNome", data.usuario.nome);
                localStorage.setItem("usuarioTipo", data.usuario.tipo || 'idoso');

                // Mostra mensagem de sucesso
                mostrarMensagem("Login realizado com sucesso! Redirecionando...", "success");

                setTimeout(() => {
                    // Redireciona conforme o tipo do usuário retornado pelo backend
                    redirecionarPorTipoUsuario(data.usuario.tipo || 'idoso');
                }, 1500);
            } else {
                console.log("Erro no login:", data.error); // Log de erro
                mostrarMensagem(data.error || "Erro no login. Verifique suas credenciais.", "error");
            }
        } catch (err) {
            console.error("Erro ao realizar login:", err); // Log de erro no bloco catch
            mostrarMensagem("Erro ao comunicar com o servidor. Tente novamente mais tarde.", "error");
        }
    });
});
