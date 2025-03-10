document.addEventListener("DOMContentLoaded", function () {
    const emailInput = document.querySelector("input[type='email']");
    const passwordInput = document.querySelector("input[type='password']");
    const loginButton = document.querySelector("button");
    const togglePassword = document.querySelector(".relative span");

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

        // Se tudo estiver válido, pode enviar os dados (simulação)
        if (emailValido && senhaValida) {
            alert("Login realizado com sucesso!");
            // Aqui poderia ser feita uma requisição para um backend
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
