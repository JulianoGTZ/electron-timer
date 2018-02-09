const { ipcRenderer } = require('electron');

let linkSobre = document.querySelector('#link-sobre');
let botaoPlay = document.querySelector('.botao-play');

linkSobre.addEventListener('click' , function(){
    ipcRenderer.send('abrir-janela-sobre');
});

let imgs = ['img/play-button.svg','img/stop-button.svg'];

botaoPlay.addEventListener('click',()=>{
    imgs = imgs.reverse();
    botaoPlay.src= imgs[0];
});
