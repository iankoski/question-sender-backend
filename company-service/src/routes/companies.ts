import {Router, Request, Response} from 'express';
import companiesController from '../controllers/companies';
import {validateCompanySchema, validateAuthorization, validateLoginSchema, validateUpdateCompanySchema, validateAuthentication} from './middlewares';

const router = Router();

router.get('/companies/', validateAuthentication, companiesController.getCompanies);

router.get('/companies/:id', validateAuthentication, validateAuthorization, companiesController.getCompany);
/* Na rota para novas empresas/usuários propositalmente não é feita a validação de autenticação
 * Feito dessa forma porque o usuário/empresa ainda não está cadastrado, logo ele pode cadastrar-se
 * Caso a validação fosse feita, seria necessário que outro usuário/empresa já cadastrado fizesse o cadastro */
router.post('/companies/', validateCompanySchema, companiesController.addCompany);
//Também não valida
router.post('/companies/login', validateLoginSchema, companiesController.loginCompany);

router.post('/companies/logout', validateAuthentication, companiesController.logoutCompany);
/* Optado pelo patch ao invés de put pois aqui acontece um update parcial, para seguir o restfull */
router.patch('/companies/:id', validateAuthentication, validateAuthorization, validateUpdateCompanySchema, companiesController.setCompany);

router.delete('/companies/:id', validateAuthentication, validateAuthorization, companiesController.deleteCompany);

export default router;