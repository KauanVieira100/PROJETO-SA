document.getElementById('telefone').addEventListener('input', function(event) {
    let telefone = event.target.value;
    telefone = telefone.replace(/\D/g, '');

    if (telefone.length > 11) {
        telefone = telefone.slice(0, 11);
    }

    if (telefone.length <= 2) {
        telefone = telefone.replace(/(\d{2})/, "($1");
    } else if (telefone.length <= 5) {
        telefone = telefone.replace(/(\d{2})(\d{1,4})/, "($1) $2");
    } else if (telefone.length <= 10) {
        telefone = telefone.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
    } else {
        telefone = telefone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    }

    event.target.value = telefone;
});

document.getElementById('email').addEventListener('input', function(event) {
    let email = event.target.value;
    email = email.replace(/[^a-zA-Z0-9@._-]/g, '');

    const emailParts = email.split('@');
    if (emailParts.length > 1) {
        emailParts[1] = emailParts[1].replace(/[^a-zA-Z0-9.-]/g, '');
    }

    email = emailParts.join('@');
    event.target.value = email;
});

document.getElementById('formCadastro').addEventListener('submit', function(event) {
    event.preventDefault();

    var nome = document.getElementById('name').value;
    var usuario = document.getElementById('usuario').value;
    var email = document.getElementById('email').value;
    var senha = document.getElementById('senha').value;
    var repetirSenha = document.getElementById('repetir-senha').value;
    var telefone = document.getElementById('telefone').value;

    if (senha.length < 8) {
        alert('A senha deve ter pelo menos 8 caracteres. Por favor, tente novamente.');
        document.getElementById('senha').value = '';
        document.getElementById('repetir-senha').value = '';
        document.getElementById('senha').focus();
        return;
    }

    if (senha !== repetirSenha) {
        alert('As senhas não coincidem. Por favor, tente novamente.');
        document.getElementById('senha').value = '';
        document.getElementById('repetir-senha').value = '';
        document.getElementById('name').focus();
        return;
    }

    const usuarioCadastro = {
        nome: nome,
        usuario: usuario,
        email: email,
        senha: senha,
        telefone: telefone
    };

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios.push(usuarioCadastro);

    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert('Cadastro realizado com sucesso! Redirecionando...');
    window.location.href = 'index.html';
});

document.getElementById('toggleSenha').addEventListener('click', function() {
    const senhaInput = document.getElementById('senha');
    const icon = this.querySelector('i');

    if (senhaInput.type === 'password') {
        senhaInput.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        senhaInput.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
});

document.getElementById('toggleRepetirSenha').addEventListener('click', function() {
    const repetirSenhaInput = document.getElementById('repetir-senha');
    const icon = this.querySelector('i');

    if (repetirSenhaInput.type === 'password') {
        repetirSenhaInput.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        repetirSenhaInput.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
});

