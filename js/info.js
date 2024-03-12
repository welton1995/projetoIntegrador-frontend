const nome = document.querySelector('#nome');
const matricula = document.querySelector('#matricula');
const rg = document.querySelector('#rg');
const cpf = document.querySelector('#cpf');

// PEGANDO OS PARAMETROS VIA URL
const parametros = new URLSearchParams(window.location.search);
const id = parametros.get('id')

const informacoes = async () => {
try {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
};
const resposta = await fetch(`https://conecta.cyclic.app/matriculas/${id}`, requestOptions);
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