const fundo_escuro = document.getElementById('blackscreen')
const formContainer = document.getElementById('form-container');
const task = document.getElementById('TAREFAS')


document.addEventListener('DOMContentLoaded', async function pegarConteudo(event) {
    event.preventDefault();


    let w_name = document.getElementById('titulo')
    let workspaceName = localStorage.getItem('teste')
    let workspaceId = localStorage.getItem('id_workspace')
    w_name.textContent = workspaceName

    console.log(workspaceId)
    console.log(workspaceName)

    // let data = {workspaceId}

    let response = await fetch(`http://localhost:3001/api/store/getContentWorkspace/${workspaceId}`, {
        method: 'GET',
        headers: {"Content-type": "application/json;charset=UTF-8" },
        // body: JSON.stringify(data)
      })

      let content = await response.json()
      console.log(content);

      if(content.success) {
            quill.clipboard.dangerouslyPasteHTML(quill.getLength() - 1,`${content.data[0].conteudo}`);
      } else {
        console.log('Erro ao carregar conteúdo')
      }
})

let abrir_forms = document.getElementById('saveButton')

abrir_forms.addEventListener('click', async function salvar_conteudo(event) {
  event.preventDefault();

  let conteudo = quill.root.innerHTML;
  let id = localStorage.getItem('id_workspace')

  let data = {conteudo, id}


  let response = await fetch('http://localhost:3001/api/store/updateContent', {
    method: 'PUT',
    headers: {"Content-type": "application/json;charset=UTF-8"},
    body: JSON.stringify(data)
  })

  let content = await response.json()

  if (content.success) {
    console.log(content)

    let Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "success",
      title: "Salvo com sucesso"
    });

  } else {
    let Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "error",
      title: "Erro ao salvar"
    });
  }
})



const home = document.getElementById('home')
home.addEventListener('click', function(){
    window.location.href = 'home.html'
})

const quill = new Quill('#editor', {
    modules: {
      syntax: true,
      toolbar: '#toolbar-container',
    },
    theme: 'snow',
});

let logout = document.getElementById('logout')

logout.addEventListener('click', function() {
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

      setTimeout(function() {
        window.location.href = 'login.html'
      },1200)
})

task.addEventListener("click", () => window.location.href = 'tasks.html')

const perfil_home = document.getElementById('perfil')
perfil_home.addEventListener('click', function(){
  window.location.href = 'perfil.html'
})