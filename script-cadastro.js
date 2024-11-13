// Função para validar o formulário
function validarFormulario(event) {
    event.preventDefault();  // Prevenir o envio do formulário se houver erro

    // Obter os valores dos campos
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
        return false;
    }

    // 2. Validar o nome completo (mínimo 15 e máximo 60 caracteres alfabéticos)
    const nomePattern = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;  // Aceita letras e espaços
    if (nomeCompleto.length < 15 || nomeCompleto.length > 60 || !nomePattern.test(nomeCompleto)) {
        alert("O campo 'Nome Completo' deve ter entre 15 e 60 caracteres alfabéticos.");
        return false;
    }

    // 3. Validar os telefones (formato +55XX-XXXXXXXX)
    const telefonePattern = /^\+55\d{2}-\d{8}$/;
    if (!telefonePattern.test(celular)) {
        alert("O campo 'Telefone Celular' deve estar no formato (+55)XX-XXXXXXXX.");
        return false;
    }
    if (!telefonePattern.test(telefoneFixo)) {
        alert("O campo 'Telefone Fixo' deve estar no formato (+55)XX-XXXXXXXX.");
        return false;
    }

    // 4. Validar o login (exatamente 6 caracteres alfabéticos)
    const loginPattern = /^[A-Za-z]{6}$/;
    if (!loginPattern.test(login)) {
        alert("O campo 'Login' deve ter exatamente 6 caracteres alfabéticos.");
        return false;
    }

    // 5. Validar a senha (exatamente 8 caracteres alfabéticos)
    const senhaPattern = /^[A-Za-z]{8}$/;
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
    alert("Cadastro realizado com sucesso!");
    document.getElementById('form-cadastro').submit(); // Enviar o formulário
}

// Adicionar o evento de validação ao formulário
document.getElementById('form-cadastro').addEventListener('submit', validarFormulario);



