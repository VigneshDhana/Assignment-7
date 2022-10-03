const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 8080;
let studentArray = require("./InitialData");
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// your code goes here

var new_id = 8;

app.get("/api/student", async (req, res) => {
  try {
    res.send(studentArray);
  } catch (e) {
    console.log(e.message);
  }
});

app.get("/api/student/:id", async (req, res) => {
  try {
    let data;
    studentArray.forEach((item) => {
      if (item.id == req.params.id) {
        data = item;
        return;
      }
    });
    if (data) {
      res.send(data);
    } else {
      res.status(404).send("invalid Id");
    }
  } catch (e) {
    console.log(e.message);
  }
});

app.post("/api/student", async (req, res) => {
  try {
    let data = { id: new_id, ...req.body };
    new_id++;
    console.log(data);
    studentArray.push(data);
    res.json({ id: data.id });
  } catch (e) {
    console.log(e.message);
  }
});

app.post("/api/student/:id", async (req, res) => {
  try {
    let data;
    studentArray.forEach((item) => {
      if (item.id == req.params.id) {
        data = item;
        return;
      }
    });
    if (data) {
      res.send(data);
    } else {
      res.status(404).send("invalid Id");
    }
  } catch (e) {
    console.log(e.message);
  }
});

app.delete("/api/student/:id", async (req, res) => {
  try {
    let d;
    studentArray.forEach((item, i) => {
      if (item.id == req.params.id) {
        d = i;
        return;
      }
    });
    if (d) {
      studentArray = studentArray.slice(0, d).concat(studentArray.slice(d + 1));
      res.end();
    } else {
      res.status(404).send("invalid Id");
    }
  } catch (e) {
    console.log(e.message);
  }
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
