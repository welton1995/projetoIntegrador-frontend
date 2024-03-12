// Editar registro
const inputMatriculaEditar = document.querySelector('#matriculaEditar');
const inputDataEditar = document.querySelector('#datahoraEditar');
const inputObservacaoEditar = document.querySelector('#observacaoEditar');
const botaoEditar = document.querySelector('#editar');
const logo = document.querySelector('#loading');
const parametros = new URLSearchParams(window.location.search);
const id = parametros.get('id');

const matriculaURL = parametros.get('matricula')
inputMatriculaEditar.value = matriculaURL;


botaoEditar.addEventListener('click', async (event)=> {
  event.preventDefault();
  let logo = document.querySelector('#imagemLogo');
  logo.src = '../img/loading.gif';
  logo.style.width = '50%';

  if(!inputDataEditar.value && !inputObservacaoEditar.value){
    Swal.fire({
      title: "Preencha os campos e tente novamente!",
      icon: "info",
    });
    logo.src = '../img/logo1.png';
    return;
  }

  try {
    const raw = {
      data: inputDataEditar.value,
      observacao: inputObservacaoEditar.value,
    }

    const requestOptions = {
      method: 'PUT',
      body: JSON.stringify(raw),
      redirect: 'follow',
      headers: {
        "Content-Type": "application/json"
      }
  };
  const resposta = await fetch(`https://conecta.cyclic.app/entradas/${id}`, requestOptions);
  const conteudo = await resposta.json();
    
  if(conteudo == 'Registro atualizado com sucesso!'){
    Swal.fire({
      title: "Acesso atualizado com sucesso!",
      icon: "success",
    });
    setTimeout(() => {
      window.location.href = '../index.html';
    }, 3000);
  }
  } catch (error) {
    console.log(error);
  logo.src = '../img/logo1.png';

  }


});