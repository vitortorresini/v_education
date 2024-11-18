const formContainer = document.getElementById('form-container');
const fundo_escuro = document.getElementById('blackscreen');
const perfil = document.getElementById('perfil');
const logo_nav = document.getElementById('logo');
const logout = document.getElementById('logout');
const closeForm = document.getElementById('closeForm');
const title_modal = document.getElementById('title_modal');
const criar_modal = document.getElementById('criar_nov')
const opc_evento = document.getElementById('opc_evento')
const input = document.getElementById('workspaceName')
const opc_tarefa = document.getElementById('opc_tarefa')
const criar = document.getElementById('criar')
const descrição = document.getElementById('Descrição')
const data = document.getElementById('date')
const tasks_open = document.getElementById('cards')
const tasks_closed = document.getElementById('cards_open')
const home = document.getElementById('home')
const task = document.getElementById('object')
const task_title = document.getElementById('title_task')
const closetask = document.getElementById('closeTask')
let concluir = document.getElementById('concluir')
let editar = document.getElementById('editTask')
let deletar = document.getElementById('deleteTask')
const tipo_object_edit = document.getElementById("tipo_object_edit")
const forms_edit = document.getElementById("edit_task")
const description_edit = document.getElementById("description_edit")
const data_edit = document.getElementById("data_edit")
let tipo = ''


home.addEventListener("click", () => window.location.href = "home.html")
perfil.addEventListener('click', () => window.location.href = 'perfil.html');


addEventListener('DOMContentLoaded', async function getOpenTasks(event) {
  event.preventDefault()

  let user_id = localStorage.getItem('id_user');

  let response = await fetch('http://localhost:3001/api/getTask', {
    method: 'POST',
    headers: { "Content-type": "application/json;charset=UTF-8" },
    body: JSON.stringify({ user_id })
  })

  let content = await response.json()

  if (content.success) {
    console.log(content)

    content.data.forEach(function (task_open) {
      criarTask(task_open)
    })
  } else {
    console.log('deu errado')
  }

})

function criarTask(task_open) {
  let { nome, conteudo, end_date, tipo, status } = task_open;

  if (status === 'open') {
    let nova_task = document.createElement('div');
    nova_task.classList.add('card');
  
    nova_task.innerHTML = `
      <div class='nome'>
        ${nome}
      </div>
      <div class='data'>
        <p class='data_title'>Data:</p>
        <p class='data_real'>${end_date}</p>
      </div>
      <div class='tipo'>
        <p class='data_title'>Tipo:</p>
        <p class='data_real'>${tipo}</p>
      </div>
    `;
  
    
    tasks_open.appendChild(nova_task);
    nova_task.addEventListener("click", () => abrirTask(task_open.id, task_open.nome, task_open.conteudo, task_open.end_date, task_open.status, task_open.tipo));
  } else {
    let nova_task = document.createElement('div');
    nova_task.classList.add('card');
  
    nova_task.innerHTML = `
      <div class='nome'>
        ${nome}
      </div>
      <div class='data'>
        <p class='data_title'>Data:</p>
        <p class='data_real'>${end_date}</p>
      </div>
      <div class='tipo'>
        <p class='data_title'>Tipo:</p>
        <p class='data_real'>${tipo}</p>
      </div>
    `;
  
    
    tasks_closed.appendChild(nova_task);
    nova_task.addEventListener("click", () => abrirTask(task_open.id, task_open.nome, task_open.conteudo, task_open.end_date, task_open.status, task_open.tipo));
  }
}

function abrirTask(id, nome, conteudo, end_date, status, tipo) {
  console.log(id, nome, conteudo, end_date)

  forms_edit.style.display = "flex"
  task_title.textContent = nome
  data_edit.value = end_date
  tipo_object_edit.textContent = tipo
  description_edit.value = conteudo

  task.style.opacity = '1'
  task.style.visibility = 'visible'
  task.style.transition = 'all 0.7s ease'

  fundo_escuro.style.opacity = '1'
  fundo_escuro.style.visibility = 'visible'
  fundo_escuro.style.transition = 'all 0.7s ease'

  if (status === 'Concluido') {
    concluir.style.display = 'none'
  } else {
    concluir.style.display = 'flex'
    editar.style.display = 'flex'
  }
  concluir.replaceWith(concluir.cloneNode(true));
  deletar.replaceWith(deletar.cloneNode(true));
  editar.replaceWith(editar.cloneNode(true));

  concluir = document.getElementById('concluir');
  deletar = document.getElementById('deleteTask');
  editar = document.getElementById('editTask');

  concluir.addEventListener('click', () => concluirTask(id))
  deletar.addEventListener('click', () => deletarTask(id))
  editar.addEventListener('click', () => editarTask(id, nome, status, tipo))
}

async function editarTask(id, nome, status, tipo) {

  let conteudo = document.getElementById("description_edit").value
  let end_date = document.getElementById("data_edit").value

  let data = {id, conteudo, end_date}

  let response = await fetch("http://localhost:3001/api/editTask", {
    method: 'PUT',
    headers: { "Content-type": "application/json;charset=UTF-8" },
    body: JSON.stringify(data)
  })

  let content = await response.json()

  if (content.success) {
    closeTask()
    setTimeout(() => location.reload(), 500)
  } else {
    console.log('deu merda')
  }

}

async function concluirTask(id) {

  let status = 'Concluido'

  let data = {status,id}

  console.log(data)

  let response = await fetch("http://localhost:3001/api/closeTask", {
    method: 'PATCH',
    headers: { "Content-type": "application/json;charset=UTF-8" },
    body: JSON.stringify(data)
  })

  let content = await response.json()

  console.log(content)

  if (content.success) {
    console.log('deu bom')
    esconderFormulario()
    setTimeout(() => location.reload(), 500)
  } else {
    console.log('deu merda')
  }
}

async function deletarTask(id) {

  let response = await fetch(`http://localhost:3001/api/deleteTask/${id}`, {
    method: 'DELETE',
    headers: { "Content-type": "application/json;charset=UTF-8" },
  })

  let content = await response.json()

  if (content.success) {
    console.log('deu bom')
    console.log(content)
    closeTask()
    setTimeout(() => location.reload(), 500)

  } else {
    console.log('deu merda')
  }
}

criar.addEventListener('click', function () {
  title_modal.textContent = 'Criar Tarefa | Evento';
  opc_tarefa.style.display = 'flex'
  opc_evento.style.display = 'flex'
  input.style.display = 'none'
  criar_modal.style.display = 'none'
  descrição.style.display = 'none'
  data.style.display = 'none'


  formContainer.style.opacity = '1'
  formContainer.style.visibility = 'visible'
  formContainer.style.transition = 'all 0.7s ease'

  fundo_escuro.style.opacity = '1'
  fundo_escuro.style.visibility = 'visible'
  fundo_escuro.style.transition = 'all 0.7s ease'
})

closeForm.addEventListener('click', esconderFormulario)

function esconderFormulario() {
  formContainer.style.opacity = '0'
  formContainer.style.visibility = 'hidden'
  formContainer.style.transition = 'all 0.7s ease'

  fundo_escuro.style.opacity = '0'
  fundo_escuro.style.visibility = 'hidden'
  fundo_escuro.style.transition = 'all 0.7s ease'
}

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

opc_tarefa.addEventListener('click', function () {
  tipo = "Task"
  abrirFormulárioTask()
})

opc_evento.addEventListener('click', function () {
  tipo = "Evento"
  abrirFormulárioEvento()
})
function abrirFormulárioTask() {
  esconderFormulario()
  setTimeout(() => {

    title_modal.textContent = 'Criar Tarefa';
    opc_tarefa.style.display = 'none'
    opc_evento.style.display = 'none'
    input.style.display = 'flex'
    criar_modal.style.display = 'flex'
    descrição.style.display = 'flex'
    data.style.display = 'flex'
    input.placeholder = 'Nome de Tarefa'
    data.placeholder = 'Data Limite'

    formContainer.style.opacity = '1'
    formContainer.style.visibility = 'visible'
    formContainer.style.transition = 'all 0.7s ease'

    fundo_escuro.style.opacity = '1'
    fundo_escuro.style.visibility = 'visible'
    fundo_escuro.style.transition = 'all 0.7s ease'
  }, 500);
}

function abrirFormulárioEvento() {
  esconderFormulario()
  setTimeout(() => {

    title_modal.textContent = 'Criar Evento';
    opc_tarefa.style.display = 'none'
    opc_evento.style.display = 'none'
    input.style.display = 'flex'
    criar_modal.style.display = 'flex'
    descrição.style.display = 'flex'
    data.style.display = 'flex'
    input.placeholder = 'Nome do Evento'
    data.placeholder = 'Data do Evento'

    formContainer.style.opacity = '1'
    formContainer.style.visibility = 'visible'
    formContainer.style.transition = 'all 0.7s ease'

    fundo_escuro.style.opacity = '1'
    fundo_escuro.style.visibility = 'visible'
    fundo_escuro.style.transition = 'all 0.7s ease'
  }, 500);
}

criar_modal.addEventListener("click", async function createObject(event) {
  event.preventDefault(event)

  let nome = document.getElementById("workspaceName").value
  let conteudo = document.getElementById("Descrição").value
  let end_date = document.getElementById('date').value
  let user_id = localStorage.getItem('id_user');

  let data = {
    nome, conteudo, end_date, user_id, tipo
  }

  let response = await fetch("http://localhost:3001/api/store/taskCreate", {
    method: 'POST',
    headers: { "Content-type": "application/json;charset=UTF-8" },
    body: JSON.stringify(data)
  })

  let content = await response.json()
  console.log(content)
  console.log(data)

  if (content.success) {
    console.log("Tarefa criada com sucesso!")
    esconderFormulario()
    setTimeout(() => location.reload(), 500)

  } else {
    console.log("Erro")
  }
})

closetask.addEventListener('click', () => closeTask())

function closeTask () {
  task.style.opacity = '0'
  task.style.visibility = 'hidden'
  task.style.transition = 'all 0.7s ease'
  
  fundo_escuro.style.opacity = '0'
  fundo_escuro.style.visibility = 'hidden'
  fundo_escuro.style.transition = 'all 0.7s ease'
}