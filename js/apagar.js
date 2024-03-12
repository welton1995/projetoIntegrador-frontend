  const matricula = document.querySelector('#matricula');
  const data = document.querySelector('#datahora');
  const apagar = document.querySelector('#apagar');
  const logo = document.querySelector('#logo');
  const voltar = document.querySelector('#voltar');

  const parametros = new URLSearchParams(window.location.search);
  const id = parametros.get('id')
  const matriculaURL = parametros.get('matricula')
  const dataURL = parametros.get('data')
  const dataFormatada = new Date(dataURL)
  const dataCorreta = dataFormatada.toLocaleDateString('pt-BR', {timeZone: 'UTC', year: 'numeric', month:'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'});
  matricula.value = matriculaURL;
  data.value = dataCorreta;
  
  apagar.addEventListener('click', async (event)=>{
    try {
      event.preventDefault();
        logo.src='../img/loading.gif';
        const requestOptions = {
          method: 'DELETE',
          redirect: 'follow',
          headers: {
            "Content-Type": "application/json"
          }
      };
      const resposta = await fetch(`https://projetointegrador.cyclic.app/entradas/${id}`, requestOptions);
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
  })


