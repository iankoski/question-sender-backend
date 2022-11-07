import {Router, Request, Response} from 'express';
import answersController from '../controllers/answers';
import {validateAnswerSchema, validateUpdateAnswerSchema} from './middlewares';
import middlewareCommons from 'ms-commons/api/routes/middlewares';

const router = Router();
/* Retorna a quantidade de respostas de uma pergunta, pela alternativa */
router.get('/answers/countbyalternative/:alternativeId', middlewareCommons.validateAuth, answersController.getAnswerCountByAlternative);

/* Retorna a lista de respostas por deviceId */
router.get('/answers/answersbydeviceid/:deviceId', answersController.getAnsweredQuestionByDeviceId);

/* Retorna a quantidade de respostas de uma pergunta, pela pergunta */
router.get('/answers/countbyquestion/:questionId', middlewareCommons.validateAuth, answersController.getAnswerCountByQuestion);

/* Retorna a alternativa mais respondida e o número de respostas */
router.get('/answers/mostanswered/:questionId', middlewareCommons.validateAuth, answersController.getMostAnsweredAlternative);

//router.get('/answers/:questionId', middlewareCommons.validateAuth, answersController.get);

router.get('/answers/:id', middlewareCommons.validateAuth, answersController.getAnswer);

/* Optado pelo patch ao invés de put pois aqui acontece um update parcial, para seguir o restfull */
router.patch('/answers/:id', middlewareCommons.validateAuth, validateUpdateAnswerSchema, answersController.setAnswer);

router.delete('/answers/:id', middlewareCommons.validateAuth, answersController.deleteAnswer);

router.post('/answers/', answersController.addAnswer);

router.get('/answers/', middlewareCommons.validateAuth, answersController.getAnswers);


export default router;