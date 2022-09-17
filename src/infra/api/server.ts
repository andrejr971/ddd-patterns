import dotenv from 'dotenv';
import { app } from "./express";

dotenv.config();
const port = Number(process.env.PORT) || 3333;

app.listen(port, () => console.log(`🚀 server is listening on port ${port}`));