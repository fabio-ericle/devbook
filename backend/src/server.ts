import "express-async-errors";
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import "./database";

dotenv.config();
const port = parseInt(process.env.PORT as string) || 3001;
const app = express();
app.use(cors());
app.use(express.json());
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
   if(err instanceof Error) {
      return response.status(400).json({
         error: err.message
      });
   }
   return response.status(500).json({
      status: "error",
      message: "Internal Server Error!",
   });
});
app.listen(port, () => {
   console.log("Server os running!", port);
});