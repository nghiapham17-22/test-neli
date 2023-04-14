const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

let todos = [{ id: 1, text: "xin chao anh", isFinished: false }];

app.get("/todos", (req, res) => {
  res.send(todos);
});

app.post("/todos", (req, res) => {
  const todo = req.body;
  todo.id = todos.length + 1;
  todos.push(todo);
  res.send(todo);
});

app.put("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((todo) => todo.id === id);
  if (!todo) return res.status(404).send("Todo not found.");

  todo.text = req.body.text || todo.text;
  todo.isFinished = req.body.isFinished || todo.isFinished;

  res.send(todo);
});

app.delete("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter((todo) => todo.id !== id);
  res.send(`Todo with id ${id} deleted.`);
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
