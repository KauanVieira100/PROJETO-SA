// Obtendo os elementos
const editButton = document.getElementById('editButton');
const saveButton = document.getElementById('saveButton');
const nameInput = document.getElementById('nameInput');
const jobInput = document.getElementById('jobInput');
const bioTextArea = document.getElementById('bio');
const emailInput = document.getElementById('emailInput');
const phoneInput = document.getElementById('phoneInput');
const websiteInput = document.getElementById('websiteInput');
const imageInput = document.getElementById('imageInput');
const profileImage = document.getElementById('profileImage');
const changeImageButton = document.getElementById('changeImageButton');

// Carregar dados do localStorage
function carregarDados() {
    const perfil = JSON.parse(localStorage.getItem('perfil'));

    if (perfil) {
        nameInput.value = perfil.name;
        jobInput.value = perfil.job;
        bioTextArea.value = perfil.bio;
        emailInput.value = perfil.email;
        phoneInput.value = perfil.phone;
        websiteInput.value = perfil.website;
        if (perfil.image) {
            profileImage.src = perfil.image;
        }
    }
}

// Habilitar edição
editButton.addEventListener('click', function() {
    // Tornando todos os campos editáveis
    nameInput.removeAttribute('readonly');
    jobInput.removeAttribute('readonly');
    bioTextArea.removeAttribute('readonly');
    emailInput.removeAttribute('readonly');
    phoneInput.removeAttribute('readonly');
    websiteInput.removeAttribute('readonly');
    imageInput.style.display = 'block'; // Exibe o input de imagem
    saveButton.style.display = 'inline-block'; // Exibe o botão de salvar
    editButton.style.display = 'none'; // Esconde o botão de editar
});

// Salvar alterações
saveButton.addEventListener('click', function() {
    // Criar objeto com os dados do perfil
    const perfil = {
        name: nameInput.value,
        job: jobInput.value,
        bio: bioTextArea.value,
        email: emailInput.value,
        phone: phoneInput.value,
        website: websiteInput.value,
        image: profileImage.src // Salva a imagem (base64)
    };

    // Salvar no localStorage
    localStorage.setItem('perfil', JSON.stringify(perfil));

    // Tornar os campos novamente somente leitura
    nameInput.setAttribute('readonly', true);
    jobInput.setAttribute('readonly', true);
    bioTextArea.setAttribute('readonly', true);
    emailInput.setAttribute('readonly', true);
    phoneInput.setAttribute('readonly', true);
    websiteInput.setAttribute('readonly', true);
    imageInput.style.display = 'none'; // Ocultar input de imagem
    saveButton.style.display = 'none'; // Esconde o botão de salvar
    editButton.style.display = 'inline-block'; // Mostra o botão de editar

    // Exibir mensagem de sucesso
    alert('Alterações salvas com sucesso!');
});

// Alterar foto de perfil
changeImageButton.addEventListener('click', function() {
    imageInput.click(); // Aciona o input de arquivo
});

// Atualizar imagem de perfil
imageInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            profileImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// Carregar os dados ao carregar a página
window.addEventListener('load', carregarDados);