document.addEventListener("DOMContentLoaded", function () {
    const emailInput = document.querySelector("input[type='email']");
    const passwordInput = document.querySelector("input[type='password']");
    const loginButton = document.querySelector("button"); // Seleciona o botão de login
    const togglePassword = document.querySelector(".relative span"); // Ícone do olho 👁
    const perfilMedico = document.querySelector("img[alt='Médico']");
    const perfilIdoso = document.querySelector("img[alt='Idoso']");
    const perfilCuidador = document.querySelector("img[alt='Cuidador']");
    
     // Função para remover a borda de todos os perfis
     function removerBordaPerfis() {
        perfilMedico.classList.remove("border-4", "border-blue-500");
        perfilIdoso.classList.remove("border-4", "border-blue-500");
        perfilCuidador.classList.remove("border-4", "border-blue-500");
    }

    // Adiciona evento para destacar a seleção do Médico
    perfilMedico.addEventListener("click", function () {
        removerBordaPerfis();
        perfilMedico.classList.add("border-4", "border-blue-500");
    });

    // Adiciona evento para destacar a seleção do Idoso
    perfilIdoso.addEventListener("click", function () {
        removerBordaPerfis();
        perfilIdoso.classList.add("border-4", "border-blue-500");
    });

    // Adiciona evento para destacar a seleção do Cuidador
    perfilCuidador.addEventListener("click", function () {
        removerBordaPerfis();
        perfilCuidador.classList.add("border-4", "border-blue-500");
    });

    // Função para validar e-mail
    function validarEmail(email) {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regexEmail.test(email);
    }

    // Função para exibir mensagens de erro corretamente abaixo do input
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

        // Se tudo estiver válido, redireciona para a página do médico
        if (emailValido && senhaValida) {
            const alertBox = document.createElement("div");
            alertBox.classList.add("fixed", "top-0", "left-1/2", "transform", "-translate-x-1/2", "p-2", "rounded");

            if (perfilCuidador.classList.contains("border-blue-500")) {
            alertBox.textContent = "Este Login está Temporariamente desativado!";
            alertBox.classList.add("bg-red-500", "text-white");
            document.body.appendChild(alertBox);

            setTimeout(() => {
                alertBox.remove();
            }, 3000);
            } else {
            alertBox.textContent = "Login realizado com sucesso! ✓";
            alertBox.classList.add("bg-green-500", "text-white");
            document.body.appendChild(alertBox);

            setTimeout(() => {
                alertBox.remove();
                if (perfilMedico.classList.contains("border-blue-500")) {
                window.location.href = "../medico/medico.html";
                } else if (perfilIdoso.classList.contains("border-blue-500")) {
                window.location.href = "../idoso/idoso.html";
                }
            }, 3000);
            }
        }
    });

    // Alternar visibilidade da senha
    togglePassword.addEventListener("click", function () {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            togglePassword.textContent = "👁‍🗨"; // Ícone de olho aberto
        } else {
            passwordInput.type = "password";
            togglePassword.textContent = "👁"; // Ícone de olho fechado
        }
    });

    // Evento de submissão do formulário de login
    document.getElementById("loginForm").addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;

        try {
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

                // Armazena o nome do usuário no localStorage
                localStorage.setItem("usuarioNome", data.usuario.nome);

                // Redireciona para a página de idoso
                window.location.href = "../idoso/idoso.html";
            } else {
                console.log("Erro no login:", data.error); // Log de erro
                alert(data.error);
            }
        } catch (err) {
            console.error("Erro ao realizar login:", err); // Log de erro no bloco catch
            alert("Erro ao realizar login. Tente novamente mais tarde.");
        }
    });
});
