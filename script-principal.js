// Seleciona o botão de alternância de tema e o body
const themeToggleButton = document.getElementById('theme-toggle');
const body = document.body;

// Verifica o estado atual do tema no localStorage
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
}

// Adiciona o evento de clique para alternar o tema
themeToggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
});

// Recupera o usuário logado
const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

if (usuarioLogado && usuarioLogado.nomeCompleto) {
    const userGreeting = document.getElementById('userGreeting');
    userGreeting.textContent = `Olá, ${usuarioLogado.nomeCompleto}!`;
} else {
    window.location.href = 'pag-login.html'; // Redireciona para login se não houver usuário logado
}

// Função de logout
const logoutButton = document.getElementById('logoutButton');
logoutButton.addEventListener('click', () => {
    localStorage.removeItem('usuarioLogado');
    window.location.href = 'pag-login.html';
});

// Seleciona o slider e o botão de ajuste de fonte
const fonteSlider = document.getElementById('fonte-slider');
const fonteTamanho = document.getElementById('fonte-tamanho');
const ajusteFonteContainer = document.getElementById('ajuste-fonte-container');
const btnAjustarFonte = document.getElementById('btn-ajustar-fonte');

// Define o tamanho da fonte inicial
const corpo = document.body;
corpo.style.fontSize = `${fonteSlider.value}px`;
fonteTamanho.textContent = `${fonteSlider.value}px`;

// Função para aplicar o novo tamanho de fonte a todos os elementos do site
function aplicarTamanhoFonte(tamanho) {
    const elementosDeTexto = document.querySelectorAll('body, body *');
    elementosDeTexto.forEach(elemento => {
        // Aplica o novo tamanho de fonte a todos os elementos de texto
        if (window.getComputedStyle(elemento).fontSize) {
            elemento.style.fontSize = `${tamanho}px`;
        }
    });
}

// Atualiza o tamanho da fonte ao arrastar o slider
fonteSlider.addEventListener('input', () => {
    const novoTamanho = fonteSlider.value;
    aplicarTamanhoFonte(novoTamanho);
    fonteTamanho.textContent = `${novoTamanho}px`;

    // Salva o tamanho da fonte no localStorage
    localStorage.setItem('tamanhoFonte', novoTamanho);
});

// Recupera o tamanho da fonte salvo no localStorage, se houver
window.onload = () => {
    const tamanhoFonteSalvo = localStorage.getItem('tamanhoFonte');
    if (tamanhoFonteSalvo) {
        fonteSlider.value = tamanhoFonteSalvo;
        aplicarTamanhoFonte(tamanhoFonteSalvo);
        fonteTamanho.textContent = `${tamanhoFonteSalvo}px`;
    }
};

// Mostra ou esconde o slider de ajuste de fonte ao clicar no ícone
btnAjustarFonte.addEventListener('click', () => {
    // Alterna a visibilidade do container do slider
    if (ajusteFonteContainer.style.display === 'none' || ajusteFonteContainer.style.display === '') {
        ajusteFonteContainer.style.display = 'block';
    } else {
        ajusteFonteContainer.style.display = 'none';
    }
});
