import express, { Application } from 'express'
import cors from 'cors'
import router from './app/router'
import GlobalErrorHandler from './app/middleware/globalErrorHandler'
import NotFound from './app/middleware/notFound'

const app: Application = express()

//perser
app.use(express.json())
app.use(cors())

app.use('/api', router)

app.get('/', (req, res) => {
  res.send('Storage Management System')
})

// global error handler  
app.use(GlobalErrorHandler)

// not found 
app.use(NotFound)

export default app;