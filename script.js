const personagem = {
  blusa: '',
  calca: '',
  acessorios: []
};

let categoriaAtual = 'blusa';

function selecionarCategoria(categoria) {
  categoriaAtual = categoria;
  atualizarBordaCategorias();
  mostrarOpcoes();
}

function atualizarBordaCategorias() {
  const categorias = ['blusa', 'calca', 'acessorio'];
  categorias.forEach(cat => {
    let elementoId = '';
    if (cat === 'blusa') elementoId = 'blusaroupa';
    else if (cat === 'calca') elementoId = 'calcaroupa';
    else if (cat === 'acessorio') elementoId = 'chapeuroupa';

    const elemento = document.getElementById(elementoId);
    if (!elemento) return;

    if (cat === categoriaAtual) {
      elemento.classList.add('selecionado');
    } else {
      elemento.classList.remove('selecionado');
    }
  });
}


function mostrarOpcoes() {
  const opcoesDiv = document.getElementById('opcoes-itens');
  opcoesDiv.innerHTML = ''; // limpa as opções anteriores

  const opcoes = {
    blusa: ['blusa1.png', 'blusa2.png', 'blusa3.png'],
    calca: ['calca1.png', 'calca2.png', 'calca3.png'],
    acessorio: ['chapeu1.png', 'chapeu2.png', 'chapeu3.png']
  };

  opcoes[categoriaAtual].forEach(item => {
    const img = document.createElement('img');

    // exemplo: prévia e personagem em pastas diferentes
    const previewSrc = `images/${categoriaAtual}s/previews/${item}`;
    const personagemSrc = `images/${categoriaAtual}s/${item}`;

    img.src = previewSrc;  // o que vai aparecer como opção
    img.dataset.personagem = personagemSrc;  // o que vai aplicar no personagem

    img.classList.add('opcao-img');

    img.onclick = () => selecionarRoupa(categoriaAtual, img.dataset.personagem);

    opcoesDiv.appendChild(img);
  });
}


function selecionarRoupa(tipo, src) {
  if (tipo === 'acessorio') {
    if (!personagem.acessorios.includes(src)) {
      personagem.acessorios.push(src);
    } else {
      personagem.acessorios = personagem.acessorios.filter(item => item !== src);
    }
  } else {
    personagem[tipo] = src;
  }
  atualizarVisual();
}

function atualizarVisual() {
  const blusaImg = document.getElementById('personagem-blusa');
  const calcaImg = document.getElementById('personagem-calca');
  const acessorioContainer = document.getElementById('personagem-acessorios');

  // Atualiza blusa
  if (personagem.blusa) {
    blusaImg.src = personagem.blusa;
    blusaImg.style.display = 'block';
  } else {
    blusaImg.style.display = 'none';
  }

  // Atualiza calça
  if (personagem.calca) {
    calcaImg.src = personagem.calca;
    calcaImg.style.display = 'block';
  } else {
    calcaImg.style.display = 'none';
  }

  // Limpa os acessórios antigos
  acessorioContainer.innerHTML = '';

  // Adiciona todos os acessórios selecionados
  personagem.acessorios.forEach(src => {
    const acessorioImg = document.createElement('img');
    acessorioImg.src = src;
    acessorioImg.classList.add('acessorio'); // se quiser estilizar
    acessorioContainer.appendChild(acessorioImg);
  });
}



// conectar os cliques dos ícones das categorias
document.getElementById('blusaroupa').addEventListener('click', () => selecionarCategoria('blusa'));
document.getElementById('calcaroupa').addEventListener('click', () => selecionarCategoria('calca'));
document.getElementById('chapeuroupa').addEventListener('click', () => selecionarCategoria('acessorio'));

// inicializa mostrando as opções da categoria padrão
selecionarCategoria(categoriaAtual);
