const {app, BrowserWindow, ipcMain, Tray, Menu, globalShortcut} = require('electron');
const data = require('./data.js');
const templateGenerator = require('./template');

let tray = null;
let mainWindow;

/**
 * Inicialização da Janela Principal
 */
app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 600,
        height: 400
    });
    /**
     * Tray
     */
    tray = new Tray(__dirname + '/app/img/icon-tray.png');
    /**
     * Sub-Menu do Tray
     */
    let template = templateGenerator.geraTrayTemplate(mainWindow);
    let trayMenu = Menu.buildFromTemplate(template);
    tray.setContextMenu(trayMenu);

    let templateMenu = templateGenerator.geraMenuPrincipalTemplate(app);

    let menuPrincipal = Menu.buildFromTemplate(templateMenu);

    //mainWindow.openDevTools();
    globalShortcut.register('CmdOrCtrl+Shift+S', () => {
        mainWindow.send('atalho-iniciar-parar');

    });
    Menu.setApplicationMenu(menuPrincipal);

    mainWindow.loadURL(`file://${__dirname}/app/index.html`);
});

/**
 * Fechamento da Janela Principal
 */
app.on('window-all-close', () => {
    app.quit();
});

/**
 * Renderização da Janela de Sobre
 * @type {null}
 */
let aboutWindow = null;
ipcMain.on('open-window-about', () => {
    if (aboutWindow === null) {
        aboutWindow = new BrowserWindow({
            width: 300,
            height: 220,
            alwaysOnTop: true,
            frame: false
        });
    }

    /**
     * Trata Fechamento de janela, para não ser excluída via garbage collection
     */
    aboutWindow.on('closed', () => {
        aboutWindow = null;
    });

    aboutWindow.loadURL(`file://${__dirname}/app/about.html`);
});

/**
 * Escuta evento de fechamento de janela
 */
ipcMain.on('fechar-janela-sobre', () => {
    aboutWindow.close();
});

/**
 * Evento que escuta o 'stop' do curso
 */
ipcMain.on('stopped-course', (event, curso, tempoEstudado) => {
    data.salvaDados(curso, tempoEstudado);
});

ipcMain.on('curso-adicionado', (event, novoCurso) => {
    let novoTemplate = templateGenerator.adicionaCursoNoTray(novoCurso, mainWindow);
    let novoTrayMenu = Menu.buildFromTemplate(novoTemplate);
    tray.setContextMenu(novoTrayMenu);

});