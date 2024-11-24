document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".form-agendamento");
    const telefoneInput = document.getElementById("telefone_cliente");
    const emailInput = document.getElementById("email_cliente");
    const dataInput = document.getElementById("data_agendamento");

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
        const dia = String(hoje.getDate()).padStart(2, '0');
        const mes = String(hoje.getMonth() + 1).padStart(2, '0');
        const ano = hoje.getFullYear();

        const dataMinima = `${ano}-${mes}-${dia}`;
        dataInput.setAttribute("min", dataMinima);
    }

    // Chama a função para definir a data mínima
    definirDataMinima();

    // Função para exibir a tela de "loading" com o texto de validação
    function exibirLoading() {
        document.getElementById('loading').style.display = 'flex';
    }

    // Função para ocultar a tela de "loading"
    function ocultarLoading() {
        document.getElementById('loading').style.display = 'none';
    }

    // Validação do formulário no envio
    form.addEventListener("submit", function (e) {
        e.preventDefault(); // Impede o envio imediato

        // Exibe o loading
        exibirLoading();

        let isValid = true;
        let mensagensErro = [];

        // Verifica se o campo nome está preenchido
        if (document.getElementById("nome_cliente").value.trim() === "") {
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
        if (document.getElementById("hora_agendamento").value === "") {
            mensagensErro.push("O campo Hora do Agendamento é obrigatório.");
            isValid = false;
        }

        // Se houver erros, exibe as mensagens e oculta o loading
        if (!isValid) {
            ocultarLoading();
            alert(mensagensErro.join("\n"));
        } else {
            // Se não houver erros, simula o envio e redireciona
            setTimeout(function() {
                // Simula o redirecionamento para a página de agradecimento após 3 segundos
                window.location.href = "agradecimento.html"; 
            }, 3000); // Tempo de espera para simulação de envio

        }
    });
});
