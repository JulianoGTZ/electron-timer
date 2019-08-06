const { ipcRenderer } = require("electron");
const moment = require("moment");
let seconds = 0;
let timer;
let time;

module.exports = {
  start(htmlElement) {
    time = moment.duration(htmlElement.textContent);
    seconds = time.asSeconds();
    clearInterval(timer);
    timer = setInterval(() => {
      seconds++;
      time = seconds;
      htmlElement.textContent = this.secondsToFormatedDate(seconds);
    }, 1000);
  },
  secondsToFormatedDate(seconds) {
    return moment()
      .startOf("day")
      .seconds(seconds)
      .format("HH:mm:ss");
  },
  stop(courseName) {
    clearInterval(timer);
    let timeStudied = this.secondsToFormatedDate(time);
    console.log("time studied.", timeStudied);
    ipcRenderer.send("stopped-course", courseName, timeStudied);
  }
};
