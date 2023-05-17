const express = require("express");
const app = express();
const crypto = require("crypto");
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


// const dotenv = require('dotenv');
// dotenv.config();

const PORT = 8080;

//data
const STUDENTS = [
  {
    id: 1,
    name: "Ayshen",
    surname:
      "EZizova",
    age: 21,
    birthday:"31dec"
  },
  {
    id: 2,
    name: "Kanye",
    surname:
      "Eova",
    age: 45,
    birthday:"2dec"
  },
  {
    id: 3,
    name: "Eziz",
    surname:
      "Yovaa",
    age: 35,
    birthday:"3jan"
  },
];

app.get("/api", (req, res) => {
  res.send("Welcome to Our API!");
});

//CRUD - CREATE READ UPDATE DELETE
//STATUS CODES - 200,201,202, 404, 204

//get All Students
app.get("/api/students", (req, res) => {
  const { name } = req.query;
  if (name === undefined) {
    res.status(200).send({
      data: STUDENTS,
      message: "data get success!",
    });
  } else {
    res.status(200).send({
      data: STUDENTS.filter(
        (x) => x.name.toLowerCase().trim().includes(name.toLowerCase().trim())
      ),
      message: "data get success!",
    });
  }
});
//get student by ID
app.get("/api/students/:id", (req, res) => {
  const id = req.params.id;
  const student = STUDENTS.find((x) => x.id === parseInt(id));
  if (!student) {
    console.log("test");
    res.status(204).send("student not found!");
    // return;
  } else {
    res.status(200).send({
      data: student,
      message: "data get success!",
    });
    // return;
  }
});
//delete artist by ID
app.delete("/api/students/:id", (req, res) => {
  const id = req.params.id;
  const student = STUDENTS.find((x) => x.id == id);
  if (student === undefined) {
    res.status(404).send("student not found");
  } else {
    const idx = STUDENTS.indexOf(student);
    STUDENTS.splice(idx, 1);
    res.status(203).send({
      data: student,
      message: "student deleted successfully",
    });
  }
});
//post
app.post("/api/students",(req, res) => {
  const { name, age, surname, birthday } = req.body;
  const newStudents= {
    id: crypto.randomUUID(),
    name: name,
    surname: surname,
    age: age,
    birthday:birthday,
  };
  STUDENTS.push(newStudents);
  res.status(201).send("created");
});
//put
app.put("/api/students/:id", (req, res) => {
  const id = req.params.id;
  const { name, age, imageURL } = req.body;
  const existedStudent = STUDENTS.find((x) => x.id == id);
  if (existedStudent == undefined) {
    res.status(404).send("student not found!");
  } else {
    if (name) {
      existedStudent.name = name;
    }
    if (age) {
      existedStudent.age = age;
    }
    if (imageURL) {
      existedStudent.imageURL = imageURL;
    }
    res.status(200).send(`artist: ${existedStudent.name}`);
  }
});

// PORT  = process.env.PORT;
app.listen(PORT, () => {
    console.log(`NODE APP listening on port ${PORT}`);
});