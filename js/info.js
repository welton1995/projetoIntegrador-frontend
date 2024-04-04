const nome = document.querySelector('#nome');
const matricula = document.querySelector('#matricula');
const rg = document.querySelector('#rg');
const cpf = document.querySelector('#cpf');
const URL = 'https://projetointegrador.cyclic.app';

// Busca CPF
const botaoBuscaCpf = document.querySelector('#btnBuscarCpf');
const inputBuscaCpf = document.querySelector('#inputBuscarCpf');

// Cadastra usuario
const inputNomeCadastro = document.querySelector('#nomeCadastro');
const inputRgCadastro = document.querySelector('#rgCadastro');
const inputCpfCadastro = document.querySelector('#cpfCadastro');
const botaoCadastrar = document.querySelector('#cadastrar');


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

// ---------- CADASTRAR -----------

// Funcao conta Matriculas
const geraMatricula = async () => {
  try {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: {
        "Content-Type": "application/json"
      }
  };
  const resposta = await fetch(`${URL}/matriculas`, requestOptions);
  const conteudo = await resposta.json();
  let quantidadeMatriculas = await conteudo.matriculas.length + 1;
  let numero = await quantidadeMatriculas.toString().padStart(6, '0');
  return numero;
  } catch (error) {
    console.log(error);
  }
};
//  Valida se RG tem 9 digitos
inputRgCadastro.addEventListener('keyup', ()=>{
  if(inputRgCadastro.value.length > 9){
    Swal.fire({
        title: "RG deve conter 9 digitos!",
        icon: "warning",
      });
      inputRgCadastro.value = inputRgCadastro.value.slice(0,9);
  }
 });
//  Valida se CPF tem 11 digitos
 inputCpfCadastro.addEventListener('keyup', ()=>{
  if(inputCpfCadastro.value.length > 11){
    Swal.fire({
        title: "CPF deve conter 11 digitos!",
        icon: "warning",
      });
      inputCpfCadastro.value = inputCpfCadastro.value.slice(0,11);
  }
 });
//  Cadastrar o usúario no Banco de dados
   botaoCadastrar.addEventListener('click', async (event)=>{
    let logo = document.querySelector('#imagemLogo');
    
    logo.src = '../img/loading.gif';
    logo.style.width = '50%'
    event.preventDefault();

    if(!inputNomeCadastro.value){ // Valida nome
      Swal.fire({
        title: "Por favor preencha o campo 'Nome'!",
        icon: "warning",
        confirmButtonColor: "#0275d8",
      });

    logo.src = '../img/logo1.png';
    return ;
    }

    if(!inputRgCadastro.value || inputRgCadastro.value.length != 9){ // Valida RG
      Swal.fire({
        title: "O Campo 'RG' deve conter 9 digitos",
        icon: "warning",
        confirmButtonColor: "#0275d8",
      });
    logo.src = '../img/logo1.png';
    return ;
    }
    if(!inputCpfCadastro.value || inputCpfCadastro.value.length != 11){ // Valida CPF
            Swal.fire({
        title: "O Campo 'CPF' deve conter 11 digitos",
        icon: "warning",
        confirmButtonColor: "#0275d8",
      });
    logo.src = '../img/logo1.png';
    return;
    }

    try {
      const raw = {
        matricula:  await geraMatricula(),
        nome: inputNomeCadastro.value,
        rg: inputRgCadastro.value,
        cpf: inputCpfCadastro.value,
      }
      const requestOptions = {
        method: 'POST',
        body: JSON.stringify(raw),
        redirect: 'follow',
        headers: {
          "Content-Type": "application/json"
        }
    };

    const resposta = await fetch(`${URL}/matriculas`, requestOptions)
    const conteudo = await resposta.json();

    if(conteudo == 'Matricula já cadastrada!'){
      Swal.fire({
        title: "Matrícula já cadastrada. Por favor tente novamente",
        icon: "error",
        confirmButtonColor: "#0275d8",
      });
      logo.src = '../img/logo1.png';
      return
    }
    if(conteudo == 'RG já cadastrado!'){
      Swal.fire({
        title: "RG já cadastrado!",
        icon: "error",
        confirmButtonColor: "#0275d8",
      });
    logo.src = '../img/logo1.png';
      return
    }
    if(conteudo == 'CPF já cadastrado!'){
      Swal.fire({
        title: "CPF já cadastrado!",
        icon: "error",
        confirmButtonColor: "#0275d8",
      });
    logo.src = '../img/logo1.png';
      return
    }

    Swal.fire({
      title: "Cadastro realizado com sucesso!",
      icon: "success",
      confirmButtonColor: "#0275d8",
      html:`O número da sua matrícula é: <h3>${conteudo.matricula}</h3>`
    });
    logo.src = '../img/logo1.png';
  
    // Leva usuario para pagina inicial
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  
    } catch (error) {
      console.log(error);
    logo.src = '../img/logo1.png';
    }
  });