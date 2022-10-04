import app from 'ms-commons/api/app';
import newsRouter from './routes/news';
/*Configurações da webapi*/ 
export default app(newsRouter);