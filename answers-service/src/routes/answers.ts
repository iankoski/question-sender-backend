import {Router, Request, Response} from 'express';
import answersController from '../controllers/answers';
import {validateAnswerSchema, validateUpdateAnswerSchema} from './middlewares';
import middlewareCommons from 'ms-commons/api/routes/middlewares';

const router = Router();

router.get('/answers/:companyId', middlewareCommons.validateAuth, answersController.getAnswers);

//router.get('/answers/:questionId', middlewareCommons.validateAuth, answersController.get);

router.get('/answers/:id', middlewareCommons.validateAuth, answersController.getAnswer);

/* Optado pelo patch ao invés de put pois aqui acontece um update parcial, para seguir o restfull */
router.patch('/answers/:id', middlewareCommons.validateAuth, validateUpdateAnswerSchema, answersController.setAnswer);

router.delete('/answers/:id', middlewareCommons.validateAuth, answersController.deleteAnswer);

router.post('/answers/', middlewareCommons.validateAuth, answersController.addAnswer);

router.get('/answers/', middlewareCommons.validateAuth, answersController.getAnswers);


export default router;