const express = require('express')
const app = express()
const path = require('path')
const expressWs = require('express-ws')
expressWs(app)

app.use(express.static('public'))

const PORT = process.env.PORT || 8000

let clients = []
let admin = null

app.listen(PORT, () => {
  console.log(`Chat corriendo en puerto ${PORT}`)
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/client.html'))
})

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/admin.html'))
})

app.ws('/', (ws, req) => {
  console.log('Nueva conexión WS')

  ws.on('message', (m) => {
    const msg = JSON.parse(m)

    if (msg.type === 'admin-connect') {
      admin = ws
      console.log('Admin conectado.')
      return
    }

    if (msg.type === 'client-connect') {
      clients.push(ws)
      console.log('Cliente conectado.')
      return
    }

    if (msg.type === 'interaction') {
      console.log('Mensaje recibido:', msg.val)

      //enviar al admin
      if (admin && admin.readyState === 1) {
        admin.send(JSON.stringify(msg))
      }

      //enviar a todos los clientes
      clients.forEach(client => {
        if (client.readyState === 1) {
          client.send(JSON.stringify({
            type: 'interaction',
            val: msg.val
          }))
        }
      })
    }
  })

  ws.on('close', () => {
    if (ws === admin) {
      admin = null
      console.log('Admin desconectado.')
    } else {
      clients = clients.filter(c => c !== ws)
      console.log('Cliente desconectado. Total:', clients.length)
    }
  })
})
