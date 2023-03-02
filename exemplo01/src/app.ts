import express from 'express'
import cors from 'cors'
import logger from 'morgan'
import { connectToMongoDB } from './config/db'

connectToMongoDB()

export const app = express()
app.use(cors())
app.use(logger('dev'))
app.use(express.json())

app.get('/', (req, res) => res.send('Contact Book API'))
