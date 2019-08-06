const jsonfile = require("jsonfile-promised");
const fs = require("fs");

module.exports = {
  saveData(course, timeCourseStudied) {
    let filePathWithSpentTimeOnCourse = __dirname + "/data/" + course + ".json";

    if (fs.existsSync(filePathWithSpentTimeOnCourse)) {
      this.addCourseTime(filePathWithSpentTimeOnCourse, timeCourseStudied);
    } else {
      this.createCourseFile(filePathWithSpentTimeOnCourse, {}).then(() => {
        this.addCourseTime(filePathWithSpentTimeOnCourse, timeCourseStudied);
      });
    }
  },
  async createCourseFile(filename, contentFile) {
    try {
      await jsonfile.writeFile(filename, contentFile);
      console.log("created File.");
    } catch (error) {
      console.log(error);
    }
  },
  addCourseTime(courseFile, expendedTimeOnCourse) {
    let data = {
      lastStudy: new Date().toString(),
      time: expendedTimeOnCourse
    };
    jsonfile
      .writeFile(courseFile, data, { spaces: 2 })
      .then(() => {
        console.log("Time saved successfully.");
      })
      .catch(error => {
        console.log("error: ", error);
      });
  },
  getCourseData(courseName) {
    let pathCourseFile = __dirname + "/data/" + courseName + ".json";
    return jsonfile.readFile(pathCourseFile);
  },
  getCourseNames() {
    let files = fs.readdirSync(__dirname + "/data/");
    let courses = files.map(file => {
      return file.substr(0, file.lastIndexOf("."));
    });
    return courses;
  }
};
