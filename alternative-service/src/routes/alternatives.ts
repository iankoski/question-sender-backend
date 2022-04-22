import {Router, Request, Response} from 'express';
import alternativesController from '../controllers/alternatives';
import {validateAlternativeSchema, validateUpdateAlternativeSchema} from './middlewares';
import middlewareCommons from 'ms-commons/api/routes/middlewares';

const router = Router();

router.get('/alternatives/:companyId', middlewareCommons.validateAuth, alternativesController.getAlternatives);

router.get('/alternatives/:id', middlewareCommons.validateAuth, alternativesController.getAlternative);

/* Optado pelo patch ao invés de put pois aqui acontece um update parcial, para seguir o restfull */
router.patch('/alternatives/:id', middlewareCommons.validateAuth, validateUpdateAlternativeSchema, alternativesController.setAlternative);

router.delete('/alternatives/:id', middlewareCommons.validateAuth, alternativesController.deleteAlternative);

router.post('/alternatives/', middlewareCommons.validateAuth, /*validateAlternativeSchema, */alternativesController.addAlternative);

router.get('/alternatives/', middlewareCommons.validateAuth, alternativesController.getAlternatives);

export default router;