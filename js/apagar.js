  const matricula = document.querySelector('#matriculaApagar');
  const data = document.querySelector('#datahoraApagar');
  const observacao = document.querySelector('#observacaoApagar');
  const apagar = document.querySelector('#apagar');
  const logo = document.querySelector('#logo');
  const voltar = document.querySelector('#voltar');
  const URL = 'https://projetointegrador.cyclic.app';


  const parametros = new URLSearchParams(window.location.search);
  const id = parametros.get('id')
  const matriculaURL = parametros.get('matricula');
  const observacaoURL = parametros.get('observacao');
  const dataURL = parametros.get('data');
  const dataFormatada = new Date(dataURL);
  const dataCorreta = dataFormatada.toLocaleDateString('pt-BR', {timeZone: 'UTC', year: 'numeric', month:'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'});
  matricula.value = matriculaURL;
  data.value = dataCorreta;
  observacao.value = observacaoURL;

  // Busca CPF
const botaoBuscaCpf = document.querySelector('#btnBuscarCpf');
const inputBuscaCpf = document.querySelector('#inputBuscarCpf');
  
// Funcao Remove registro de acesso
  apagar.addEventListener('click', async (event)=>{
    try {
      event.preventDefault();
        logo.src='../img/loading.gif';
        logo.style.width = '50%';
        const requestOptions = {
          method: 'DELETE',
          redirect: 'follow',
          headers: {
            "Content-Type": "application/json"
          }
      };
      const resposta = await fetch(`${URL}/entradas/${id}`, requestOptions);
      const conteudo = await resposta.json();

      if(conteudo == 'Registro removido com sucesso!'){
        Swal.fire({
          title: "Registro removido com sucesso!",
          icon: "success",
        });
      logo.src='../img/logo1.png';
      }

      setTimeout(() => {
        window.location.href = '../index.html';
      }, 3000);

      console.log(conteudo)
      logo.src='../img/logo1.png';

    } catch (error) {
      console.log(error);
      logo.src='../img/logo1.png';
      return;
    }
  });


  // -------- BUSCAR CPF NO BANCO DE DADOS ------------
// Valida o CPF para busca no banco de dados 'GET'/:cpf
inputBuscaCpf.addEventListener('keyup', ()=>{
  if(inputBuscaCpf.value.length > 11){
    Swal.fire({
        title: "CPF deve conter 11 digitos!",
        icon: "warning",
        confirmButtonColor: "#0275d8",
      });
      inputBuscaCpf.value = inputBuscaCpf.value.slice(0,11);
  }
 });

 // Busca CPF no Banco de dados 'GET'/:cpf
botaoBuscaCpf.addEventListener('click', async (event)=> {
  event.preventDefault();
  try {
    if(!inputBuscaCpf.value || inputBuscaCpf.value.length != 11){
      Swal.fire({
        title: "O campo 'CPF' deve conter 11 digitos!",
        icon: "info",
        confirmButtonColor: "#0275d8",
      });
      return;
    }
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: {
        "Content-Type": "application/json"
      }
  };
  const resposta = await fetch(`${URL}/matriculas/cpf/${inputBuscaCpf.value}`, requestOptions);
  const conteudo = await resposta.json();


  if(conteudo == "Matrícula não encontrada!"){
    Swal.fire({
      title: "Usuário não cadastrado!",
      icon: "warning",
      confirmButtonColor: "#d9534f",
    });
    return inputBuscaCpf.value = '';
  }


  Swal.fire({
    title: `${conteudo.infos.nome}`,
    icon: "success",
    confirmButtonColor: "#0275d8",
    html: `
    <b>Matrícula</b>: ${conteudo.infos.matricula}<br>
    <b>CPF</b>: ${conteudo.infos.cpf}<br>
    <b>RG</b>: ${conteudo.infos.rg}<br>
    `
  });

  console.log(conteudo);
  } catch (error) {
    console.log(error);
  }
});


