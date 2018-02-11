const {ipcRenderer} = require('electron');
const timer = require('./timer');
data = require('../../data');

let linkSobre = document.querySelector('#link-sobre');
let botaoPlay = document.querySelector('.botao-play');
let tempo = document.querySelector('.tempo');
let curso = document.querySelector('.curso');

/**
 * Tratamento do Clique de Sobre
 */
linkSobre.addEventListener('click', function () {
    ipcRenderer.send('abrir-janela-sobre');
});

/**
 * Tratamento do clique de Play
 * @type {[string,string]}
 */
let imgs = ['img/play-button.svg', 'img/stop-button.svg'];
let play = false;
botaoPlay.addEventListener('click', () => {
    if(play === true){
        timer.parar(curso.textContent);
        play = false;
    }
    else{
        timer.iniciar(tempo);
        play = true;
    }
    imgs = imgs.reverse();
    botaoPlay.src = imgs[0];
});

window.onload = () =>{
    data.getDadosCurso(curso.textContent).then((dados)=>{
        tempo.textContent = dados.tempo;
    });
};