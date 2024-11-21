


// Seleciona o botão de alternância e o body

const themeToggleButton = document.getElementById('theme-toggle');
const body = document.body;

// Verifica o estado atual do tema no localStorage
if(localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
}

// Adiciona o evento de clique no botão para alternar o tema
themeToggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    // Salva a escolha do tema no localStorage para persistir após o reload
    if(body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

 