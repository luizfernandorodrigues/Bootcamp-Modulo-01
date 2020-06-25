//variaveis de controle da aplicação
let totalSexoMasculino = 0;
let totalSexoFeminino = 0;
let somaIdade = 0;
let mediaIdade = 0;
let usuarios = [];
let usuariosFiltrados = [];
let divListaUsuarios = null;
let divEstatistica = null;
let busca = null;
let botaoBusca = null;
let quantidadeUsuariosFiltrados = 0;
let tituloEstatistica = null;
let formatoNumerico = null;

//inicia a chamada a API e carrega os usuarios
window.addEventListener('load', () => {
  divEstatistica = document.querySelector('#divEstatistica');
  divListaUsuarios = document.querySelector('#divListaUsuarios');
  busca = document.querySelector('#busca');
  botaoBusca = document.querySelector('#btnBusca');
  quantidadeUsuariosFiltrados = document.querySelector('#quantidadeUsuarios');
  tituloEstatistica = document.querySelector('#tituloEstatistica');

  formatoNumerico = Intl.NumberFormat('pt-BR');

  //insere evento no botao e no input
  botaoBusca.addEventListener('click', realizaFiltro);
  busca.addEventListener('keyup', filtroEnter);

  buscaUsuarios();
});

async function buscaUsuarios() {
  const response = await fetch(
    'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo'
  );
  const json = await response.json();
  usuarios = json.results.map((usuario) => {
    const nomeCompleto = usuario.name.first + ' ' + usuario.name.last;
    const idade = usuario.dob.age;
    const sexo = usuario.gender;
    const imagem = usuario.picture.large;

    return {
      nome: nomeCompleto,
      idade,
      sexo,
      imagem,
    };
  });
}

function realizaFiltro() {
  renderizaFiltro(busca.value);
}

function filtroEnter(evento) {
  let textoDigitado =
    !!evento.target.value && evento.target.value.trim() !== '';

  if (evento.key === 'Enter') {
    renderizaFiltro(busca.value);
  }
}

function renderiza() {}

function renderizaFiltro(chaveBusca) {
  usuariosFiltrados = usuarios;

  usuariosFiltrados = usuariosFiltrados.filter((usuario) => {
    return usuario.nome.toLowerCase().includes(chaveBusca.toLowerCase());
  });

  usuariosFiltrados.sort((a, b) => {
    return a.nome.localeCompare(b.nome);
  });

  somaIdade = usuariosFiltrados.reduce((acumulador, itemCorrente) => {
    return acumulador + itemCorrente.idade;
  }, 0);

  let usuariosHtml = '<div>';

  var quantidade = 0;
  usuariosFiltrados.forEach((usuario) => {
    const { nome, idade, sexo, imagem } = usuario;

    if (sexo === 'male') {
      totalSexoMasculino++;
    } else {
      totalSexoFeminino++;
    }

    quantidade++;
    const usuarioHtml = `
      <div class='usuario'>
        <div>
          <img src="${imagem}" alt="${nome}">
          <span>${nome}${', '}${idade}</span>
        </div>
        <div>
          
        </div>
      </div>
    `;
    usuariosHtml += usuarioHtml;
  });

  quantidadeUsuariosFiltrados.textContent = quantidade;
  let mediaLocal = somaIdade / quantidade;
  mediaIdade = formataNumero(mediaLocal.toFixed(2));

  const htmlEstatistica = `
  <ul>
    <li>Sexo Masculino: <span>${totalSexoMasculino}</span></li>
    <li>Sexo Feminino: <span>${totalSexoFeminino}</span></li>
    <li>Soma das idades: <span>${somaIdade}</span></li>
    <li>Média das idades: <span>${mediaIdade}</span></li>
  </ul>`;

  tituloEstatistica.textContent = 'Estatísticas';
  divEstatistica.innerHTML = htmlEstatistica;
  usuariosHtml += '</div>';
  divListaUsuarios.innerHTML = usuariosHtml;

  totalSexoFeminino = 0;
  totalSexoMasculino = 0;
}

function formataNumero(numero) {
  return formatoNumerico.format(numero);
}
