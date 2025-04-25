document.addEventListener("DOMContentLoaded", function () {
  // Recupera informações do usuário médico do localStorage
  const usuarioNome = localStorage.getItem("usuarioNome");
  const usuarioId = localStorage.getItem("usuarioId");
  const usuarioTipo = localStorage.getItem("usuarioTipo");

  // Verifica se há um usuário logado e se é médico
  if (!usuarioId || !usuarioNome || usuarioTipo !== "medico") {
    alert(
      "Acesso não autorizado ou sessão expirada. Redirecionando para a tela de login."
    );
    window.location.href = "../comum/login.html";
    return;
  }

  // Atualiza o nome na mensagem de boas-vindas
  const saudacaoElement = document.getElementById("saudacao-medico");
  if (saudacaoElement) {
    // Formata o nome para exibir apenas o primeiro nome
    const primeiroNome = usuarioNome.split(" ")[0];
    saudacaoElement.textContent = `Olá, Dr(a). ${primeiroNome}!`;
  }

  // Atualiza outros elementos da interface que precisam de personalização

  // Configura o botão de logout para limpar o localStorage
  const logoutButton = document.getElementById("logout-button");
  if (logoutButton) {
    logoutButton.addEventListener("click", function (e) {
      e.preventDefault();
      localStorage.removeItem("usuarioId");
      localStorage.removeItem("usuarioNome");
      localStorage.removeItem("usuarioTipo");
      window.location.href = "../comum/login.html";
    });
  }
});
