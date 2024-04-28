import express from 'express'
import cors from 'cors'
import api from './routes/api' 
import { PrismaClient } from '@prisma/client';

const app = express();
app.use(express.json())
app.use(cors())


app.use('/api', api )

export default app