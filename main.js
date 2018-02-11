const {app, BrowserWindow, ipcMain, Tray, Menu} = require('electron');
const data = require('./data.js');
const templateGenerator = require('./template');

let tray = null;


/**
 * Inicialização da Janela Principal
 */
app.on('ready', () => {
    console.log("Aplicação on the air!")
    let mainWindow = new BrowserWindow({
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
let sobreWindow = null;
ipcMain.on('abrir-janela-sobre', () => {
    if (sobreWindow === null) {
        sobreWindow = new BrowserWindow({
            width: 300,
            height: 220,
            alwaysOnTop: true,
            frame: false
        });
    }

    /**
     * Trata Fechamento de janela, para não ser excluída via garbage collection
     */
    sobreWindow.on('closed', () => {
        sobreWindow = null;
    });

    sobreWindow.loadURL(`file://${__dirname}/app/sobre.html`);
});

/**
 * Escuta evento de fechamento de janela
 */
ipcMain.on('fechar-janela-sobre', () => {
    sobreWindow.close();
});

/**
 * Evento que escuta o 'stop' do curso
 */
ipcMain.on('curso-parado', (event, curso, tempoEstudado) => {
    data.salvaDados(curso, tempoEstudado);
});