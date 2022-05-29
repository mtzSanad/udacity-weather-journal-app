// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes, body-barser and cors
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

//Application Routing

//Returning projectData object
app.get("/getData", (req, res) => {
  res.send(projectData);
});

app.post("/addData", (req, res) => {
  console.log(11);
  //Getting the data sent in request
  const reqData = req.body;
  //Spreading reqData properties into project data
  projectData = { ...reqData };
  res.send(projectData);
});

// Setup Server
const port = 3000;
const server = app.listen(port, () => {
  console.log(`Application is running on port ${port}`);
});
