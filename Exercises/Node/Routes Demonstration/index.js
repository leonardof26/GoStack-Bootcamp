const express = require('express')

const server = express()
server.use(express.json())

//CRUD - Create Read Update Delete

const users = ['Steve', 'Tim', 'Shewie', 'BB8']

//Middleware

server.use((req, res, next) => {
  console.time('Response')
  next()
  console.timeEnd('Response')
})

function checkUserExistis(req, res, next) {
  console.log(req.body)
  if (!req.body.name) {
    return res.status(400).json({ error: 'User name is required' })
  }

  return next()
}

function checkUserInArray(req, res, next) {
  const user = users[req.params.index]
  if (!user) {
    return res.status(400).json({ error: 'User doesnt exist' })
  }

  req.user = user

  return next()
}

server.get('/users', (req, res) => {
  return res.json(users)
})

server.get('/users/:index', checkUserInArray, (req, res) => {
  return res.json(req.user)
})

server.post('/users', checkUserExistis, (req, res) => {
  const { name } = req.body

  users.push(name)

  return res.json(users)
})

server.put('/users/:index', checkUserInArray, checkUserExistis, (req, res) => {
  const { index } = req.params
  const { name } = req.body

  users[index] = name

  return res.json(users)
})

server.delete('/users/:index', checkUserInArray, (req, res) => {
  const { index } = req.params

  users.splice(index, 1)

  return res.send()
})

server.listen(3000)
