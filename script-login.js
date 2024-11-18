// Recupera os usuários cadastrados no localStorage
const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

// Elementos do formulário de login
const buttonEnviar = document.getElementById('enviar');
const inputUsuario = document.getElementById('usuario');
const inputSenha = document.getElementById('senha');
const feedbackMessage = document.getElementById('feedback-message');

// Função para exibir mensagens de feedback
function mostrarFeedback(mensagem, tipo) {
    feedbackMessage.textContent = mensagem;
    feedbackMessage.className = `feedback-message ${tipo}`;
    feedbackMessage.style.display = 'block';

    setTimeout(() => {
        feedbackMessage.style.display = 'none';
    }, 3000);
}

// Validação ao clicar no botão "Enviar"
buttonEnviar.addEventListener('click', (e) => {
    e.preventDefault(); // Impede o comportamento padrão do botão

    const usuario = inputUsuario.value.trim();
    const senha = inputSenha.value.trim();

    if (!usuario || !senha) {
        mostrarFeedback('Preencha todos os campos!', 'error');
        return;
    }

    // Verifica se o usuário está cadastrado
    const usuarioCadastrado = usuarios.find(u => u.login === usuario && u.senha === senha);

    if (usuarioCadastrado) {
        mostrarFeedback('Login realizado com sucesso! Redirecionando...', 'success');

        // Armazena o login do usuário logado no localStorage
        localStorage.setItem('loggedUser', usuario);

        // Redireciona para a página principal
        setTimeout(() => {
            window.location.href = 'pag-principal.html';
        }, 2000);
    } else {
        mostrarFeedback('Usuário ou senha inválidos.', 'error');
    }
});
