// Elementos do formulário de cadastro
const formCadastro = document.getElementById('form-cadastro');
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

// Validação para o nome
function validarNome(nome) {
    const nomeRegex = /^[a-zA-Z\s]{15,60}$/; // 15 a 60 caracteres, alfabéticos e espaços permitidos
    return nomeRegex.test(nome);
}

// Validação para CPF (com ou sem pontuação)
function validarCPF(cpf) {
    const cpfRegex = /^(?:\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11})$/; // Permite CPF com ou sem pontuação
    return cpfRegex.test(cpf);
}

// Validação para celular (padrão de celular no Brasil)
function validarCelular(celular) {
    const celularRegex = /^(?:\(?\d{2}\)?\s?)?\d{5}-\d{4}$/; // Formato (XX) XXXXX-XXXX ou XX XXXXX-XXXX
    return celularRegex.test(celular);
}

// Validação para Telefone-Fixo 
function validarCelular(telefonefixo) {
    const celularRegex = /^(?:\(?\d{2}\)?\s?)?\d{5}-\d{4}$/; // Formato (XX) XXXXX-XXXX ou XX XXXXX-XXXX
    return celularRegex.test(telefonefixo);
}

// Validação para login (exatamente 6 caracteres alfabéticos)
function validarLogin(login) {
    const loginRegex = /^[a-zA-Z]{6}$/; // Exatamente 6 caracteres alfabéticos
    return loginRegex.test(login);
}

// Validação para senha (exatamente 8 caracteres alfabéticos)
function validarSenha(senha) {
    const senhaRegex = /^[a-zA-Z]{8}$/; // Exatamente 8 caracteres alfabéticos
    return senhaRegex.test(senha);
}

// Função para validar o formulário de cadastro
function validarCadastro() {
    const nomeCompleto = document.getElementById('nome-completo').value.trim();
    const cpf = document.getElementById('cpf').value.trim();
    const celular = document.getElementById('celular').value.trim();
    const telefonefixo = document.getElementById('telefone-fixo').value.trim();
    const login = document.getElementById('login').value.trim();
    const senha = document.getElementById('senha').value.trim();
    const confirmarSenha = document.getElementById('confirmar-senha').value.trim();

    // Validação do nome
    if (!validarNome(nomeCompleto)) {
        mostrarFeedback('O nome deve ter entre 15 e 60 caracteres alfabéticos, podendo conter espaços.', 'error');
        return false;
    }

    // Validação do CPF
    if (!validarCPF(cpf)) {
        mostrarFeedback('O CPF deve ser válido, com ou sem pontuação.', 'error');
        return false;
    }

    // Validação do celular
    if (!validarCelular(celular)) {
        mostrarFeedback('O celular deve estar no formato (XX) XXXX-XXXX ou (XX) XXXXX-XXXX.', 'error');
        return false;
    }

     // Validação do Telefone-Fixo
     if (!validarCelular(telefonefixo)) {
        mostrarFeedback('O Telefone Fixo deve estar no formato (XX) XXXX-XXXX ou (XX) XXXXX-XXXX.', 'error');
        return false;
    }

    // Validação do login
    if (!validarLogin(login)) {
        mostrarFeedback('O login deve ter exatamente 6 caracteres alfabéticos.', 'error');
        return false;
    }

    // Validação da senha
    if (!validarSenha(senha)) {
        mostrarFeedback('A senha deve ter exatamente 8 caracteres alfabéticos.', 'error');
        return false;
    }

    // Verificação das senhas
    if (senha !== confirmarSenha) {
        mostrarFeedback('As senhas não coincidem.', 'error');
        return false;
    }

    return true;
}

// Função para salvar os dados do usuário no localStorage
function salvarUsuario(nomeCompleto, login, senha, cpf) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Limpa o CPF antes de salvar no localStorage
    const cpfLimpo = limparCpf(cpf);

    // Inclui nomeCompleto e CPF limpo no objeto do usuário
    usuarios.push({ nomeCompleto, login, senha, cpf: cpfLimpo });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}


// Evento de envio do formulário
formCadastro.addEventListener('submit', (event) => {
    event.preventDefault();

    if (validarCadastro()) {
        const nomeCompleto = document.getElementById('nome-completo').value.trim();
        const login = document.getElementById('login').value.trim();
        const senha = document.getElementById('senha').value.trim();
        const cpf = document.getElementById('cpf').value.trim(); // Pega o CPF

        // Salva o novo usuário no localStorage
        salvarUsuario(nomeCompleto, login, senha, cpf);

        // Salva o nome completo e login no usuarioLogado (para login imediato após cadastro)
        localStorage.setItem('usuarioLogado', JSON.stringify({ nomeCompleto, login }));

        mostrarFeedback('Usuário cadastrado com sucesso!', 'success');

        setTimeout(() => {
            window.location.href = 'pag-login.html'; // Redireciona para a página de login
        }, 2000);
    }
});

// Função para limpar a pontuação do CPF (remover pontos, hífens e espaços)
function limparCpf(cpf) {
    return cpf.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
}
