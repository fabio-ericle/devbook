import "express-async-errors";
import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import "./database";
import routes from './routes';
import { globalErrors } from "./middlewares/globalErrors";

dotenv.config();
const port = parseInt(process.env.PORT as string) || 3001;
const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);
app.use(globalErrors);
app.listen(port, () => {
   console.log("Server is running!");
});