import express from 'express'
import cors from 'cors'
import api from './routes/api' 

const app = express();
app.use(express.json())
app.use(cors())


app.use('/api', api )

export default app