import express, { Application } from 'express'
import cors from 'cors'

const app: Application = express()

//perser
app.use(express.json())
app.use(cors())

app.use('/api', )

app.get('/', (req, res) => {
  res.send('Storage Management System')
})

export default app;