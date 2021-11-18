import app from 'ms-commons/api/app';
import companiesRouter from './routes/companies';
/*Configurações da webapi*/ 
export default app(companiesRouter);