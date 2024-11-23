// Função para limpar a pontuação do CPF (remover pontos, hífens e espaços)
function limparCpf(cpf) {
    return cpf.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
}

// Recupera os usuários cadastrados no localStorage
const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

// Elementos do formulário de login
const buttonEnviar = document.getElementById('enviar');
const inputUsuario = document.getElementById('usuario');
const inputSenha = document.getElementById('senha');
const inputCpf = document.getElementById('cpf'); // Campo de CPF
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
    e.preventDefault();

    const usuario = inputUsuario.value.trim();
    const senha = inputSenha.value.trim();
    const cpf = inputCpf.value.trim(); // Valor do CPF

    // Verificação se todos os campos estão preenchidos
    if (!usuario || !senha || !cpf) {
        mostrarFeedback('Preencha todos os campos!', 'error');
        return;
    }

    // Limpar o CPF inserido pelo usuário (remover pontos, hífens, etc)
    const cpfLimpo = limparCpf(cpf);

    // Exibir valores de debug no console
    console.log('CPF inserido:', cpf);
    console.log('CPF limpo:', cpfLimpo);

    // Verifica se o usuário está cadastrado
    const usuarioCadastrado = usuarios.find(u => u.login === usuario && u.senha === senha);

    if (usuarioCadastrado) {
        // Limpa o CPF do usuário cadastrado (se necessário)
        const cpfUsuarioCadastrado = limparCpf(usuarioCadastrado.cpf);
        
        // Exibir valores de debug no console
        console.log('CPF do usuário cadastrado:', usuarioCadastrado.cpf);
        console.log('CPF do usuário cadastrado limpo:', cpfUsuarioCadastrado);

        // Verifica se o CPF corresponde ao CPF do usuário cadastrado
        if (cpfUsuarioCadastrado === cpfLimpo) {
            mostrarFeedback('Login realizado com sucesso! Redirecionando...', 'success');
            
            // Salva o nome completo e login no usuarioLogado
            localStorage.setItem('usuarioLogado', JSON.stringify({
                nomeCompleto: usuarioCadastrado.nomeCompleto,
                login: usuarioCadastrado.login
            }));
            
            setTimeout(() => {
                window.location.href = 'pag-principal.html';
            }, 2000);
        } else {
            mostrarFeedback('CPF incorreto.', 'error');
        }
    } else {
        mostrarFeedback('Usuário ou senha inválidos.', 'error');
    }
});
