// Load express package
const express = require('express')

// Create express app
const app = express()

// Allow app to read JSON data
app.use(express.json())

// PORT number
const PORT = 3000

// Temporary storage for tasks (like a database for now)
// This is just an array in memory - tasks reset when server restarts
let tasks = []

// Track ID for each task - starts at 1, increases by 1
let nextId = 1

// ========================
// ROUTES
// ========================

// GET / - Welcome message
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Task Manager API!' })
})

// GET /tasks - Get all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks)
})

// POST /tasks - Create a new task
app.post('/tasks', (req, res) => {
  // req.body contains the data sent by the user
  const { title } = req.body

  // Create a new task object
  const newTask = {
    id: nextId,
    title: title,
    done: false
  }

  // Add task to our array
  tasks.push(newTask)

  // Increase ID for next task
  nextId++

  // Send back the created task
  res.json(newTask)
})

// PUT /tasks/:id - Update a task (mark as done)
app.put('/tasks/:id', (req, res) => {
  // :id means a variable in the URL
  // req.params.id captures that variable
  const id = parseInt(req.params.id)

  // Find the task with matching id
  const task = tasks.find(t => t.id === id)

  // If task not found, send error
  if (!task) {
    return res.status(404).json({ message: 'Task not found' })
  }

  // Update the task
  task.done = true

  res.json(task)
})

// DELETE /tasks/:id - Delete a task
app.delete('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id)

  // Filter out the task with matching id
  tasks = tasks.filter(t => t.id !== id)

  res.json({ message: 'Task deleted successfully' })
})

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})