const {
  app,
  BrowserWindow,
  ipcMain,
  Tray,
  Menu,
  globalShortcut
} = require("electron");
const data = require("./data.js");
const templateGenerator = require("./template");

let tray = null;
let mainWindow;

/**
 * Inicialização da Janela Principal
 */
app.on("ready", () => {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 400
  });
  tray = new Tray(__dirname + "/app/img/icon-tray.png");

  let template = templateGenerator.generateTrayTemplate(mainWindow);
  let traySubMenu = Menu.buildFromTemplate(template);
  tray.setContextMenu(traySubMenu);

  let templateMenu = templateGenerator.generateMainMenuTemplate(app);

  let mainMenu = Menu.buildFromTemplate(templateMenu);

  globalShortcut.register("CmdOrCtrl+Shift+S", () => {
    mainWindow.send("shortcut-start-stop");
  });
  Menu.setApplicationMenu(mainMenu);

  mainWindow.loadURL(`file://${__dirname}/app/index.html`);
});

app.on("window-all-close", () => {
  app.quit();
});

let aboutWindow = null;
ipcMain.on("open-window-about", () => {
  if (aboutWindow === null) {
    aboutWindow = new BrowserWindow({
      width: 300,
      height: 220,
      alwaysOnTop: true,
      frame: false
    });
  }

  /**
   * Handles window close, to not be deleted by garbage collection
   */
  aboutWindow.on("closed", () => {
    aboutWindow = null;
  });

  aboutWindow.loadURL(`file://${__dirname}/app/about.html`);
});

ipcMain.on("close-about-window", () => {
  aboutWindow.close();
});

ipcMain.on("stopped-course", (event, course, timeStudied) => {
  data.saveData(course, timeStudied);
});

ipcMain.on("added-course", (event, newCourse) => {
  let newTemplate = templateGenerator.addCourseOnTray(
    newCourse,
    mainWindow
  );
  let newTrayMenu = Menu.buildFromTemplate(newTemplate);
  tray.setContextMenu(newTrayMenu);
});
