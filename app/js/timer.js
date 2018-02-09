const moment = require('moment');
let segundos;
let timer;

module.exports = {
    iniciar(elemento) {
        let tempo = moment.duration(elemento.textContent);
        segundos = tempo.asSeconds();
        clearInterval(timer);
        timer = setInterval(() => {
            segundos++;
            elemento.textContent = this.segundosParaDataFormatada(segundos);
        }, 1000);
    },
    segundosParaDataFormatada(segundos) {
        return moment().startOf('day').seconds(segundos).format("HH:mm:ss");
    },
    parar(){
        clearInterval(timer);
    }
};