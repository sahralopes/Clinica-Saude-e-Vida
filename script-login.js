

   // Simulação de banco de dados
const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

// Elementos do formulário de login
const buttonEnviar = document.getElementById('enviar');
const inputUsuario = document.getElementById('usuario');
const inputSenha = document.getElementById('senha');
const feedbackMessage = document.getElementById('feedback-message');

// Inicia o botão desabilitado
buttonEnviar.disabled = true;

// Função para mostrar mensagens de feedback no login
function mostrarFeedback(mensagem, tipo) {
    feedbackMessage.textContent = mensagem;
    feedbackMessage.className = `feedback-message ${tipo}`;
    feedbackMessage.style.display = 'block';

    // Esconde o feedback após 3 segundos
    setTimeout(() => {
        feedbackMessage.style.display = 'none';
    }, 3000);
}

// Habilitar o botão "Enviar" apenas se ambos os campos estiverem preenchidos
[inputUsuario, inputSenha].forEach(input => {
    input.addEventListener('input', () => {
        buttonEnviar.disabled = !(inputUsuario.value && inputSenha.value);
    });
});

// Validação ao clicar no botão "Enviar"
buttonEnviar.addEventListener('click', () => {
    const usuario = inputUsuario.value.trim();
    const senha = inputSenha.value.trim();

    // Verificar se o usuário está cadastrado
    const usuarioCadastrado = usuarios.find(u => u.login === usuario && u.senha === senha);

    if (usuarioCadastrado) {
        mostrarFeedback('Login realizado com sucesso! Redirecionando...', 'success');

        // Redirecionar para a tela principal
        setTimeout(() => {
            window.location.href = 'pag-principal.html';
        }, 2000);
    } else {
        mostrarFeedback('Usuário ou senha inválidos. Cadastre-se primeiro!', 'error');
    }
});
