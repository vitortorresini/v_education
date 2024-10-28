const formContainer = document.getElementById('form-container');
const fundo_escuro = document.getElementById('blackscreen');
const perfil = document.getElementById('perfil');
const logo_nav = document.getElementById('logo');
const logout = document.getElementById('logout');
const closeForm = document.getElementById('closeForm');
const title_modal = document.getElementById('title_modal'); // Titulo do Modal
const criar_modal = document.getElementById('criar_nov') // Botão de Criar WK
const opc_evento = document.getElementById('opc_evento') // Botão para editar
const input = document.getElementById('workspaceName') // Input
const opc_tarefa = document.getElementById('opc_tarefa') // Botão para escolher Edição
const deletar = document.getElementById('deletar') // Botão para deletconst
const criar = document.getElementById('criar')
const descrição = document.getElementById('Descrição')
const data = document.getElementById('date')
const tasks_open = document.getElementById('cards')
const home = document.getElementById('home')
const task = document.getElementById('object')
const task_title = document.getElementById('title_task')
const data_task = document.getElementById("data")
const descrição_task = document.getElementById("description")

home.addEventListener("click", () => window.location.href = "home.html")

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
      criarTaskOpen(task_open)
    })
  } else {
    console.log('deu errado')
  }

})

function criarTaskOpen(task_open) {
  let { nome, conteudo, end_date, tipo } = task_open;

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

  nova_task.addEventListener("click", () => abrirTask(task_open.id, task_open.nome, task_open.conteudo, task_open.end_date));

  tasks_open.appendChild(nova_task);
}


function abrirTask(id, nome, conteudo, end_date) {
  console.log(id, nome, conteudo, end_date)

  task_title.textContent = nome
  data_task.textContent = end_date
  descrição_task.textContent = conteudo

  task.style.opacity = '1'
  task.style.visibility = 'visible'
  task.style.transition = 'all 0.7s ease'

  fundo_escuro.style.opacity = '1'
  fundo_escuro.style.visibility = 'visible'
  fundo_escuro.style.transition = 'all 0.7s ease'

}

criar.addEventListener('click', function () {
  title_modal.textContent = 'Criar Tarefa | Evento';
  opc_tarefa.style.display = 'flex'
  deletar.style.display = 'none'
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
  abrirFormulárioTask()
})
function abrirFormulárioTask() {
  esconderFormulario()
  setTimeout(() => {

    title_modal.textContent = 'Criar Tarefa';
    opc_tarefa.style.display = 'none'
    deletar.style.display = 'none'
    opc_evento.style.display = 'none'
    input.style.display = 'flex'
    criar_modal.style.display = 'flex'
    descrição.style.display = 'flex'
    data.style.display = 'flex'
    data.placeholder = 'Data Limite'



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
  let tipo = 'Task'


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

    setTimeout(() => location.reload(), 500)

  } else {
    console.log("Erro")
  }
})