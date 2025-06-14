import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { getEnvVar } from './utils/getEnvVar.js';
import todosRouter from './routers/todo.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
const PORT = Number(getEnvVar('PORT', '3000'));
export const startServer=()=>{

const app=express();

app.use(express.json());
app.use(cors())
app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );
  app.use('/api',todosRouter)
app.use(notFoundHandler);
app.use(errorHandler);


  app.use((err,req,res,next)=>{
    res.status(500).json({
        message: 'Something went wrong',
        error: err.message,
    })
  })
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
    
})
}