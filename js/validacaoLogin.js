document.addEventListener("DOMContentLoaded", function () {
    const emailInput = document.querySelector("input[type='email']");
    const passwordInput = document.querySelector("input[type='password']");
    const loginButton = document.getElementById("loginButton");
    const togglePassword = document.querySelector(".relative .toggle-password");
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

    // Função para exibir mensagens de erro
    function exibirErro(input, mensagem) {
        input.classList.add("border-red-500");
        input.classList.remove("border-gray-300");
        let errorSpan = input.parentNode.querySelector("span.text-red-500");
        if (!errorSpan || errorSpan.tagName !== "SPAN") {
            errorSpan = document.createElement("span");
            errorSpan.classList.add("text-red-500", "text-xs");
            input.parentNode.appendChild(errorSpan);
        }
        errorSpan.textContent = mensagem;
    }

    // Função para remover mensagens de erro
    function removerErro(input) {
        input.classList.remove("border-red-500");
        input.classList.add("border-gray-300");
        let errorSpan = input.nextElementSibling;
        if (errorSpan && errorSpan.tagName === "SPAN") {
            errorSpan.remove();
        }
    }

    // Evento de clique no botão de login
    loginButton.addEventListener("click", function (event) {
        event.preventDefault(); // Evita o envio do formulário

        console.log("Botão de login clicado"); // depuração

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

        if (emailValido && senhaValida) {
            console.log("Dados válidos. Enviando requisição..."); // depuração
            // Simulação de login bem-sucedido
            const alertBox = document.createElement("div");
            alertBox.textContent = "Login realizado com sucesso!";
            alertBox.classList.add("fixed", "top-0", "left-1/2", "transform", "-translate-x-1/2", "bg-green-500", "text-white", "p-2", "rounded");
            document.body.appendChild(alertBox);

            setTimeout(() => {
                alertBox.remove();
                window.location.href = "../idoso/idoso.html"; // Redireciona para a página login.html
            }, 3000); // Remove o alerta após 3 segundos
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
});