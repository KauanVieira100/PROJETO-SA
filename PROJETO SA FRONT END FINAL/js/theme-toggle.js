// Função para alternar entre o modo claro e escuro
const toggleButton = document.getElementById("theme-toggle");
const body = document.body;

// Verificar se o tema está salvo nas preferências
if (localStorage.getItem("theme") === "light") {
    body.classList.add("modo-claro");
    toggleButton.textContent = "Modo Escuro";
} else {
    body.classList.add("modo-escuro");
    toggleButton.textContent = "Modo Claro";
}

// Adicionar evento para alternar entre os temas
toggleButton.addEventListener("click", () => {
    if (body.classList.contains("modo-escuro")) {
        body.classList.remove("modo-escuro");
        body.classList.add("modo-claro");
        toggleButton.textContent = "Modo Escuro";
        localStorage.setItem("theme", "light");
    } else {
        body.classList.remove("modo-claro");
        body.classList.add("modo-escuro");
        toggleButton.textContent = "Modo Claro";
        localStorage.setItem("theme", "dark");
    }
});
