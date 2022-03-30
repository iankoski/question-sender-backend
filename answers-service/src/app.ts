import app from 'ms-commons/api/app';
import answersRouter from './routes/answers';
/*Configurações da webapi*/ 
export default app(answersRouter);