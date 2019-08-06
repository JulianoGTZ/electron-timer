const data = require('./data');
const {ipcMain} = require('electron');

module.exports = {
    templateInicial: null,

    geraTrayTemplate(win) {
        let template = [
            {
                'label': 'Cursos'
            },
            {
                type: 'separator'
            }
        ];

        let cursos = data.getNomesCursos();

        cursos.forEach((curso) => {
            let menuItem = {
                label: curso,
                type: 'radio',
                click: () => {
                    win.send('exchanged-course', curso);
                }
            };
            template.push(menuItem);
        });
        this.templateInicial = template;
        return template;
    },
    adicionaCursoNoTray(curso, win) {
        this.templateInicial.push({
            label: curso,
            type: 'radio',
            checked: true,
            click: () => {
                win.send('exchanged-course', curso);
            }
        });

        return this.templateInicial;
    },
    geraMenuPrincipalTemplate(app) {
        let templateMenu = [
            {
                label: 'View',
                submenu: [{
                    role: 'reload'
                },
                    {
                        role: 'toggledevtools'
                    }]
            },
            {
                label: 'Window',
                submenu: [
                    {
                        role: 'minimize'
                    },
                    {
                        role: 'close'
                    }
                ]
            },
            {
                label: 'Sobre',
                submenu: [
                    {
                        label: 'About Electron Timer',
                        click: () => {
                            ipcMain.emit('open-window-about');
                        },
                        accelerator: 'CommandOrControl+I'
                    }
                ]
            }
        ];
        return templateMenu;
    }

};