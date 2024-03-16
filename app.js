//Samir Hassan -->

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
//use a constant port to change it to your specification
const port = 3000;

let taskList = [];

const publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

//set up our view engines
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

//global variables for our tasks such as the counter and the list itself
let id = 0;

app.use(bodyParser.urlencoded({ extended: true }));

//path route
//call render on the response object and passing it the template name and the empty task list object
app.get("/", (req, res) => {
  res.render("taskmanager", { taskList: taskList });
});

//processform route
//The "/processform" router should check the value of the "command" query param to see if we are doing an add or a delete
app.post("/processform", (req, res) => {
  const command = req.body.command;
  if (command === "add") {
    const newTask = {
      id: taskList.length + 1,
      DescriptionT: req.body.DescriptionT,
      DueDateT: req.body.DueDateT,
      TypeT: req.body.TypeT,
    };
    taskList.push(newTask);
    res.redirect("/"); //reloading the page doesn't add a new task
  } else if (command === "delete") {
    const chosenTask = req.body.tasks;
    if (chosenTask) {
      const ids = Array.isArray(chosenTask) ? chosenTask : [chosenTask];
      ids.forEach((taskId) => {
        const taskIndex = taskList.findIndex(
          (task) => task.id === parseInt(taskId)
        );
        if (taskIndex !== -1) {
          taskList.splice(taskIndex, 1);
        }
      });
    }
    res.render("taskmanager", { taskList: taskList });
  } else {
    res.render("taskmanager", { taskList: taskList });
  }
});

// launch the server
app.listen(port, () => {
  console.log(`Task Manager app listening at http://localhost:${port}`); //this helps load the website right from terminal
});
