const inicio = document.querySelector('#inicio');
const fim = document.querySelector('#fim');
const buscar = document.querySelector('#buscar');
const limpar = document.querySelector('#limpar');
const semana = document.querySelector('#semana');
const mes = document.querySelector('#mes');
const ano = document.querySelector('#ano');

// Busca CPF
const botaoBuscaCpf = document.querySelector('#btnBuscarCpf');
const inputBuscaCpf = document.querySelector('#inputBuscarCpf');

// Cadastra usuario
const inputNomeCadastro = document.querySelector('#nomeCadastro');
const inputRgCadastro = document.querySelector('#rgCadastro');
const inputCpfCadastro = document.querySelector('#cpfCadastro');
const botaoCadastrar = document.querySelector('#cadastrar');

// URL API
const URL = 'https://projetointegrador.cyclic.app';

// Funcao Busca data especifica
buscar.addEventListener('click', async (event) => {
    if(!inicio.value || !fim.value){
        Swal.fire({
            title: "Por favor preencha os campos corretamente!",
            icon: "warning",
            confirmButtonColor: "#0275d8",
          });
          return;
    }
    if(fim.value < inicio.value){
        Swal.fire({
            title: "Data final é menor que data inicial!",
            icon: "warning",
            confirmButtonColor: "#0275d8",
          });
    }
    try {
        event.preventDefault();
        const raw = {
            inicio: inicio.value,
            fim: fim.value,
          }

          const requestOptions = {
            method: 'POST',
            redirect: 'follow',
            body: JSON.stringify(raw),
            headers:  {
              "Content-Type": "application/json"
            }
          };
          
          const resposta = await fetch(`${URL}/entradas/data`, requestOptions);
          const conteudo = await resposta.json();

          if(conteudo.length == 0){
            Swal.fire({
              title: `${conteudo.length} registro(s) encontrados!`,
              icon: "success",
              confirmButtonColor: "#0275d8",
            });
            return;
          }
          
          console.log(conteudo)

          conteudo.reverse().forEach((entrada)=>{
            const dataFormatada = new Date(entrada.data);
            const dataCorreta = dataFormatada.toLocaleDateString('pt-BR', {timeZone: 'UTC', year: 'numeric', month:'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'});
            const tabela = document.querySelector('#tabela');
            const tr = document.createElement('tr');
            tr.innerHTML = `
      
            <td class='text-center'><a href="./baixar.html?id=${entrada._id}&matricula=${entrada.matricula}&observacao=${entrada.observacao}&data=${entrada.data}">${entrada.matricula}</a></td>
            <td class="text-center"><a href="./baixar.html?id=${entrada._id}&matricula=${entrada.matricula}&observacao=${entrada.observacao}&data=${entrada.data}">${dataCorreta}</a></td>
            <td class="text-center"><a href="./baixar.html?id=${entrada._id}&matricula=${entrada.matricula}&observacao=${entrada.observacao}&data=${entrada.data}">${entrada.observacao}</a></td>
            <td  class="text-center">
                <a href="./baixar.html?id=${entrada._id}&matricula=${entrada.matricula}&observacao=${entrada.observacao}&data=${entrada.data}" class="btn btn-outline-secondary mb-1">💾</a>
                <a href="./apagar.html?matricula=${entrada.matricula}&id=${entrada._id}&data=${entrada.data}&observacao=${entrada.observacao}" class="btn btn-outline-secondary mb-1">🗑️</i></a>
                <a href="./info.html?id=${entrada.matricula}" class="btn btn-outline-secondary mb-1">⚙️</a>
            </td>
            `
            tabela.appendChild(tr);
      
            Swal.fire({
              title: `${conteudo.length} registro(s) encontrados!`,
              icon: "success",
              confirmButtonColor: "#0275d8",
            });
      
            bancodeDadosVazio.style.display = 'none';
            
          });

    } catch (error) {
        console.log(error);
    }
});

// Funcao Busca ultima semana
semana.addEventListener('click', async(event) => {
  try {
    event.preventDefault();
    limparTabela();
      const requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers:  {
          "Content-Type": "application/json"
        }
      };
      
      const resposta = await fetch(`${URL}/entradas/semana`, requestOptions);
      const conteudo = await resposta.json();

      if(conteudo.length == 0){
        Swal.fire({
          title: `${conteudo.length} registro(s) encontrados na última semana!`,
          icon: "success",
          confirmButtonColor: "#0275d8",
        });
        return;
      }
      
      console.log(conteudo);

      conteudo.reverse().forEach((entrada)=>{
        const dataFormatada = new Date(entrada.data);
        const dataCorreta = dataFormatada.toLocaleDateString('pt-BR', {timeZone: 'UTC', year: 'numeric', month:'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'});
        const tabela = document.querySelector('#tabela');
        const tr = document.createElement('tr');
        tr.innerHTML = `
  
        <td class='text-center'><a href="./baixar.html?id=${entrada._id}&matricula=${entrada.matricula}&observacao=${entrada.observacao}&data=${entrada.data}">${entrada.matricula}</a></td>
        <td class="text-center"><a href="./baixar.html?id=${entrada._id}&matricula=${entrada.matricula}&observacao=${entrada.observacao}&data=${entrada.data}">${dataCorreta}</a></td>
        <td class="text-center"><a href="./baixar.html?id=${entrada._id}&matricula=${entrada.matricula}&observacao=${entrada.observacao}&data=${entrada.data}">${entrada.observacao}</a></td>
        <td  class="text-center">
            <a href="./baixar.html?id=${entrada._id}&matricula=${entrada.matricula}&observacao=${entrada.observacao}&data=${entrada.data}" class="btn btn-outline-secondary mb-1">💾</a>
            <a href="./apagar.html?matricula=${entrada.matricula}&id=${entrada._id}&data=${entrada.data}&observacao=${entrada.observacao}" class="btn btn-outline-secondary mb-1">🗑️</i></a>
            <a href="./info.html?id=${entrada.matricula}" class="btn btn-outline-secondary mb-1">⚙️</a>
        </td>
        `
        tabela.appendChild(tr);
  
        Swal.fire({
          title: `${conteudo.length} registro(s) encontrados na última semana!`,
          icon: "success",
          confirmButtonColor: "#0275d8",
        });
  
        bancodeDadosVazio.style.display = 'none';
      });

} catch (error) {
    console.log(error);
}

});

// Funcao Busca ultimo mes
mes.addEventListener('click', async(event) => {
  try {
    event.preventDefault();
    limparTabela();
      const requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers:  {
          "Content-Type": "application/json"
        }
      };
      
      const resposta = await fetch(`${URL}/entradas/mes`, requestOptions);
      const conteudo = await resposta.json();

      if(conteudo.length == 0){
        Swal.fire({
          title: `${conteudo.length} registro(s) encontrados no último mês!`,
          icon: "success",
          confirmButtonColor: "#0275d8",
        });
        return;
      }
      
      console.log(conteudo);

      conteudo.reverse().forEach((entrada)=>{
        const dataFormatada = new Date(entrada.data);
        const dataCorreta = dataFormatada.toLocaleDateString('pt-BR', {timeZone: 'UTC', year: 'numeric', month:'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'});
        const tabela = document.querySelector('#tabela');
        const tr = document.createElement('tr');
        tr.innerHTML = `
  
        <td class='text-center'><a href="./baixar.html?id=${entrada._id}&matricula=${entrada.matricula}&observacao=${entrada.observacao}&data=${entrada.data}">${entrada.matricula}</a></td>
        <td class="text-center"><a href="./baixar.html?id=${entrada._id}&matricula=${entrada.matricula}&observacao=${entrada.observacao}&data=${entrada.data}">${dataCorreta}</a></td>
        <td class="text-center"><a href="./baixar.html?id=${entrada._id}&matricula=${entrada.matricula}&observacao=${entrada.observacao}&data=${entrada.data}">${entrada.observacao}</a></td>
        <td  class="text-center">
            <a href="./baixar.html?id=${entrada._id}&matricula=${entrada.matricula}&observacao=${entrada.observacao}&data=${entrada.data}" class="btn btn-outline-secondary mb-1">💾</a>
            <a href="./apagar.html?matricula=${entrada.matricula}&id=${entrada._id}&data=${entrada.data}&observacao=${entrada.observacao}" class="btn btn-outline-secondary mb-1">🗑️</i></a>
            <a href="./info.html?id=${entrada.matricula}" class="btn btn-outline-secondary mb-1">⚙️</a>
        </td>
        `
        tabela.appendChild(tr);
  
        Swal.fire({
          title: `${conteudo.length} registro(s) encontrados no último mês!`,
          icon: "success",
          confirmButtonColor: "#0275d8",
        });
  
        bancodeDadosVazio.style.display = 'none';
      });

} catch (error) {
    console.log(error);
}

});

// Funcao Busca ultimo ano
ano.addEventListener('click', async(event) => {
  try {
    event.preventDefault();
    limparTabela();
      const requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers:  {
          "Content-Type": "application/json"
        }
      };
      
      const resposta = await fetch(`${URL}/entradas/ano`, requestOptions);
      const conteudo = await resposta.json();

      if(conteudo.length == 0){
        Swal.fire({
          title: `${conteudo.length} registro(s) encontrados no último ano!`,
          icon: "success",
          confirmButtonColor: "#0275d8",
        });
        return;
      }
      
      console.log(conteudo);

      conteudo.reverse().forEach((entrada)=>{
        const dataFormatada = new Date(entrada.data);
        const dataCorreta = dataFormatada.toLocaleDateString('pt-BR', {timeZone: 'UTC', year: 'numeric', month:'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'});
        const tabela = document.querySelector('#tabela');
        const tr = document.createElement('tr');
        tr.innerHTML = `
  
        <td class='text-center'><a href="./baixar.html?id=${entrada._id}&matricula=${entrada.matricula}&observacao=${entrada.observacao}&data=${entrada.data}">${entrada.matricula}</a></td>
        <td class="text-center"><a href="./baixar.html?id=${entrada._id}&matricula=${entrada.matricula}&observacao=${entrada.observacao}&data=${entrada.data}">${dataCorreta}</a></td>
        <td class="text-center"><a href="./baixar.html?id=${entrada._id}&matricula=${entrada.matricula}&observacao=${entrada.observacao}&data=${entrada.data}">${entrada.observacao}</a></td>
        <td  class="text-center">
            <a href="./baixar.html?id=${entrada._id}&matricula=${entrada.matricula}&observacao=${entrada.observacao}&data=${entrada.data}" class="btn btn-outline-secondary mb-1">💾</a>
            <a href="./apagar.html?matricula=${entrada.matricula}&id=${entrada._id}&data=${entrada.data}&observacao=${entrada.observacao}" class="btn btn-outline-secondary mb-1">🗑️</i></a>
            <a href="./info.html?id=${entrada.matricula}" class="btn btn-outline-secondary mb-1">⚙️</a>
        </td>
        `
        tabela.appendChild(tr);
  
        Swal.fire({
          title: `${conteudo.length} registro(s) encontrados no último ano!`,
          icon: "success",
          confirmButtonColor: "#0275d8",
        });
  
        bancodeDadosVazio.style.display = 'none';
      });

} catch (error) {
    console.log(error);
}

});

// Funcao limpar campos
limpar.addEventListener('click', () => {
    try {
        window.location.reload();
    } catch (error) {
        console.log(error);
    }
});

const limparTabela = () => {
  try {
    let tabela = document.querySelector('#tabela');
    tabela.innerHTML = ``
  } catch (error) {
    console.log(error);
  }
}

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