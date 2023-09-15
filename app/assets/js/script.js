const form = document.querySelector('form');
form.addEventListener('submit', e => e.preventDefault());

const container = document.querySelector('.container');
const listaPokemonRenderizada = document.querySelector('.lista');
const popup = document.querySelector('.popup');
const informacaoDeErro = document.querySelector('.informacaoDeErro');

async function requisitarPokemos(){
    try{
        let listagemPokemon = [];
        
        for(let indicePokemon = 1; indicePokemon <= 150; indicePokemon++){
            const responsePokemons1 = await fetch(`https://pokeapi.co/api/v2/pokemon/${indicePokemon}`);

            // teste
            if(!responsePokemons1.ok){
                throw new Error(`HTTP error, status ${responsePokemons1.status}`);
            }
            // fim teste
            const dadosPokemon = await responsePokemons1.json();
            let linkImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${indicePokemon}.png`;
            popup.classList.remove('show');

            const pokemon = {
                nome: dadosPokemon.name,
                id: definirApresentacaoIdPokemon(dadosPokemon.id),
                imagem: linkImg
            };
            
            function definirApresentacaoIdPokemon(id){
                if(id < 10){
                    id = '00' + id;
                } else if(id < 100){
                    dadosPokemon.id = '0' + id;
                    id = '0' + id;
                }
                return id;
            }

            listagemPokemon.push(pokemon);
        }
        montaElementos(listagemPokemon, listaPokemonRenderizada);

        const elementosListaPokemonRenderizada = document.querySelectorAll('.lista li');
        elementosListaPokemonRenderizada.forEach(elemento => {
            elemento.addEventListener('click', () => {
                let filho = elemento.children;
                for(let pokemon of filho){
                    localStorage.nomePokemon = pokemon.lastElementChild.innerText;
                    localStorage.idPokemon = pokemon.firstElementChild.innerText;
                }
            })
        })

        window.onscroll = () => scrollFunction();

        function scrollFunction(){
            if(document.body.scrollTop > 30 || document.documentElement.scrollTop > 30){
                toTop.classList.add('showToTop');
            } else {
                toTop.classList.remove('showToTop');
            }
        }
        
    } catch(err){
        document.getElementById('loader').style.display = 'none';
        popup.classList.add('show');
        informacaoDeErro.innerHTML = err.message;
    }
}

function topFuntion(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

const recarregarPagina = () => location.reload();

requisitarPokemos();

const inputPesquisaPokemon = document.getElementById('valorDeBusca');
const infoSemResultadosBusca = document.querySelector('.infoSemResultadosBusca');

const search = (inputPesquisaPokemon, mensagemSemResultadosDeBusca, listaPokemonRenderizada) => {
    const elementosListaPokemonRenderizada = document.querySelectorAll('.lista li');
    let valorBuscaDigitadoPeloUsuario = inputPesquisaPokemon.value;
    let temResultadoBusca = false;

    elementosListaPokemonRenderizada.forEach(item => {
        if(item.innerText.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(valorBuscaDigitadoPeloUsuario.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''))){
            item.style.display = 'block';
            temResultadoBusca = true;
            listaPokemonRenderizada.style.display = 'flex';
            mensagemSemResultadosDeBusca.style.display = 'none';
        } else {
            item.style.display = 'none';
        }
    })

    if(!temResultadoBusca){
        mensagemSemResultadosDeBusca.style.display = 'block';
        mensagemSemResultadosDeBusca.innerHTML = `Nenhum resultado encontrado para "${valorBuscaDigitadoPeloUsuario}"`;
    }
};

function montaElementos(listagemPokemon, listaPokemonRenderizada){
    document.getElementById('loader').style.display = 'none';
    const pokemons = listagemPokemon.map(pokemon => {
        return `<li>
                    <a href="#0" onclick="abrirDetalhesPokemon()" class="optionPokemon">
                        <span class="spanId">#${pokemon.id}</span> 
                        <img class="imgPokemon" src="${pokemon.imagem}">
                        <p class="nomePokemon" translate="no">${pokemon.nome}</p>
                    </a>
                </li>`
    })
    listaPokemonRenderizada.innerHTML = `${pokemons.join('')}`;
}

function abrirDetalhesPokemon(){
    setTimeout(() => {
        location.href = 'app/secondView/infosPokemon.html';
    });
}

const btnResetPesquisa = document.getElementById('btnResetPesquisa');

btnResetPesquisa.addEventListener('click', () => {
    document.getElementById('loader').style.display = 'block';
    requisitarPokemos();
    escondeInfoErroBusca(infoSemResultadosBusca);
})

const escondeInfoErroBusca = semResultados => {
    semResultados.style.display = 'none';
}

const btnParametroPesquisa = document.getElementById('btnParametroPesquisa');
const backgroundMenuPesquisa = document.querySelector('.backgroundMenuPesquisa');
const campoMenuPesquisa = document.querySelector('.campoMenuPesquisa');

const mudarFormaPesquisa = () => {
    campoMenuPesquisa.classList.toggle('visible');
    backgroundMenuPesquisa.classList.toggle('visible');
}

backgroundMenuPesquisa.addEventListener('click', () => {
    mudarFormaPesquisa();
})

const buscaPorId = document.getElementById('buscaPorId');
const buscaPorNome = document.getElementById('buscaPorNome');

buscaPorId.addEventListener('click', () => mudarValorBotaoPesquisa(inputPesquisaPokemon));
buscaPorNome.addEventListener('click', () => mudarValorBotaoPesquisa(inputPesquisaPokemon));

window.onload = () => {
    let indicadorBtnParametroPesquisa = localStorage.indicadorBtnParametroPesquisa;
    if(indicadorBtnParametroPesquisa == 'A'){
        buscaPorNome.checked = true;
        mudarValorBotaoPesquisa(inputPesquisaPokemon);
    }
}

function mudarValorBotaoPesquisa(inputPesquisaPokemon){
    if(buscaPorNome.checked){
        localStorage.indicadorBtnParametroPesquisa = 'A';
        btnParametroPesquisa.innerText = 'A';
        btnParametroPesquisa.style.textDecoration = 'underline';
        btnParametroPesquisa.setAttribute('translate', 'no');
        inputPesquisaPokemon.setAttribute('type', 'text');
        inputPesquisaPokemon.setAttribute('onkeypress', "if (isNaN(String.fromCharCode(window.event.keyCode))) return true; else return false;")
    } else {
        btnParametroPesquisa.innerText = '#';
        localStorage.indicadorBtnParametroPesquisa = '#';
        btnParametroPesquisa.style.textDecoration = 'none';
        inputPesquisaPokemon.setAttribute('type', 'number');
        inputPesquisaPokemon.removeAttribute('onkeypress');
    }
}