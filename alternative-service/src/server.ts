import app from './app';
import database from 'ms-commons/data/db';
(async () => {
    try{
        const port = parseInt(`${process.env.PORT}`); 
        await database.sync();
        console.log(`Rodando banco ${process.env.DB_NAME}`);
        await app.listen(port);
        console.log(`Subiu na porta ${port}`);
    }catch(error){
        console.log(`Erro ${error}`);
    }
})();
