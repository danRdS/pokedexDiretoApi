const documento = document.querySelector('html');
const lista = document.querySelector('.lista');
const descricao = document.querySelector('.descricao');
const h3About = document.getElementById('about');
let id = 0;
const popupErroRequest = document.querySelector('.popupErroRequest');
const informacaoDeErro = document.querySelector('.informacaoDeErro');

function alterarFormatoIdParaRequest(){
    let idPokemon = localStorage.idPokemon.replace('#', '');
    if(idPokemon < 10){
        idPokemon = idPokemon.replaceAll('0', '')
        
    } else if(idPokemon < 100 && idPokemon.startsWith('0')){
        idPokemon = idPokemon.replace('0', '');
    } 
    id = idPokemon;
}

alterarFormatoIdParaRequest();

let cor;
const container = document.querySelector('.container');
const elementosValorAtributo = document.querySelectorAll('.valorAtributo');
const elementosBarraDeValorDoAtributo = document.querySelectorAll('.barraDeValorDoAtributo');
let especies = `https://pokeapi.co/api/v2/pokemon-species/${id}/`;

fetch(especies)
.then(response => response.json())
.then(infosDaEspecie => {
    const textoDescricao = (infosDaEspecie.flavor_text_entries[3].flavor_text).toString().replaceAll('\n', ' ').replaceAll( '\f', ' ');
    descricao.innerText = textoDescricao;
})
.catch(err => console.log(err.message));

const secaoTipo = document.querySelector('.secaoTipo');
const peso = document.getElementById('peso');
const altura = document.getElementById('altura');
const ataques = document.querySelector('.ataques');
const tabelaStatus = document.querySelector('.tabelaStatus');
const urlDadosPokemon = `https://pokeapi.co/api/v2/pokemon/${id}`;

fetch(urlDadosPokemon)
.then(response => response.json())
.then(dadosPokemon => {
    popupErroRequest.classList.remove('show');
    localStorage.nomePokemon = dadosPokemon.name;
    let idDoPokemon = dadosPokemon.id;
    const nomePokemonNaBarraTitulo = dadosPokemon.name.charAt(0).toUpperCase() + dadosPokemon.name.slice(1);
    document.title = nomePokemonNaBarraTitulo;

    const mudarIdPraApresentacaoNaTela = id => {
        if(id < 10){
            idDoPokemon = '00' + id;
        } else if(dadosPokemon.id < 100){
            idDoPokemon = '0'+ id;
        }
    }
    mudarIdPraApresentacaoNaTela(dadosPokemon.id);

    const linkImagemPokemon = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${dadosPokemon.id}.png`
    lista.innerHTML += `<li>
                            <a href="../../index.html" class="btnVoltarHome">
                                <i class="fa-solid fa-arrow-left"></i>
                            </a>
                            <h2 translate="no">${dadosPokemon.name}</h2>
                        </li>
                        <li>#${idDoPokemon}</li>
                        <li>
                            <img src="${linkImagemPokemon}">
                            <section class="secaoBtnAnteriorProximo">
                                <button class="btnAnteriorProximo" id="btnAnteriorPokemon">
                                    <i class="fa-solid fa-angle-left"></i>
                                </button>
                                <button class="btnAnteriorProximo" id="btnProximoPokemon">
                                    <i class="fa-solid fa-angle-right"></i>
                                </button>
                            </section>
                        </li>`

    btnAnteriorPokemon.addEventListener('click', () => apresentarPokemonAnterior(id));
    function apresentarPokemonAnterior(indice){
        if(indice > 1){
            indice--;
        } else {
            indice = 150;
        }
        recarregarTelaComNovoPokemon(indice);
    }

    btnProximoPokemon.addEventListener('click', () => apresentarProximoPokemon(id));
    function apresentarProximoPokemon(indice){
        if(indice < 150){
            indice++;
        } else {
            indice = 1;
        }
        recarregarTelaComNovoPokemon(indice);
    }
    
    const recarregarTelaComNovoPokemon = (indice) => {
        id = indice;
        localStorage.idPokemon = id;
        recarregarPagina();
    }

    dadosPokemon.types.map(tipo => {
        secaoTipo.innerHTML += `<span class="tipo">${tipo.type.name}</span>`;
    })
    let spanTipo = document.querySelectorAll('.tipo');

    peso.innerText = `${(dadosPokemon.weight/10).toFixed(1).replace('.', ',')} kg`;
    altura.innerText = `${(dadosPokemon.height/10).toFixed(1).replace('.', ',')} m`;

    dadosPokemon.abilities.map(habilidade => {
        ataques.innerHTML += ` <span class="nomeAtaque">${habilidade.ability.name}</span>`
    })

    for(let posicao = 0; posicao < elementosValorAtributo.length; posicao++){
        let valorDoAtributo = dadosPokemon.stats[posicao].base_stat;
        elementosValorAtributo[posicao].innerHTML = definirCasasDecimaisDoValorAtributoTabela(valorDoAtributo)
        elementosBarraDeValorDoAtributo[posicao].setAttribute('value', valorDoAtributo)
    }
    
    let coresDosTiposDoPokemon = [];
    
    dadosPokemon.types.forEach((tipoDoPokemon, indice) => {
        let tipo = tipoDoPokemon.type.name;
        
        definirCorDoTipo(tipo);
        coresDosTiposDoPokemon.push(cor);
        const corPrimaria = coresDosTiposDoPokemon[0];

        documento.style.backgroundColor = corPrimaria;
        container.style.setProperty('--cor', corPrimaria);
        container.style.setProperty('--corSecundaria', corPrimaria+'aa');
        
        spanTipo[indice].style.backgroundColor = coresDosTiposDoPokemon[indice];
    })   
})
.catch(err => {
    popupErroRequest.classList.add('show');
    informacaoDeErro.innerHTML = err.message;
});

const recarregarPagina = () => location.reload();

function definirCasasDecimaisDoValorAtributoTabela(valorDoAtributo){
    if(valorDoAtributo < 10){
        valorDoAtributo = `00${valorDoAtributo}`;
    } else if(valorDoAtributo < 100){
        valorDoAtributo = `0${valorDoAtributo}`;
    }
    return valorDoAtributo;
}

function definirCorDoTipo(tipo){
    switch(tipo){
        case 'bug':
            tipo = '#a7b723'
            cor = tipo;
            break;
        case 'dark':
            tipo = '#75574c';
            cor = tipo;
            break;
        case 'dragon':
            tipo = '#7037ff';
            cor = tipo;
            break;
        case 'electric':
            tipo = '#f9cf30';
            cor = tipo;
            break;
        case 'fairy':
            tipo = '#e69eac';
            cor = tipo;
            break;
        case 'fighting':
            tipo = '#c12239';
            cor = tipo;
            break;
        case 'fire':
            tipo = '#f57d31';
            cor = tipo;
            break;
        case 'flying':
            tipo = '#a891ec';
            cor = tipo;
            break;
        case 'ghost':
            tipo = '#70559b';
            cor = tipo;
            break;
        case 'normal':
            tipo = '#aaa67f';
            cor = tipo;
            break;        
        case 'grass':
            tipo = '#74cb48';
            cor = tipo;
            break;
        case 'ground':
            tipo = '#dec16b';
            cor = tipo;
            break;
        case 'ice':
            tipo = '#9ad6df';
            cor = tipo;
            break;
        case 'poison':
            tipo = '#a43e9e';
            cor = tipo;
            break;
        case 'psychic':
            tipo = '#fb5584';
            cor = tipo;
            break;
        case 'rock':
            tipo = '#b69e31';
            cor = tipo;
            break;
        case 'steel':
            tipo = '#b7b9d0';
            cor = tipo;
            break;
        case 'water':
            tipo = '#6493eb';
            cor = tipo;
            break;
    }
}