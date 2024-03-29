const inicio = document.querySelector('#inicio');
const fim = document.querySelector('#fim');
const buscar = document.querySelector('#buscar');
const limpar = document.querySelector('#limpar');
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
            title: "Data final é menor que data inicial",
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
          
          console.log(conteudo)

          conteudo.reverse().forEach((entrada)=>{
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
                <a href="html/apagar.html?matricula=${entrada.matricula}&id=${entrada._id}&data=${entrada.data}&observacao=${entrada.observacao}" class="btn btn-outline-secondary mb-1">🗑️</i></a>
                <a href="html/info.html?id=${entrada.matricula}" class="btn btn-outline-secondary mb-1">⚙️</a>
            </td>
            `
            tabela.appendChild(tr);
      
      
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


console.log('Hello World!');