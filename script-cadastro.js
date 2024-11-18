// Função para exibir feedback
function mostrarFeedback(mensagem, tipo) {
    const feedbackMessage = document.getElementById('feedback-message');
    feedbackMessage.textContent = mensagem;
    feedbackMessage.className = `feedback-message ${tipo}`;
    feedbackMessage.style.display = 'block';

    // Esconde o feedback após 3 segundos
    setTimeout(() => {
        feedbackMessage.style.display = 'none';
    }, 3000);
}


// Função para validar o formulário
function validarFormulario(event) {
    event.preventDefault();  // Impede o envio do formulário se houver um erro

    // Obter os valores dos campos do formulário
    const nomeCompleto = document.getElementById('nome-completo').value;
    const dataNascimento = document.getElementById('data-nascimento').value;
    const sexo = document.getElementById('sexo').value;
    const nomeMaterno = document.getElementById('nome-materno').value;
    const cpf = document.getElementById('cpf').value;
    const celular = document.getElementById('celular').value;
    const telefoneFixo = document.getElementById('telefone-fixo').value;
    const endereco = document.getElementById('endereco').value;
    const login = document.getElementById('login').value;
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmar-senha').value;

    // 1. Verificar se todos os campos obrigatórios foram preenchidos
    if (!nomeCompleto || !dataNascimento || !sexo || !nomeMaterno || !cpf || !celular || !telefoneFixo || !endereco || !login || !senha || !confirmarSenha) {
        alert("Todos os campos devem ser preenchidos.");
        return false;  // Interrompe a função e impede o envio do formulário
    }

    // 2. Validar o nome completo (mínimo 15 e máximo 60 caracteres alfabéticos)
    const nomePattern = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;  // Aceita apenas letras e espaços
    if (nomeCompleto.length < 15 || nomeCompleto.length > 60 || !nomePattern.test(nomeCompleto)) {
        alert("O campo 'Nome Completo' deve ter entre 15 e 60 caracteres alfabéticos.");
        return false;  // Interrompe a função e impede o envio do formulário
    }

    // 3. Validar os telefones (formato +55XX-XXXXXXXX)
    const telefonePattern = /^\+55\d{2}\d{9}$|^\d{2}-\d{9}$/; // Regex para o formato de telefone específico
    if (!telefonePattern.test(celular)) {
        alert("O campo 'Telefone Celular' deve estar no formato (+55)XX-XXXXXXXX ou XX-XXXXXXXXX.");
        return false;
    }
    if (!telefonePattern.test(telefoneFixo)) {
        alert("O campo 'Telefone Fixo' deve estar no formato (+55)XX-XXXXXXXX ou XX-XXXXXXXXX.");
        return false;
    }

    // 4. Validar o login (exatamente 6 caracteres alfabéticos)
    const loginPattern = /^[A-Za-z]{6}$/;  // Regex para exatamente 6 letras alfabéticas
    if (!loginPattern.test(login)) {
        alert("O campo 'Login' deve ter exatamente 6 caracteres alfabéticos.");
        return false;
    }

    // 5. Validar a senha (exatamente 8 caracteres alfabéticos)
    const senhaPattern = /^[A-Za-z]{8}$/;  // Regex para exatamente 8 letras alfabéticas
    if (!senhaPattern.test(senha)) {
        alert("O campo 'Senha' deve ter exatamente 8 caracteres alfabéticos.");
        return false;
    }

    // 6. Validar se a senha e a confirmação de senha são iguais
    if (senha !== confirmarSenha) {
        alert("A 'Senha' e a 'Confirmar Senha' devem ser iguais.");
        return false;
    }

    // Se todas as validações passarem, o formulário pode ser enviado
    mostrarFeedback("Cadastro realizado com sucesso!", "success");
    setTimeout(() => {
        window.location.href = 'pag-login.html'; // ALTERADO
    }, 3000);
     }

// Adicionar o evento de validação ao formulário
document.getElementById('form-cadastro').addEventListener('submit', validarFormulario);

// Referências aos campos do formulário
const inputUsuarioCadastro = document.getElementById('usuario-cadastro');
const inputSenhaCadastro = document.getElementById('senha-cadastro');
const buttonCadastrar = document.getElementById('cadastrar');
const feedbackCadastro = document.getElementById('feedback-cadastro');

// Simulação de banco de dados
const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

// Habilitar o botão "Cadastrar" apenas se ambos os campos estiverem preenchidos
[inputUsuarioCadastro, inputSenhaCadastro].forEach(input => {
    input.addEventListener('input', () => {
        buttonCadastrar.disabled = !(inputUsuarioCadastro.value && inputSenhaCadastro.value);
    });
});

// Função para mostrar mensagens de feedback no cadastro
function mostrarFeedbackCadastro(mensagem, tipo) {
    feedbackCadastro.textContent = mensagem;
    feedbackCadastro.className = `feedback-message ${tipo}`;
    feedbackCadastro.style.display = 'block';

    // Esconde o feedback após 3 segundos
    setTimeout(() => {
        feedbackCadastro.style.display = 'none';
    }, 3000);
}

// Habilitar o botão "Cadastrar" apenas se ambos os campos estiverem preenchidos
[inputUsuarioCadastro, inputSenhaCadastro].forEach(input => {
    input.addEventListener('input', () => {
        buttonCadastrar.disabled = !(inputUsuarioCadastro.value && inputSenhaCadastro.value);
    });
});

// Validação e cadastro
buttonCadastrar.addEventListener('click', () => {
    const usuario = inputUsuarioCadastro.value.trim();
    const senha = inputSenhaCadastro.value.trim();

    // Verificar se o usuário já existe
    const usuarioExistente = usuarios.find(u => u.login === usuario);

    if (usuarioExistente) {
        mostrarFeedbackCadastro('Usuário já cadastrado. Escolha outro nome!', 'error');
    } else {
        // Adicionar novo usuário e salvar no Local Storage
        usuarios.push({ login: usuario.trim(), senha: senha.trim() });
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        // Verificação dos dados armazenados
        console.log('Usuários armazenados:', usuarios);

        mostrarFeedbackCadastro('Usuário cadastrado com sucesso!', 'success');

        // Limpar campos após cadastro
        inputUsuarioCadastro.value = '';
        inputSenhaCadastro.value = '';
        buttonCadastrar.disabled = true;
    }
});
