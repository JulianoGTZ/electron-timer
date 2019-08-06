const { ipcRenderer } = require("electron");
const timer = require("./timer");
data = require("../../data");

let linkAbout = document.querySelector("#link-about");
let playButton = document.querySelector(".play-button");
let time = document.querySelector(".time");
let course = document.querySelector(".course");
let addButton = document.querySelector(".add-button");
let addField = document.querySelector(".add-field");

linkAbout.addEventListener("click", function() {
  ipcRenderer.send("open-window-about");
});

let imgs = ["img/play-button.svg", "img/stop-button.svg"];
let play = false;

playButton.addEventListener("click", () => {
  if (play === true) {
    timer.stop(course.textContent);
    play = false;
    new Notification("Electron Timer", {
      body: `The course ${course.textContent} has been paused.`,
      icon: "img/stop-button.png"
    });
  } else {
    new Notification("Electron Timer", {
      body: `The course ${course.textContent} started.`,
      icon: "img/play-button.png"
    });
    timer.start(time);
    play = true;
  }
  imgs = imgs.reverse();
  playButton.src = imgs[0];
});

window.onload = () => {
  data.getDadosCurso(course.textContent).then(data => {
    time.textContent = data.tempo;
  });
};

ipcRenderer.on("exchanged-course", (event, courseName) => {
  timer.stop(course.textContent);
  data
    .getDadosCurso(courseName)
    .then(data => {
      time.textContent = data.tempo;
    })
    .catch(error => {
      console.log("The course doesn't have a json yet", error);
      time.textContent = "00:00:00";
    });
  course.textContent = courseName;
});

addButton.addEventListener("click", () => {
  if (addField.value === "") {
    return;
  }

  let newCourse = addField.value;
  addField.textContent = newCourse;
  course.textContent = newCourse;
  time.textContent = "00:00:00";
  addField.value = "";

  ipcRenderer.send("added-course", newCourse);
});

ipcRenderer.on("shortcut-start-stop", () => {
  let click = new MouseEvent("click");
  playButton.dispatchEvent(click);
});
