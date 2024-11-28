document.getElementById('formLogin').addEventListener('submit', function(event) {
    event.preventDefault();

    var usuario = document.getElementById('usuario').value;
    var senha = document.getElementById('senha').value;

    var usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    var usuarioEncontrado = usuarios.find(function(user) {
        return user.usuario === usuario && user.senha === senha;
    });

    if (usuarioEncontrado) {
        alert('Login bem-sucedido! Redirecionando...');
        window.location.href = 'inicial.html';
    } else {
        alert('Usuário ou senha incorretos. Tente novamente.');
        document.getElementById('senha').value = '';
        document.getElementById('senha').focus();
    }
});

document.getElementById('esqueceuSenha').addEventListener('click', function() {
    var email = prompt('Digite seu e-mail para recuperação de senha:');

    if (email) {
        var usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

        var usuarioEncontrado = usuarios.find(function(user) {
            return user.email === email;
        });

        if (usuarioEncontrado) {
            alert('Sua senha é: ' + usuarioEncontrado.senha);
        } else {
            alert('E-mail não encontrado. Verifique e tente novamente.');
        }
    }
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

