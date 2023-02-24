import 'express-async-errors';
import express, { Application } from 'express';
import router from './routes';
import { handleErrors } from './error';

const app: Application = express()

app.use(express.json())
app.use('/api', router)

app.use(handleErrors)

export default app