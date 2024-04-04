const parametros = new URLSearchParams(window.location.search); // Busca informações contidas na URL do navegador
const id = parametros.get('id');
const matricula = parametros.get('matricula');
const observacao = parametros.get('observacao');
const dataFormatada = new Date(parametros.get('data')); // Pega a data via URL
const dataCorreta = dataFormatada.toLocaleDateString('pt-BR', {timeZone: 'UTC', year: 'numeric', month:'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'});
const tabela = document.querySelector('#tabela');
const URL = 'https://projetointegrador.cyclic.app';

// Busca CPF
const botaoBuscaCpf = document.querySelector('#btnBuscarCpf');
const inputBuscaCpf = document.querySelector('#inputBuscarCpf');

// Busca pela matricula
const buscaMatricula = async () => {
try {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
  };
  const resposta = await fetch(`${URL}/matriculas/${matricula}`, requestOptions)
  const conteudo = await resposta.json();

  // Coloca as informações vindas da requisação dentro da tabela do HTML;
  tabela.innerHTML = `
  <tr>
      <th colspan="4" style="text-align: center; margin: 1rem;"><h3>Informações do acesso 🔐</h3></th>
  </tr>
  <tr>
    <th scope="col">Matrícula 📝</th>
    <th scope="col">Data 📆</th>
    <th scope="col">Observação 🔍</th>
  </tr>
  <tr>
    <td>${matricula}</td>
    <td>${dataCorreta}</td>
    <td>${observacao}</td>
  </tr>
  <tr>
    <th colspan="4" style="text-align: center; margin: 1rem;"><h3>Informações do Usuário  📂</h3></th>
  </tr>
  <tr>
    <th scope="col">Nome 👤</th>
    <th scope="col">RG  🪪</th>
    <th scope="col">CPF  💳</th>
  </tr>
  <tr>
    <td>${conteudo.infos.nome}</td>
    <td>${conteudo.infos.rg}</td>
    <td>${conteudo.infos.cpf}</td>
  </tr>
  `
  
} catch (error) {
  console.log(error);
}
}

buscaMatricula();

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