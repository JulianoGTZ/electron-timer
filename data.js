const jsonfile = require('jsonfile-promised');
const fs = require('fs');

module.exports = {
    salvaDados(curso, tempoCursoEstudado) {

        let enderecoArquivoTempoGastoCurso = __dirname + '/data/' + curso + '.json';

        if (fs.existsSync(enderecoArquivoTempoGastoCurso)) {
            this.adicionaTempoAoCurso(enderecoArquivoTempoGastoCurso, tempoCursoEstudado);
        } else {
            this.criaArquivoCurso(enderecoArquivoTempoGastoCurso, {}).then(() => {
                this.adicionaTempoAoCurso(enderecoArquivoTempoGastoCurso, tempoCursoEstudado)
            })
        }
    },
    criaArquivoCurso(nomeArquivo, conteudoArquivo) {
        return jsonfile.writeFile(nomeArquivo, conteudoArquivo).then(() => {
            console.log('Arquivo criado');
        }).catch((error) => {
            console.log(error);
        });
    },
    adicionaTempoAoCurso(arquivoCurso, tempoGastoCurso) {
        let dados = {
            ultimoEstudo: new Date().toString(),
            tempo: tempoGastoCurso
        };
        jsonfile.writeFile(arquivoCurso, dados, {spaces: 2}).then(() => {
            console.log('tempo salvo com sucesso no arquivo');
        }).catch((error) => {
            console.log('aconteceu o seguinte erro', error);
        });
    },
    getDadosCurso(nomeCurso) {
        let caminhoArquivoCurso = __dirname + '/data/' + nomeCurso + '.json';
        return jsonfile.readFile(caminhoArquivoCurso)
    },
    getNomesCursos() {
        let arquivos = fs.readdirSync(__dirname + '/data/');
        let cursos = arquivos.map((arquivo) => {
            return arquivo.substr(0, arquivo.lastIndexOf('.'));
        });
        return cursos;
    }
};