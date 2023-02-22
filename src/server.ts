import app from './app';
import 'dotenv/config';
import { connectDatabase } from './database';

const port = process.env.APP_PORT

app.listen(port, async () => {
    await connectDatabase()
    console.log(`database connected on http://localhost:${port}`)
})