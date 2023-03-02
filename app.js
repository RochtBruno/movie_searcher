const nomeBusca = document.querySelector('.input');
const mensagemErro = document.querySelector('#mensagemErro');
const btnBuscar = document.querySelector('#botao_buscar');
const titulo = document.querySelector('#titulo');
const sinopse = document.querySelector('#sinopse');
const ano = document.querySelector('#ano');
const duracao = document.querySelector('#duracao');
const genero = document.querySelector('#genero');
const elenco = document.querySelector('#atores');
const diretor = document.querySelector('#diretor');
const poster = document.querySelector('.poster')

const apiKey = "95bb205a";
const imgDefault = "./default_image.png";

async function buscaFilme(nomeBusca){
     const resposta = await fetch(`http://www.omdbapi.com/?t=${nomeBusca}&apikey=${apiKey}`);
     return resposta.json();
}


btnBuscar.addEventListener('click', ()=>{
     limparCampos();
     core();
})

async function core(){
     try{
          const filme = await buscaFilme(nomeBusca.value);
          defineValores(filme);
          validarFilme(filme)
     }catch(error){
          console.log(error);
          mensagemErro.textContent = `${error}`
          limparCampos()
     }
    
}

function limparCampos(){
     titulo.textContent = '';
     sinopse.textContent = '';
     ano.textContent = '';
     duracao.textContent = '';
     genero.textContent = '';
     elenco.textContent = '';
     diretor.textContent = '';
     poster.setAttribute('src',imgDefault)

}

function defineValores(filme){
     titulo.textContent = filme.Title;
     sinopse.textContent = `Plot: ${filme.Plot}`;
     ano.textContent = `Year: ${filme.Year}`;
     duracao.textContent = `RunTime: ${filme.RunTime}`;
     genero.textContent = `Genre : ${filme.Genre}`;
     elenco.textContent = `Actors : ${filme.Actors}`;
     diretor.textContent = `Director : ${filme.Director}`;
     poster.setAttribute('src',filme.Poster)

}

function validarFilme(filme){
     if(filme.Plot === undefined || filme.RunTime === undefined|| filme.Year === undefined){
          throw new Error('Filme não encontrado')
     }
}
