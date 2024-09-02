const projetos = document.getElementById('projetos');
const formContainer = document.getElementById('form-container');
const fundo_escuro = document.getElementById('blackscreen');
const perfil = document.getElementById('perfil');
const logo_nav = document.getElementById('logo');
const logout = document.getElementById('logout');
const novo = document.getElementById('novo');
const closeForm = document.getElementById('closeForm');
const title_modal = document.getElementById('title_modal'); // Titulo do Modal
const criar = document.getElementById('criar_nov') // Botão de Criar WK
const editar_nome = document.getElementById('editar_nome') // Botão para editar
const input = document.getElementById('workspaceName') // Input
const editar = document.getElementById('editar') // Botão para escolher Edição
const deletar = document.getElementById('deletar') // Botão para deletconst

// Função para mostrar os workspaces ao carregar a página
document.addEventListener('DOMContentLoaded', async function showWorkspace(event) {
  event.preventDefault();
  
  let user_id = localStorage.getItem('id_user');
  
  let response = await fetch('http://localhost:3001/api/store/showWorkspace', {
    method: 'POST',
    headers: { "Content-type": "application/json;charset=UTF-8" },
    body: JSON.stringify({ user_id })
  });
  
  let content = await response.json();

  if (content.success) {
    content.data.forEach(function (workspace) {
      criarCardWorkspace(workspace);
    });
  }
});

// Função para criar o card do workspace
function criarCardWorkspace(workspace) {
  let { nome, id, createdate } = workspace;
  
  let createDate = new Date(createdate);
  let formattedDate = `${createDate.getDate().toString().padStart(2, '0')}/${(createDate.getMonth() + 1).toString().padStart(2, '0')}/${createDate.getFullYear()}`;
  
  let novo_card = document.createElement('div');
  novo_card.classList.add('cards');
  
  let wk = document.createElement('div');
  wk.classList.add('card');
  wk.innerHTML = `
    <div class="card-left">
    <img src="assets/logo certa.png" alt="workspace icon" class="workspace-icon">
      <div id="name_workspace">${nome}</div>
    </div>
    <div class="card-right">
    <p>${formattedDate}</p>
    </div>
    `;
    
    let options = document.createElement('div');
    options.classList.add('options');
    options.innerHTML = `<img src="assets/options.png" alt="workspace options" id="options_wk" class="options_wk">`;
    
    options.querySelector('#options_wk').addEventListener('click', () => gerenciarWorkspace(id));
    
    wk.addEventListener('click', () => abrirWorkspace(id, nome));
    
    novo_card.appendChild(wk);
    novo_card.appendChild(options);
    projetos.appendChild(novo_card);
  }
  
  // Função para gerenciar workspace (editar ou excluir)
  function gerenciarWorkspace(id) {
    mostrarFormularioGerenciamento();
    configurarBotaoExcluir(id);
    configurarBotaoEditar(id);
  }
  
  // Função para configurar botão de excluir workspace
  function configurarBotaoExcluir(id) {
    let excluir = document.getElementById('deletar');
    excluir.style.display = 'flex';
    excluir.addEventListener('click', async function deletar(event) {
      event.preventDefault();
      
      let response = await fetch(`http://localhost:3001/api/store/deleteWorkspace/${id}`, {
        method: 'DELETE',
        headers: { "Content-type": "application/json;charset=UTF-8" },
      });
      
      let content = await response.json();
      if (content.success) {
        esconderFormulario();
        setTimeout(() => location.reload(), 700);
      } else {
        console.log('Erro ao deletar workspace');
      }
  });
}

// Função para mostrar formulário de edição

// function mostrarFormularioEdicao(id) {
//   esconderFormulario();
//   setTimeout(() => {
//     title_modal.textContent = 'Escolha um novo Nome'
//     input.style.display = 'flex';
//     input.placeholder = 'Novo Nome';
//     editar_nome.style.display = 'flex';
//     editar.style.display = 'none'
//     deletar.style.display = 'none'
//     criar.style.display = 'none'
    
    
    
//     formContainer.style.opacity = '1'
//     formContainer.style.visibility = 'visible'
//     formContainer.style.transition = 'all 0.7s ease'
    
//     fundo_escuro.style.opacity = '1'
//     fundo_escuro.style.visibility = 'visible'
//     fundo_escuro.style.transition = 'all 0.7s ease'
    
//   }, 500);
// }



// Função para abrir workspace


function abrirWorkspace(id, nome) {
  localStorage.setItem('teste', nome);
  localStorage.setItem('id_workspace', id);
  window.location.href = 'workspace.html';
}

// Função para mostrar o formulário de gerenciamento de workspace
function mostrarFormularioGerenciamento() {
  title_modal.textContent = 'Excluir Workspace';
  criar.style.display = 'none'
  editar_nome.style.display = 'none'
  input.style.display = 'none'
  deletar.style.display = 'flex'
  editar.style.display = 'none'
  
  formContainer.style.opacity = '1'
  formContainer.style.visibility = 'visible'
  formContainer.style.transition = 'all 0.7s ease'
  
  fundo_escuro.style.opacity = '1'
  fundo_escuro.style.visibility = 'visible'
  fundo_escuro.style.transition = 'all 0.7s ease'
}

function mostrarFormularioCriação() {
  title_modal.textContent = 'Criar Workspace';
  editar_nome.style.display = 'none'
  editar.style.display = 'none'
  deletar.style.display = 'none'
  criar.style.display = 'flex'
  input.style.display = 'flex'
  
  
  formContainer.style.opacity = '1'
  formContainer.style.visibility = 'visible'
  formContainer.style.transition = 'all 0.7s ease'
  
  fundo_escuro.style.opacity = '1'
  fundo_escuro.style.visibility = 'visible'
  fundo_escuro.style.transition = 'all 0.7s ease'
}

// Função para esconder o formulário de gerenciamento
function esconderFormulario() {
  formContainer.style.opacity = '0'
  formContainer.style.visibility = 'hidden'
  formContainer.style.transition = 'all 0.7s ease'
  
  fundo_escuro.style.opacity = '0'
  fundo_escuro.style.visibility = 'hidden'
  fundo_escuro.style.transition = 'all 0.7s ease'
}

// Event listener para o perfil
perfil.addEventListener('click', () => window.location.href = 'perfil.html');

// Event listener para o botão de logout
logout.addEventListener('click', function () {
  let Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1200,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });
  Toast.fire({
    icon: "info",
    title: "Logout feito com sucesso"
  });
  
  setTimeout(() => window.location.href = 'login.html', 1200);
});

// Event listener para o botão de novo workspace
novo.addEventListener('click', function () {
  mostrarFormularioCriação();
  document.getElementById('criar_nov').style.display = 'flex';
  
  document.getElementById('criar_nov').addEventListener('click', async function wk_create(event) {
    event.preventDefault();
    
    let workspaceName = document.getElementById("workspaceName").value;
    let user_id = localStorage.getItem('id_user');
    
    let data = {
      workspaceName, user_id
    }
    
    let response = await fetch('http://localhost:3001/api/store/workspace', {
      method: 'POST',
      headers: { "Content-type": "application/json;charset=UTF-8" },
      body: JSON.stringify(data)
    });
    
    let content = await response.json();
    if (content.success) {
      esconderFormulario();
      document.getElementById('workspaceName').value = '';
      setTimeout(() => location.reload(), 500);
    } else {
      alert("Erro!");
    }
  });
});

// Event listener para fechar o formulário
closeForm.addEventListener('click', esconderFormulario);