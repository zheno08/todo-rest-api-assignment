const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// this is the project link on github
// https://github.com/zheno08/todo-rest-api-assignment

let todos = [
  { id: 1, task: 'Learn Express.js', completed: false },
  { id: 2, task: 'Build a REST API', completed: false }
];

// Get all to-do items
app.get('/todos', (req, res) => {
  res.json(todos);
});

// Get a single to-do item by ID
app.get('/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).send('To-Do item not found');
  res.json(todo);
});

// Add a new to-do item
app.post('/todos', (req, res) => {
  const newTodo = {
    id: todos.length + 1,
    task: req.body.task,
    completed: false
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Update a to-do item
app.put('/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).send('To-Do item not found');

  todo.task = req.body.task;
  todo.completed = req.body.completed;
  res.json(todo);
});

// Delete a to-do item
app.delete('/todos/:id', (req, res) => {
  const todoIndex = todos.findIndex(t => t.id === parseInt(req.params.id));
  if (todoIndex === -1) return res.status(404).send('To-Do item not found');

  const deletedTodo = todos.splice(todoIndex, 1);
  res.json(deletedTodo);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});