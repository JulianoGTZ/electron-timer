const {ipcRenderer} = require('electron');
const timer = require('./timer');
data = require('../../data');

let linkSobre = document.querySelector('#link-sobre');
let botaoPlay = document.querySelector('.botao-play');
let tempo = document.querySelector('.tempo');
let curso = document.querySelector('.curso');
let botaoAdicionar = document.querySelector('.botao-adicionar');
let campoAdicionar = document.querySelector('.campo-adicionar');

/**
 * Tratamento do Clique de Sobre
 */
linkSobre.addEventListener('click', function () {
    ipcRenderer.send('open-window-about');
});

/**
 * Tratamento do clique de Play
 * @type {[string,string]}
 */
let imgs = ['img/play-button.svg', 'img/stop-button.svg'];
let play = false;
botaoPlay.addEventListener('click', () => {
    if (play === true) {
        timer.parar(curso.textContent);
        play = false;
        new Notification('Electron Timer', {
            body: `O curso ${curso.textContent} foi pausado.,`,
            icon: 'img/stop-button.png'
        });
    }
    else {
        new Notification('Electron Timer', {
            body: `O curso ${curso.textContent} foi iniciado.`,
            icon: 'img/play-button.png'
        });
        timer.iniciar(tempo);
        play = true;
    }
    imgs = imgs.reverse();
    botaoPlay.src = imgs[0];
});

window.onload = () => {
    data.getDadosCurso(curso.textContent).then((dados) => {
        tempo.textContent = dados.tempo;
    });
};

ipcRenderer.on('curso-trocado', (event, nomeCurso) => {
    timer.parar(curso.textContent);
    data.getDadosCurso(nomeCurso).then((dados) => {
        tempo.textContent = dados.tempo;
    }).catch((error) => {
        console.log('curso ainda não possui json', error);
        tempo.textContent = "00:00:00";
    });
    curso.textContent = nomeCurso;
});

botaoAdicionar.addEventListener('click', () => {

    if (campoAdicionar.value === '') {
        return;
    }

    let novoCurso = campoAdicionar.value;
    campoAdicionar.textContent = novoCurso;
    curso.textContent = novoCurso;
    tempo.textContent = '00:00:00';
    campoAdicionar.value = '';
    ipcRenderer.send('curso-adicionado', novoCurso);

});

ipcRenderer.on('atalho-iniciar-parar', () => {
    let click = new MouseEvent('click');
    botaoPlay.dispatchEvent(click);
});