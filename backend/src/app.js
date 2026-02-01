import express from 'express'
import routes from './routes.js'
import { startQueueWorker } from './workers/queueWorker.js'

const app=express()
app.use(express.json())
app.use('/api', routes)

startQueueWorker();

export default app;

