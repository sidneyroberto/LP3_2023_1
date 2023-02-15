import express from 'express'
import cors from 'cors'
import logger from 'morgan'

// Cria um novo app Express
const app = express()

// Middlewares

// Deixa todos os serviços públicos
app.use(cors())

// Habilita logs mais detalhados
app.use(logger('dev'))

// Serviços (ou endpoints)
app.get('/pi', (req, res) => {
  const valorPi = Math.PI
  return res.status(200).json({ pi: valorPi })
})

// Levanta o servidor
app.listen(3000, () => console.log('Server is running'))
