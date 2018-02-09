const {ipcRenderer, shell } = require('electron');
const process = require('process');

let linkFechar = document.querySelector("#link-fechar");
let linkGithub = document.querySelector("#link-github");
let versaoElectron = document.querySelector('#versao-electron');

window.onload = () => {
    versaoElectron.textContent = process.versions.electron;
};

linkFechar.addEventListener('click', ()=>{
    ipcRenderer.send('fechar-janela-sobre');
});

linkGithub.addEventListener('click',()=>{
    shell.openExternal("https://github.com/JulianoGTZ");
});