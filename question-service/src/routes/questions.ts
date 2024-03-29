import {Router, Request, Response} from 'express';
import questionsController from '../controllers/questions';
import {validateQuestionSchema, validateUpdateQuestionSchema} from './middlewares';
import middlewareCommons from 'ms-commons/api/routes/middlewares';

const router = Router();

router.get('/questions/date/:deviceId/:companyId', questionsController.getQuestionsByDate);

//router.get('/questions/teste/:deviceId', questionsController.getQuestionsByDate);

router.get('/questions/company', middlewareCommons.validateAuth, questionsController.getQuestions);

router.get('/questions/:id', questionsController.getQuestion);

/* Optado pelo patch ao invés de put pois aqui acontece um update parcial, para seguir o restfull */
router.patch('/questions/:id', middlewareCommons.validateAuth, validateUpdateQuestionSchema, questionsController.setQuestion);

router.delete('/questions/:id', middlewareCommons.validateAuth, questionsController.deleteQuestion);

router.post('/questions/', middlewareCommons.validateAuth, validateQuestionSchema, questionsController.addQuestion);

router.get('/questions/', middlewareCommons.validateAuth, questionsController.getQuestions);


export default router;