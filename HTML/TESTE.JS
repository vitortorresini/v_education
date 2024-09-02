// let projetos = document.getElementById('projetos');

// let formContainer = document.getElementById('form-container');

// document.addEventListener('DOMContentLoaded', async function showWorkspace(event) {
//   event.preventDefault();

//   let user_id = localStorage.getItem('id_user');
//   let data = { user_id };

//   const response = await fetch('http://localhost:3001/api/store/showWorkspace', {
//     method: 'POST',
//     headers: { "Content-type": "application/json;charset=UTF-8" },
//     body: JSON.stringify(data)
//   });

//   const content = await response.json();

//   if (content.success) {
//     content.data.forEach(function (workspace) {
//       const nome = workspace.nome;
//       const id = workspace.id;

//       const createDate = new Date(workspace.createdate);
//       const formattedDate = `${createDate.getDate().toString().padStart(2, '0')}/${(createDate.getMonth() + 1).toString().padStart(2, '0')}/${createDate.getFullYear()}`;

//       const novo_card = document.createElement('div');
//       const wk = document.createElement('div');
//       const options = document.createElement('div');

//       novo_card.classList.add('cards');
//       wk.classList.add('card');
//       options.classList.add('options');


//       const cardContent = `
//           <div class="card-left">
//             <img src="assets/logo certa.png" alt="workspace icon" class="workspace-icon">
//             <div id="name_workspace">${nome}</div>
//           </div>
//           <div class="card-right">
//             <p>${formattedDate}</p>
//           </div>
//         `;
//       wk.innerHTML = cardContent;
//       options.innerHTML = `<img src="assets/options.png" alt="workspace options" id="options_wk" class="options_wk">`;

//       novo_card.appendChild(wk);
//       novo_card.appendChild(options);
//       projetos.appendChild(novo_card);

//       // Adiciona o evento de clique ao botão de opções
//       options.querySelector('#options_wk').addEventListener('click', function () {
//         console.log('Opções clicadas para o workspace: ' + id);

//         formContainer.style.opacity = '1'
//         formContainer.style.visibility = 'visible'
//         formContainer.style.transition = 'all 0.7s ease'

//         fundo_escuro.style.opacity = '1'
//         fundo_escuro.style.visibility = 'visible'
//         fundo_escuro.style.transition = 'all 0.7s ease'

//         const input = document.getElementById('workspaceName')
//         input.style.display = 'none'

//         const criar_new = document.getElementById('criar_nov')
//         criar_new.style.display = 'none'

//         const editar = document.getElementById('editar')
//         editar.style.display = 'flex'

//         const editar_nome = document.getElementById('editar_nome')
//         editar_nome.style.display = 'none'

//         const excluir = document.getElementById('deletar')
//         excluir.style.display = 'flex'

//         const title_modal = document.getElementById('title_modal')
//         title_modal.textContent = 'Gerenciar Workspace'

//         excluir.addEventListener('click', async function deletar(event) {
//           event.preventDefault()

//           const response = await fetch(`http://localhost:3001/api/store/deleteWorkspace/${id}`, {
//             method: 'DELETE',
//             headers: { "Content-type": "application/json;charset=UTF-8" },
//           })

//           const content = await response.json()

//           if (content.success) {
//             console.log('Workspace deletado com sucesso')

//             formContainer.style.opacity = '0'
//             formContainer.style.visibility = 'hidden'
//             formContainer.style.transition = 'all 0.7s ease'

//             fundo_escuro.style.opacity = '0'
//             fundo_escuro.style.visibility = 'hidden'
//             fundo_escuro.style.transition = 'all 0.7s ease'

//             setTimeout(function () {
//               location.reload()
//             }, 700);

//           } else {
//             console.log('Erro ao deletar workspace')
//           }
//         })

//         editar.addEventListener('click', function() {
//           formContainer.style.opacity = '0'
//           formContainer.style.visibility = 'hidden'
//           formContainer.style.transition = 'all 0.7s ease'

//           fundo_escuro.style.opacity = '0'
//           fundo_escuro.style.visibility = 'hidden'
//           fundo_escuro.style.transition = 'all 0.7s ease'

//           setTimeout(function(){
//             input.style.display = 'flex'
//             input.placeholder = 'Novo Nome'
//             excluir.style.display = 'none'
//             editar_nome.style.display = 'flex'
//             editar.style.display = 'none'
//             title_modal.textContent = 'Novo nome'

//             formContainer.style.opacity = '1'
//             formContainer.style.visibility = 'visible'
//             formContainer.style.transition = 'all 0.7s ease'
    
//             fundo_escuro.style.opacity = '1'
//             fundo_escuro.style.visibility = 'visible'
//             fundo_escuro.style.transition = 'all 0.7s ease'

//             const edit = document.getElementById('editar_nome')

//             edit.addEventListener('click', async function edit_name(event) {
//               event.preventDefault();

//               let name = 'FODA-SE'; // Aqui, você está definindo um valor fixo
            
//               let data = { name, id }; // Certifique-se de que 'id' está sendo corretamente definido
            
//               console.log('Dados a serem enviados:', data);
            
//               const response = await fetch('http://localhost:3001/api/store/editName', {
//                 method: 'PUT',
//                 headers: { "Content-type": "application/json;charset=UTF-8" },
//                 body: JSON.stringify(data)
//               });
            
//               const content = await response.json();
//               console.log('Resposta da API:', content);
            
//               if (content.success) {
//                 console.log('Nome alterado com sucesso');
//                 // location.reload(); // Comentei isso para depuração
//               } else {
//                 console.log('Erro ao alterar nome');
//               }
//             })

//           })

//         })
//       });

//       wk.addEventListener('click', function () {
//         console.log(id);
//         localStorage.setItem('teste', nome);
//         localStorage.setItem('id_workspace', id);
//         window.location.href = 'workspace.html';
//       });
//     });
//   }
// });

// const perfil = document.getElementById('perfil')

// perfil.addEventListener('click', function () {
//   window.location.href = 'perfil.html'
// })


// let logo_nav = document.getElementById('logo');


// logo_nav.addEventListener('click', function () {
//   let nav = document.getElementById('nav');
//   let novo = document.getElementById('novo')
//   let home = document.getElementById('home')
//   let criar = document.getElementById('criar')
//   let perfil = document.getElementById('perfil')
//   let logout = document.getElementById('logout')
//   let texto_home = document.getElementById('texto-home')
//   let texto_perfil = document.getElementById('texto-perfil')
//   let texto_logout = document.getElementById('texto-logout')
//   let linha = document.getElementById('line')
//   let workspaces = document.getElementById('workspaces')
//   let title = document.getElementById('title')

//   if (nav.style.width === '15vw') {
//     criar.style.width = '94vw';
//     novo.style.width = '90vw';
//     nav.style.width = '6vw';

//     title.style.width = '90vw'
//     linha.style.width = '90vw'
//     workspaces.style.width = '94vw'

//     home.style.width = '5vw';
//     perfil.style.width = '5vw'
//     logout.style.width = '5vw'



//     texto_home.style.display = 'none'
//     texto_perfil.style.display = 'none'
//     texto_logout.style.display = 'none'

//     texto_home.style.opacity = '0'
//     texto_perfil.style.opacity = '0'
//     texto_logout.style.opacity = '0'
//   } else {
//     criar.style.width = '85vw';
//     novo.style.width = '80vw';
//     nav.style.width = '15vw';

//     title.style.width = '81vw'
//     linha.style.width = '81vw'
//     workspaces.style.width = '85vw'

//     home.style.width = '13vw';
//     perfil.style.width = '13vw'
//     logout.style.width = '13vw'

//     texto_home.style.display = 'flex'
//     texto_perfil.style.display = 'flex'
//     texto_logout.style.display = 'flex'

//     texto_home.style.opacity = '1'
//     texto_perfil.style.opacity = '1'
//     texto_logout.style.opacity = '1'
//   }
// });


// let logout = document.getElementById('logout')

// logout.addEventListener('click', function () {
//   const Toast = Swal.mixin({
//     toast: true,
//     position: "top-end",
//     showConfirmButton: false,
//     timer: 1200,
//     timerProgressBar: true,
//     didOpen: (toast) => {
//       toast.onmouseenter = Swal.stopTimer;
//       toast.onmouseleave = Swal.resumeTimer;
//     }
//   });
//   Toast.fire({
//     icon: "info",
//     title: "Logout feito com sucesso"
//   });

//   setTimeout(function () {
//     window.location.href = 'login.html'
//   }, 1200)
// })

// let novo = document.getElementById('novo');
// let closeForm = document.getElementById('closeForm');
// let fundo_escuro = document.getElementById('blackscreen')

// novo.addEventListener('click', function () {
//   formContainer.style.opacity = '1'
//   formContainer.style.visibility = 'visible'
//   formContainer.style.transition = 'all 0.7s ease'

//   fundo_escuro.style.opacity = '1'
//   fundo_escuro.style.visibility = 'visible'
//   fundo_escuro.style.transition = 'all 0.7s ease'

//   const criar_wk = document.getElementById('criar_nov')
//   criar_wk.style.display = 'flex'

//   const editar = document.getElementById('editar')
//   editar.style.display = 'none'

//   const title_modal = document.getElementById('title_modal')
//   title_modal.textContent = 'Criar novo workspace'


//   criar_wk.addEventListener('click', async function wk_create(event) {

//     event.preventDefault();

//     let workspaceName = document.getElementById("workspaceName").value;

//     let user_id = localStorage.getItem('id_user')

//     const data = {
//       user_id,
//       workspaceName
//     }

//     const response = await fetch('http://localhost:3001/api/store/workspace', {
//       method: 'POST',
//       headers: { "Content-type": "application/json;charset=UTF-8" },
//       body: JSON.stringify(data)
//     })

//     let content = await response.json()

//     if (content.success) {

//       formContainer.style.opacity = '0'
//       formContainer.style.visibility = 'hidden'
//       formContainer.style.transition = 'all 0.7s ease'

//       fundo_escuro.style.opacity = '0'
//       fundo_escuro.style.visibility = 'hidden'
//       fundo_escuro.style.transition = 'all 0.7s ease'
//       document.getElementById('workspaceName').value = '';

//       setTimeout(function () {
//         location.reload()
//       }, 500)
//     } else {
//       alert("Erro!")
//     }
//   })

// });

// closeForm.addEventListener('click', function () {
//   formContainer.style.opacity = '0'
//   formContainer.style.visibility = 'hidden'
//   formContainer.style.transition = 'all 0.7s ease'

//   fundo_escuro.style.opacity = '0'
//   fundo_escuro.style.visibility = 'hidden'
//   fundo_escuro.style.transition = 'all 0.7s ease'
// });