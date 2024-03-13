// Busca CPF
const botaoBuscaCpf = document.querySelector('#btnBuscarCpf');
const inputBuscaCpf = document.querySelector('#inputBuscarCpf');
// Cadastra usuario
const inputNomeCadastro = document.querySelector('#nomeCadastro');
const inputRgCadastro = document.querySelector('#rgCadastro');
const inputCpfCadastro = document.querySelector('#cpfCadastro');
const botaoCadastrar = document.querySelector('#cadastrar');
// Editar registro
// const inputMatriculaEditar = document.querySelector('#matriculaEditar');
// const inputDataEditar = document.querySelector('#datahoraEditar');
// const inputObservarcaoEditar = document.querySelector('#observacaoEditar');
// const botaoEditar = document.querySelector('#editar');
// Registrar Acesso
const botaoAcessar = document.querySelector('#registrar');
const matriculaAcessar = document.querySelector('#matricula');
const dataAcessar = document.querySelector('#datahora');
const observacaoAcessar = document.querySelector('#observacao');

// -------- RELATORIO DE ACESSO -----------------
// Busca registros no Banco de dados 'GET'
const buscaRegistros = async () => {
  let tabela = document.querySelector('#tabela');
  let bancodeDadosVazio = document.querySelector('#bancodeDadosVazio');
  let imagemLoading = document.querySelector('#loading');

  try {

    imagemLoading.style.display = 'block';

      const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    const resposta = await fetch(`https://projetointegrador.cyclic.app/entradas`, requestOptions)
    const conteudo = await resposta.json();
    console.log(conteudo) 
    conteudo.entradas.reverse().forEach((entrada)=>{
      const dataFormatada = new Date(entrada.data);
      const dataCorreta = dataFormatada.toLocaleDateString('pt-BR', {timeZone: 'UTC', year: 'numeric', month:'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'});
      const tabela = document.querySelector('#tabela');
      const tr = document.createElement('tr');
      tr.innerHTML = `

      <td class='text-center'>${entrada.matricula}</td>
      <td class="text-center">${dataCorreta}</td>
      <td class="text-center">${entrada.observacao}</td>
      <td  class="text-center">
          <a href="html/baixar.html?id=${entrada._id}&matricula=${entrada.matricula}&observacao=${entrada.observacao}&data=${entrada.data}" class="btn btn-outline-secondary mb-1">💾</a>
          <a href="html/editar.html?id=${entrada._id}&matricula=${entrada.matricula}" class="btn btn-outline-secondary mb-1">✏️</a>
          <a href="html/apagar.html?matricula=${entrada.matricula}&id=${entrada._id}&data=${entrada.data}&observacao=${entrada.observacao}" class="btn btn-outline-secondary mb-1">🗑️</i></a>
          <a href="html/info.html?id=${entrada.matricula}" class="btn btn-outline-secondary mb-1">⚙️</a>
      </td>
      `
      tabela.appendChild(tr);


      bancodeDadosVazio.style.display = 'none';
      
      
    });
    
    imagemLoading.style.display = 'none';
  } catch (error) {
    console.log(error);
    imagemLoading.style.display = 'block';
    return;
  }
}
buscaRegistros();

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
  const resposta = await fetch(`https://projetointegrador.cyclic.app/matriculas/cpf/${inputBuscaCpf.value}`, requestOptions);
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
    
    logo.src = './img/loading.gif';
    logo.style.width = '50%'
    event.preventDefault();

    if(!inputNomeCadastro.value){ // Valida nome
      Swal.fire({
        title: "Por favor preencha o campo 'Nome'!",
        icon: "warning",
      });

    logo.src = './img/logo1.png';
    return ;
    }

    if(!inputRgCadastro.value || inputRgCadastro.value.length != 9){ // Valida RG
      Swal.fire({
        title: "O Campo 'RG' deve conter 9 digitos",
        icon: "warning",
      });

    logo.src = './img/logo1.png';
    return ;
    }
    if(!inputCpfCadastro.value || inputCpfCadastro.value.length != 11){ // Valida CPF
            Swal.fire({
        title: "O Campo 'CPF' deve conter 11 digitos",
        icon: "warning",
      });
 
    logo.src = './img/logo1.png';
    return;
    }


    try {
      // Função que gera um número aleatório de matrícula
      function gerarMatricula() {
        let numero = Math.floor(Math.random() * 1000000);
        numero = numero.toString().padStart(6, '0');
        return numero;
      }

      const raw = {
        matricula: gerarMatricula(),
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

    const resposta = await fetch(`https://projetointegrador.cyclic.app/matriculas`, requestOptions)
    const conteudo = await resposta.json();

    if(conteudo == 'Matricula já cadastrada!'){
      Swal.fire({
        title: "Matrícula já cadastrada. Por favor tente novamente",
        icon: "error",
      });
      logo.src = './img/logo1.png';
      return
    }
    if(conteudo == 'RG já cadastrado!'){
      Swal.fire({
        title: "RG já cadastrado!",
        icon: "error",
      });
    logo.src = './img/logo1.png';
      return
    }
    if(conteudo == 'CPF já cadastrado!'){
      Swal.fire({
        title: "CPF já cadastrado!",
        icon: "error",
      });
    logo.src = './img/logo1.png';
      return
    }

    Swal.fire({
      title: "Cadastro realizado com sucesso!",
      icon: "success",
      html:`O número da sua matrícula é: <h3>${conteudo.matricula}</h3>`
    });
    logo.src = './img/logo1.png';

  
    // Leva usuario para pagina inicial
    setTimeout(() => {
      window.location.reload();
    }, 5000);
  
    } catch (error) {
      console.log(error);
    logo.src = './img/logo1.png';
    }
  });

// ------------ ACESSAR ---------------------
// Valida campo matricula
matriculaAcessar.addEventListener('keyup', ()=> {
  if(matriculaAcessar.value.length > 6){
    Swal.fire({
      title: "CPF deve conter 11 digitos!",
      icon: "info",
    });
   matriculaAcessar.value = matriculaAcessar.value.slice(0,6)
  }
})


// Registra acesso
botaoAcessar.addEventListener('click', async (event) => {
  event.preventDefault();
  try {
    if(!matriculaAcessar.value || matriculaAcessar.value.length != 6){
      Swal.fire({
        title: "Matrícula deve conter 6 digitos!",
        icon: "info"
      });
      // document.querySelector("#logo").style.display = "none";
      return
    }

    if(!dataAcessar.value){
      Swal.fire({
        title: "Por favor preencha o campo Data",
        icon: "info",
      });
      observacao.focus();
    //  document.querySelector("#logo").style.display = "none";
      return 
    }

    const raw = {
      matricula: matriculaAcessar.value,
      data: dataAcessar.value,
      observacao: observacaoAcessar.value
    }
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(raw),
      redirect: 'follow',
      headers: {
        "Content-Type": "application/json"
      }
  };

  const resposta = await fetch(`https://projetointegrador.cyclic.app/entradas`, requestOptions)
  const conteudo = await resposta.json();

  if(conteudo == 'Matrícula não cadastrada!'){
    Swal.fire({
      title: "Matricula não encontrada! Por favor cadastre-se!",
      icon: "error"
    });
    document.querySelector("#logo").style.display = "none";
    return ;
  }

  if(conteudo == 'Matrícula cadastrada com sucesso!'){
    Swal.fire({
      title: "Acesso registrado com sucesso",
      icon: "success"
    });
    // document.querySelector("#logo").style.display = "none";
  }

  setTimeout(() => {
    window.location.reload();
  }, 2000);

    
  } catch (error) {
    console.log(error);
  }
})


