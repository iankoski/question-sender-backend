import {Router} from 'express';
import newsController from '../controllers/news';
import {validateNewSchema, validateUpdateNewSchema} from './middlewares';
import middlewareCommons from 'ms-commons/api/routes/middlewares';

const router = Router();

router.get('/news/date/:companyId', newsController.getNewsByDate);

router.get('/news/company/', middlewareCommons.validateAuth, newsController.getNews);

router.get('/news/:id', newsController.getNew);

/* Optado pelo patch ao invés de put pois aqui acontece um update parcial, para seguir o restfull */
router.patch('/news/:id', middlewareCommons.validateAuth, validateUpdateNewSchema, newsController.setNews);

router.delete('/news/:id', middlewareCommons.validateAuth, newsController.deleteNew);

router.post('/news/', middlewareCommons.validateAuth, validateNewSchema, newsController.addNew);

router.get('/news/', middlewareCommons.validateAuth, newsController.getNews);

export default router;