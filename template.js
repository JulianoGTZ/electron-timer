const data = require("./data");
const { ipcMain } = require("electron");

module.exports = {
  initialTemplate: null,

  generateTrayTemplate(win) {
    let template = [
      {
        label: "Courses"
      },
      {
        type: "separator"
      }
    ];

    let courses = data.getCourseNames();

    courses.forEach(course => {
      let menuItem = {
        label: course,
        type: "radio",
        click: () => {
          win.send("exchanged-course", course);
        }
      };
      template.push(menuItem);
    });
    this.templateInicial = template;
    return template;
  },
  addCourseOnTray(course, win) {
    this.initialTemplate.push({
      label: course,
      type: "radio",
      checked: true,
      click: () => {
        win.send("exchanged-course", course);
      }
    });

    return this.initialTemplate;
  },
  generateMainMenuTemplate(app) {
    let templateMenu = [
      {
        label: "View",
        submenu: [
          {
            role: "reload"
          },
          {
            role: "toggledevtools"
          }
        ]
      },
      {
        label: "Window",
        submenu: [
          {
            role: "minimize"
          },
          {
            role: "close"
          }
        ]
      },
      {
        label: "About",
        submenu: [
          {
            label: "About Electron Timer",
            click: () => {
              ipcMain.emit("open-window-about");
            },
            accelerator: "CommandOrControl+I"
          }
        ]
      }
    ];
    return templateMenu;
  }
};
