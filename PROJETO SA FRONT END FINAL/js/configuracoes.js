// Adicionar funcionalidade para alternar entre modo claro e escuro
document.getElementById('modo-claro').addEventListener('click', function() {
    document.body.classList.toggle('modo-claro');  // Alterna a classe modo-claro
});

function toggleSobre() {
    var conteudo = document.querySelector('.sobre-conteudo');
    conteudo.style.display = conteudo.style.display === 'block' ? 'none' : 'block';
}
