const nome = document.querySelector('#nome');
const matricula = document.querySelector('#matricula');
const rg = document.querySelector('#rg');
const cpf = document.querySelector('#cpf');
const URL = 'https://projetointegrador.cyclic.app';

// Busca CPF
const botaoBuscaCpf = document.querySelector('#btnBuscarCpf');
const inputBuscaCpf = document.querySelector('#inputBuscarCpf');


// PEGANDO OS PARAMETROS VIA URL
const parametros = new URLSearchParams(window.location.search);
const id = parametros.get('id')

const informacoes = async () => {
try {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
};
const resposta = await fetch(`${URL}/matriculas/${id}`, requestOptions);
const conteudo = await resposta.json();

const tabela = document.querySelector('#tabela');
const tr = document.createElement('tr');

tr.innerHTML = `
<td>${conteudo.infos.nome}</td>
<td>${conteudo.infos.matricula}</td>
<td>${conteudo.infos.rg}</td>
<td>${conteudo.infos.cpf}</td>
`;

tabela.appendChild(tr);

console.log(conteudo)

} catch (error) {
  console.log(error)
}
}

informacoes();

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