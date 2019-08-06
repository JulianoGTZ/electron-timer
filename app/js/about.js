const { ipcRenderer, shell } = require("electron");
const process = require("process");

let closeLink = document.querySelector("#close-link");
let twitterLink = document.querySelector("#link-github");
let electronVersion = document.querySelector("#electron-version");

window.onload = function() {
  electronVersion.textContent = process.versions.electron;
};

closeLink.addEventListener("click", function() {
  ipcRenderer.send("close-about-window");
});

twitterLink.addEventListener("click", function() {
  shell.openExternal("https://github.com/JulianoGTZ");
});
