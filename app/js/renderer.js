const { ipcRenderer } = require('electron');

let linkSobre = document.querySelector('#link-sobre');

linkSobre.addEventListener('click',()=>{
    ipcRenderer.send('abrir-janela-sobre');
});