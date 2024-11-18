const user_id = localStorage.getItem('id_user')
const formContainer = document.getElementById('form-container');
const closeForm = document.getElementById('closeForm');
const fundo_escuro = document.getElementById('blackscreen')
const nome_forms = document.getElementById('nome-forms')
const user_email = localStorage.getItem('email_user')
const task = document.getElementById('TAREFAS')
let update = ""

const nome_atual = document.getElementById('nome-a')
const email_atual = document.getElementById('email-a')
document.addEventListener('DOMContentLoaded', async function mostrarDados(event){
    event.preventDefault();

    email_atual.textContent = user_email

    let id_usuario = localStorage.getItem('id_user');

    let response = await fetch(`http://localhost:3001/api/store/perfilPush/${id_usuario}`, {
        method: 'GET',
        headers: {"Content-type": "application/json;charset=UTF-8"},
        // body: JSON.stringify(data)
    })

    let content = await response.json()
    console.log(content)

    if (content.success) {
        
        let nome_mostrar = content.data[0].nome;
        let cpf_mostrar = content.data[0].cpf;
        let telefone_mostrar = content.data[0].telefone;
        let nasc_mostrar = content.data[0].nasc_data;

        let nome_nj = document.getElementById('nome-a')
        nome_nj.textContent = nome_mostrar
        let cpf_nj = document.getElementById('cpf-a')
        cpf_nj.textContent = cpf_mostrar
        let telefone_nj = document.getElementById('telefone-a')
        telefone_nj.textContent = telefone_mostrar
        let data_nj = document.getElementById('nascimento-a')
        data_nj.textContent = nasc_mostrar
        
    } else {
        console.log("erro")
    }
})


const botao_name = document.getElementById('edit-name')

botao_name.addEventListener('click', function(){

    update = "nome"

    let placeholder = document.getElementById('nome_user')
    let nome_for_input = document.getElementById('nome-a').textContent

    placeholder.value = nome_for_input

    placeholder.placeholder = 'Novo Nome'

    nome_forms.textContent = "Editar Nome"

    formContainer.style.opacity = '1'
    formContainer.style.visibility = 'visible'
    formContainer.style.transition = 'all 0.7s ease'
  
    fundo_escuro.style.opacity = '1'
    fundo_escuro.style.visibility = 'visible'
    fundo_escuro.style.transition = 'all 0.7s ease' 
});

const editar_CPF = document.getElementById('edit-cpf')

editar_CPF.addEventListener("click", function(){

    update = "cpf"

    nome_forms.textContent = "Editar CPF"

    let placeholder = document.getElementById('nome_user')
    let cpf_for_input = document.getElementById('cpf-a').textContent

    placeholder.value = cpf_for_input
    placeholder.placeholder = 'Novo CPF'

    formContainer.style.opacity = '1'
    formContainer.style.visibility = 'visible'
    formContainer.style.transition = 'all 0.7s ease'
  
    fundo_escuro.style.opacity = '1'
    fundo_escuro.style.visibility = 'visible'
    fundo_escuro.style.transition = 'all 0.7s ease'
})


const editar_Telefone = document.getElementById('edit-telefone')

editar_Telefone.addEventListener("click", function(){

    update = "telefone"

    nome_forms.textContent = "Editar Telefone"

    let placeholder = document.getElementById('nome_user')
    let telefone_for_input = document.getElementById('telefone-a').textContent

    placeholder.value = telefone_for_input
    placeholder.placeholder = 'Novo Telefone'

    formContainer.style.opacity = '1'
    formContainer.style.visibility = 'visible'
    formContainer.style.transition = 'all 0.7s ease'
  
    fundo_escuro.style.opacity = '1'
    fundo_escuro.style.visibility = 'visible'
    fundo_escuro.style.transition = 'all 0.7s ease'
})

const editar_Data = document.getElementById('edit-nascimento')

editar_Data.addEventListener("click", function(){

    update = "data"

    nome_forms.textContent = "Editar Data de Nascimento"

    let placeholder = document.getElementById('nome_user')
    let data_for_input = document.getElementById('nascimento-a').textContent

    placeholder.value = data_for_input
    placeholder.placeholder = 'Nova Data de Nascimento'

    formContainer.style.opacity = '1'
    formContainer.style.visibility = 'visible'
    formContainer.style.transition = 'all 0.7s ease'
  
    fundo_escuro.style.opacity = '1'
    fundo_escuro.style.visibility = 'visible'
    fundo_escuro.style.transition = 'all 0.7s ease'
})

const botao_change = document.getElementById('criar_nov')

botao_change.addEventListener('click', async function mudar(event) {
    if (update === "nome") {
        event.preventDefault();

        let nome = document.getElementById('nome_user').value;
        let id = localStorage.getItem('id_user');

        let data = {nome, id}

        const response = await fetch('http://localhost:3001/api/store/editName', {
            method: 'PUT',
            headers: {"Content-type": "application/json;charset=UTF-8"},
            body: JSON.stringify(data)
        })

        let content = await response.json()
        console.log(content)
        console.log(id)

        if(content.success) {
            formContainer.style.opacity = '0'
            formContainer.style.visibility = 'hidden'
            formContainer.style.transition = 'all 0.7s ease'
  
            fundo_escuro.style.opacity = '0'
            fundo_escuro.style.visibility = 'hidden'
            fundo_escuro.style.transition = 'all 0.7s ease'

            let novo_nome = document.getElementById('nome-a')

            novo_nome.textContent = nome


        } else {
            console.log('erro')
        }
    } else if (update === "cpf") {
        event.preventDefault();

        let cpf = document.getElementById('nome_user').value;
        let id = localStorage.getItem('id_user');

        let data = {cpf, id}

        const response = await fetch('http://localhost:3001/api/store/editCPF', {
            method: 'PUT',
            headers: {"Content-type": "application/json;charset=UTF-8"},
            body: JSON.stringify(data)
        })

        let content = await response.json()

        if (content.success) {
            formContainer.style.opacity = '0'
            formContainer.style.visibility = 'hidden'
            formContainer.style.transition = 'all 0.7s ease'
  
            fundo_escuro.style.opacity = '0'
            fundo_escuro.style.visibility = 'hidden'
            fundo_escuro.style.transition = 'all 0.7s ease'

            let cpf_escrito = document.getElementById("cpf-a")
            cpf_escrito.textContent = cpf
        } else {
            console.log("erro")
        }
    } else if (update === "telefone") {
        event.preventDefault();

        let telefone = document.getElementById('nome_user').value;
        let id = localStorage.getItem('id_user');

        let data = {telefone, id}

        const response = await fetch('http://localhost:3001/api/store/editTelefone', {
            method: 'PUT',
            headers: {"Content-type": "application/json;charset=UTF-8"},
            body: JSON.stringify(data)
        })

        let content = await response.json()

        if (content.success) {
            formContainer.style.opacity = '0'
            formContainer.style.visibility = 'hidden'
            formContainer.style.transition = 'all 0.7s ease'
  
            fundo_escuro.style.opacity = '0'
            fundo_escuro.style.visibility = 'hidden'
            fundo_escuro.style.transition = 'all 0.7s ease'

            const telefone_escrito = document.getElementById("telefone-a")
            telefone_escrito.textContent = telefone
        } else {
            console.log("erro")
        }
    } else if (update === "data") {
        event.preventDefault();

        let nasc_data = document.getElementById('nome_user').value;
        let id = localStorage.getItem('id_user');

        let data = {nasc_data, id}

        const response = await fetch('http://localhost:3001/api/store/editData', {
            method: 'PUT',
            headers: {"Content-type": "application/json;charset=UTF-8"},
            body: JSON.stringify(data)
        })

        let content = await response.json()

        if (content.success) {
            formContainer.style.opacity = '0'
            formContainer.style.visibility = 'hidden'
            formContainer.style.transition = 'all 0.7s ease'
  
            fundo_escuro.style.opacity = '0'
            fundo_escuro.style.visibility = 'hidden'
            fundo_escuro.style.transition = 'all 0.7s ease'

            let data_escrito = document.getElementById("nascimento-a")
            data_escrito.textContent = nasc_data
        } else {
            console.log("erro")
        }
    }
})



closeForm.addEventListener('click', function() {
    formContainer.style.opacity = '0'
    formContainer.style.visibility = 'hidden'
    formContainer.style.transition = 'all 0.7s ease'
  
    fundo_escuro.style.opacity = '0'
    fundo_escuro.style.visibility = 'hidden'
    fundo_escuro.style.transition = 'all 0.7s ease'
  
});

const home_img = document.getElementById("home_img")

home_img.addEventListener("click", () => window.location.href = 'home.html')

task.addEventListener("click", () => window.location.href = 'tasks.html')


const logout = document.getElementById('logout')

logout.addEventListener('click', function() {
    const Toast = Swal.mixin({
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