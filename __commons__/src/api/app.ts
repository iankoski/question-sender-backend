import express, {Router} from 'express';
import helmet from 'helmet';
/*Configurações da webapi*/ 
export default(router: Router)=>{
    const app = express();
    app.use(express.json())
    app.use(helmet());
    
    app.use(router);
    
    return app;
}
