const {app, BrowserWindow} = require('electron');

app.on('ready', () => {
    console.log("Aplicação on the air!")
    let mainWindow = new BrowserWindow({
        width: 600,
        height:400
    });

    mainWindow.loadURL(`file://${__dirname}/app/index.html`);
});

//Close off
app.on('window-all-close',()=>{
   app.quit();
});