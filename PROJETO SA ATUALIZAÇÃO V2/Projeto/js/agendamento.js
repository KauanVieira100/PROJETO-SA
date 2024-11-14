// Seleciona o formulário
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".form-agendamento");
    const telefoneInput = document.getElementById("telefone");
    const emailInput = document.getElementById("email");

    // Máscara de telefone (formato: (XX) XXXXX-XXXX)
    telefoneInput.addEventListener("input", function (e) {
        let telefone = e.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos
        if (telefone.length > 10) {
            telefone = telefone.replace(/^(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
        } else if (telefone.length > 5) {
            telefone = telefone.replace(/^(\d{2})(\d{4})/, "($1) $2-");
        } else if (telefone.length > 2) {
            telefone = telefone.replace(/^(\d{2})/, "($1) ");
        }
        e.target.value = telefone;
    });

    // Função de validação de e-mail
    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Validação do formulário no envio
    form.addEventListener("submit", function (e) {
        let isValid = true;
        let mensagensErro = [];

        // Verifica se o campo nome está preenchido
        if (document.getElementById("nome").value.trim() === "") {
            mensagensErro.push("O campo Nome Completo é obrigatório.");
            isValid = false;
        }

        // Verifica o e-mail
        if (!validarEmail(emailInput.value)) {
            mensagensErro.push("Por favor, insira um e-mail válido.");
            isValid = false;
        }

        // Verifica se o telefone tem pelo menos 10 dígitos
        if (telefoneInput.value.replace(/\D/g, "").length < 10) {
            mensagensErro.push("Por favor, insira um telefone válido com DDD.");
            isValid = false;
        }

        // Verifica se o campo data está preenchido
        if (document.getElementById("data").value === "") {
            mensagensErro.push("O campo Data do Agendamento é obrigatório.");
            isValid = false;
        }

        // Verifica se o campo hora está preenchido
        if (document.getElementById("hora").value === "") {
            mensagensErro.push("O campo Hora do Agendamento é obrigatório.");
            isValid = false;
        }

        // Exibe mensagens de erro e impede o envio caso algum campo esteja inválido
        if (!isValid) {
            e.preventDefault();
            alert(mensagensErro.join("\n"));
        }
    });
});
