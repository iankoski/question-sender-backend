import {Router} from 'express';
import companiesController from '../controllers/companies';
import {validateCompanySchema, validateUpdateCompanySchema, validateLoginSchema} from './middlewares';
import middlewareCommons from 'ms-commons/api/routes/middlewares';

const router = Router();

router.post('/companies/login', validateLoginSchema, companiesController.loginCompany);

router.post('/companies/logout', middlewareCommons.validateAuth, companiesController.logoutCompany);

router.get('/companies/:id', middlewareCommons.validateAuth, companiesController.getCompany);
//Também não valida

/* Optado pelo patch ao invés de put pois aqui acontece um update parcial, para seguir o restfull */
router.patch('/companies/:id', middlewareCommons.validateAuth, validateUpdateCompanySchema, companiesController.setCompany);

router.delete('/companies/:id', middlewareCommons.validateAuth, companiesController.deleteCompany);

router.get('/companies/', middlewareCommons.validateAuth, companiesController.getCompanies);

router.post('/companies/', validateCompanySchema, companiesController.addCompany);

export default router;