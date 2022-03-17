import app from 'ms-commons/api/app';
import questionsRouter from './routes/questions';
/*Configurações da webapi*/ 
export default app(questionsRouter);