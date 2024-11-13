const buttonEnviar = document.getElementById('enviar')
buttonEnviar.addEventListener('click', () => {
    console.log('O botão foi clicado!');
  })

  const inputUsuario = document.getElementById('usuario')
  inputUsuario.addEventListener('input', () => {
   if(inputUsuario.value){
    buttonEnviar.disabled = false
   }else{
    buttonEnviar.disabled = true
   }
  })


  const inputSenha = document.getElementById('senha')
  inputUsuario.addEventListener('input', () => {
    if(inputUsuario.value){
     buttonEnviar.disabled = false
    }else{
     buttonEnviar.disabled = true
    }
   })