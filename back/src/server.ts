import express from 'express';
import indexRouter from './routes/indexRouter';
import cors from 'cors';

const server = express();
const app = express();

server.use(cors());

server.use(express.json());
server.use(indexRouter);

export default server;