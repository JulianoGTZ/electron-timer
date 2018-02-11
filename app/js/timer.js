const {ipcRenderer} = require('electron');
const moment = require('moment');
let segundos;
let timer;
let tempo;

module.exports = {
    iniciar(elemento) {
        tempo = moment.duration(elemento.textContent);
        segundos = tempo.asSeconds();
        clearInterval(timer);
        timer = setInterval(() => {
            segundos++;
            tempo = segundos;
            elemento.textContent = this.segundosParaTempoFormatado(segundos);
        }, 1000);
    },
    segundosParaTempoFormatado(segundos) {
        return moment().startOf('day').seconds(segundos).format("HH:mm:ss");
    },
    parar(nomeCurso) {
        clearInterval(timer);
        let tempoEstudado = this.segundosParaTempoFormatado(tempo);
        console.log('tempo estudado',tempoEstudado);
        ipcRenderer.send('curso-parado', nomeCurso, tempoEstudado);
    }
};