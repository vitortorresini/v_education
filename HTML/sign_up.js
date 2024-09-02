const button = document.getElementById("botao")


button.onclick = async function() {
    let email = document.getElementById("email-input").value;     
    let nome = document.getElementById("nome-input").value;
    let senha = document.getElementById("senha-input").value;
    let data = {email,nome,senha}

    if (!email || !nome || !senha) {
        Swal.fire({
            title: 'Erro',
            text: 'Preencha todos os campos',
            icon: 'error',
            confirmButtonText: 'Fechar',
            confirmButtonColor: '#6AAFE0',
            color: '#000000'
          })
        return false
    } else {
        if (!email.includes('@')) {
            Swal.fire({
                title: 'Erro',
                text: 'O email não é válido',
                icon: 'error',
                confirmButtonText: 'Fechar',
                confirmButtonColor: '#6AAFE0',
                color: '#000000'
              })
        } else {
            if (senha.length < 5 || !/[A-Z]/.test(senha)) {
                Swal.fire({
                    title: 'Erro',
                    text: 'A senha precisa ter no mínimo 5 caracteres e 1 letra maiúscula',
                    icon: 'error',
                    confirmButtonText: 'Fechar',
                    confirmButtonColor: '#6AAFE0',
                    color: '#000000'
                  })
            } else {
                
                const response = await fetch("http://localhost:3001/api/store/create", {
                    method: "POST",
                    headers: {"Content-type": "application/json;charset=UTF-8"},
                    body: JSON.stringify(data)
                });
                
                let content = await response.json();
                
                if(content.success) {
                    Swal.fire({
                        title: "Conta Criada",
                        text: "Agora faça login para acessa-lá",
                        icon: "success"
                      });
        

                } else {
                    Swal.fire({
                        title: 'Erro',
                        text: 'Ocorreu algum erro ao tentar criar sua conta',
                        icon: 'error',
                        confirmButtonText: 'Fechar'
                    })
                }
            }
        }
    }
}