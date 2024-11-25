document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".form-agendamento");
    const telefoneInput = document.getElementById("telefone");
    const emailInput = document.getElementById("email");
    const dataInput = document.getElementById("data");

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

    // Função para garantir que somente datas futuras sejam selecionadas
    function definirDataMinima() {
        const hoje = new Date();
        const dia = String(hoje.getDate()).padStart(2, '0');  // Adiciona 0 à frente para dias menores que 10
        const mes = String(hoje.getMonth() + 1).padStart(2, '0');  // Meses começam do 0
        const ano = hoje.getFullYear();

        // Formato da data (YYYY-MM-DD)
        const dataMinima = `${ano}-${mes}-${dia}`;

        // Define a data mínima no campo de data
        dataInput.setAttribute("min", dataMinima);
    }

    // Chama a função para definir a data mínima
    definirDataMinima();

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
        if (dataInput.value === "") {
            mensagensErro.push("O campo Data do Agendamento é obrigatório.");
            isValid = false;
        }

        // Verifica se a data selecionada é uma data futura
        if (dataInput.value && new Date(dataInput.value) <= new Date()) {
            mensagensErro.push("A data selecionada deve ser uma data futura.");
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
