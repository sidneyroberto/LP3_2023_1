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

app.get('/soma/:numero1/:numero2', (req, res) => {
  const { numero1, numero2 } = req.params
  const n1 = Number(numero1)
  const n2 = Number(numero2)
  if (!isNaN(n1) && !isNaN(n2)) {
    const resultado = n1 + n2
    return res.status(200).json({ resultado })
  }

  return res.status(400).json({ mensagem: 'Números inválidos' })
})

app.get('/divisao', (req, res) => {
  const { numero1, numero2 } = req.query
  const n1 = Number(numero1)
  const n2 = Number(numero2)

  if (n2 != 0) {
    const resultado = n1 / n2
    return res.status(200).json({ resultado })
  }

  return res.status(400).json({
    mensagem: 'Divisor não pode ser zero',
  })
})

// Levanta o servidor
app.listen(3000, () => console.log('Server is running'))
