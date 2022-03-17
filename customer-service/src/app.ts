import app from 'ms-commons/api/app';
import customersRouter from './routes/customers';
/*Configurações da webapi*/ 
export default app(customersRouter);