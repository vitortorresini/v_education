const botao = document.getElementById('botão')

botao.onclick = async function(e) {
    e.preventDefault()


    let email = document.getElementById('email').value;
    let senha = document.getElementById('senha').value;

    if (!email || !senha) {

        Swal.fire({
            title: "Erro",
            text: "Preencha todos os campos",
            icon: "error"
          });

        return false
    } else {
        let data = { email, senha}

        const response = await fetch('http://localhost:3001/api/store/login', {
            method: 'POST',
            headers: {"Content-type": "application/json;charset=UTF-8" },
            body: JSON.stringify(data)
            
        })

        let content = await response.json()
        console.log(content)

        if(content.success) {

            Swal.fire({
                icon: "success",
                title: "Login feito com sucesso",
                showConfirmButton: false,
                timer: 1500
              });

            let userId = content.data[0].id
            let userName = content.data[0].nome
            console.log(userName)
            localStorage.setItem('name_user', userName)
            localStorage.setItem('id_user', userId)
            localStorage.setItem('email_user', email)

            setTimeout(function() {
                window.location.href = 'home.html'
            }, 1000);
        } else {
            Swal.fire({
                title: "Erro",
                text: "Email ou Senha estão incorretos",
                icon: "error"
              });
        }
    }
}