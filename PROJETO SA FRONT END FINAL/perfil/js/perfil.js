window.onload = function() {
    const profileImage = document.getElementById('profileImage');
    
    // Definir uma imagem padrão se nenhuma estiver no localStorage
    const savedImage = localStorage.getItem('profileImage');
    profileImage.src = savedImage || '../imgs/perfil.png'; // Caminho da imagem padrão

    // Carregar os dados do localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuario = usuarios[usuarios.length - 1]; // Pegando o último cadastro (se houver)

    // Exibir os dados do usuário
    document.getElementById('nameInput').value = usuario ? usuario.nome : 'Burk Macklin';
    document.getElementById('emailInput').value = usuario ? usuario.email : 'abc@gmail.com';
    document.getElementById('phoneInput').value = usuario ? usuario.telefone : '00923469874656';
    document.getElementById('addressInput').value = localStorage.getItem('address') || 'Não informado';
    document.getElementById('bio').value = localStorage.getItem('bio') || '';
    document.getElementById('nameDisplay').textContent = usuario ? usuario.nome : 'Burk Macklin';
};


// Alterar foto de perfil
document.getElementById('changeImageButton').addEventListener('click', function() {
    document.getElementById('imageInput').click();
});

// Atualizar imagem de perfil
document.getElementById('imageInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const profileImage = document.getElementById('profileImage');
            profileImage.src = e.target.result;

            // Salvar a imagem no localStorage
            localStorage.setItem('profileImage', e.target.result);
        };
        reader.readAsDataURL(file);
    }
});

// Função para resetar a imagem de perfil para a padrão
function resetProfileImage() {
    const profileImage = document.getElementById('profileImage');
    const defaultImage = 'imgs/default-profile.png';
    profileImage.src = defaultImage;
    localStorage.setItem('profileImage', defaultImage);
}

document.getElementById('editButton').addEventListener('click', function() {
    document.querySelectorAll('input, textarea').forEach(el => el.removeAttribute('readonly'));
    document.getElementById('editButton').style.display = 'none';
    document.getElementById('saveButton').style.display = 'inline';
    
    // Habilitar borda de edição nos campos
    document.querySelectorAll('input, textarea').forEach(el => el.classList.add('editable'));
});

document.getElementById('saveButton').addEventListener('click', function() {
    // Salvar os dados no localStorage
    localStorage.setItem('name', document.getElementById('nameInput').value);
    localStorage.setItem('email', document.getElementById('emailInput').value);
    localStorage.setItem('phone', document.getElementById('phoneInput').value);
    localStorage.setItem('address', document.getElementById('addressInput').value);
    localStorage.setItem('bio', document.getElementById('bio').value);
    
    document.getElementById('nameDisplay').textContent = document.getElementById('nameInput').value;

    // Tornar os campos somente leitura
    document.querySelectorAll('input, textarea').forEach(el => el.setAttribute('readonly', true));
    
    // Remover borda de edição
    document.querySelectorAll('input, textarea').forEach(el => el.classList.remove('editable'));
    
    document.getElementById('editButton').style.display = 'inline';
    document.getElementById('saveButton').style.display = 'none';
    
    alert('Alterações salvas com sucesso!');
});
