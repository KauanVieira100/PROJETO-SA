// darkmode.js
document.addEventListener('DOMContentLoaded', function () {
    // Verifica se o modo escuro está ativado no localStorage
    const modoEscuro = localStorage.getItem('modoEscuro') === 'true';

    // Se estiver no modo escuro, aplica a classe dark-mode
    if (modoEscuro) {
        document.body.classList.add('dark-mode');
    }

    // Evento de clique no botão de alternar modo
    const modoClaroBtn = document.getElementById('modo-claro');
    if (modoClaroBtn) {
        modoClaroBtn.addEventListener('click', function () {
            document.body.classList.toggle('dark-mode');
            
            // Armazena a preferência do usuário no localStorage
            const isDarkMode = document.body.classList.contains('dark-mode');
            localStorage.setItem('modoEscuro', isDarkMode);
        });
    }
});

function toggleSobre() {
    var conteudo = document.querySelector('.sobre-conteudo');
    conteudo.style.display = conteudo.style.display === 'block' ? 'none' : 'block';
}

    // Função para verificar se o elemento está visível na tela
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Função que adiciona a classe "visible" quando o elemento entra na tela
    function handleScroll() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach(el => {
            if (isElementInViewport(el)) {
                el.classList.add('visible');
            }
        });
    }

    // Adiciona o evento de scroll
    window.addEventListener('scroll', handleScroll);

    // Executa a função no carregamento inicial para verificar se os elementos já estão visíveis
    document.addEventListener('DOMContentLoaded', handleScroll);

