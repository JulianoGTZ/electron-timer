const jsonfile = require('jsonfile-promised');
const fs = require('fs');

module.exports = {
    salvaDados(curso, tempoCursoEstudado) {
        let arquivoCurso = __dirname + '/data/' + curso + '.json';
        if (fs.existsSync(arquivoCurso)) {

        } else {
            this.criaArquivoCurso(arquivoCurso, {}).then(()=>{

            })
        }
    },
    criaArquivoCurso(nomeArquivo, conteudoArquivo) {
        return jsonfile.writeFile(nomeArquivo, conteudoArquivo).then(() => {
            console.log('Arquivo criado');
        }).catch((error) => {
            console.log(error);
        });
    }
};