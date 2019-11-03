const express = require('express')

const server = express()

server.use(express.json())

const projects = [
  { id: '1', title: 'Take BB8 to savety', task: [] },
  { id: '2', title: 'Destroy Death Star', task: [] },
  { id: '3', title: 'Save the Rebels', task: [] }
]

let nmbrReq = 0

server.use((req, res, next) => {
  nmbrReq += 1
  console.log(nmbrReq)
  next()
})

function checkProjectId(req, res, next) {
  const { id } = req.params

  if (projects.filter(item => item.id === id).length === 0) {
    return res.status(400).json({ error: 'project does not exists' })
  }

  return next()
}

server.post('/projects', (req, res) => {
  const { id, title } = req.body

  projects.push({ id, title, task: [] })

  return res.json(projects)
})

server.get('/projects', (req, res) => {
  return res.json(projects)
})

server.get('/projects/:id', checkProjectId, (req, res) => {
  const { id } = req.params

  const response = projects.filter(item => {
    return item.id === id
  })

  return res.json(response)
})

server.put('/projects/:id', checkProjectId, (req, res) => {
  const { id } = req.params
  const { name } = req.body

  const response = projects.map(item => {
    if (item.id === id) {
      item.title = name
    }
    return item
  })

  return res.json(response)
})

server.delete('/projects/:id', checkProjectId, (req, res) => {
  const { id } = req.params

  const response = projects.filter(item => {
    return item.id !== id
  })

  return res.json(response)
})

server.post('/projects/:id/tasks', checkProjectId, (req, res) => {
  const { id } = req.params
  const { task } = req.body

  const response = projects.map(item => {
    if (item.id === id) {
      item.task.push(task)
    }
    return item
  })

  return res.json(response)
})

server.listen(3001)
