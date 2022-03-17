import {Router, Request, Response} from 'express';
import customersController from '../controllers/customers';
import {validateCustomerSchema, validateLoginSchema, validateUpdateCustomerSchema, validateAuthentication} from './middlewares';
import middlewareCommons from 'ms-commons/api/routes/middlewares';

const router = Router();

//Também não valida
router.post('/customers/login', validateLoginSchema, customersController.loginCustomer);

router.post('/customers/logout', middlewareCommons.validateAuth, customersController.logoutCustomer);

router.get('/customers/:id', middlewareCommons.validateAuth, middlewareCommons.validateAuth, customersController.getCustomer);

/* Optado pelo patch ao invés de put pois aqui acontece um update parcial, para seguir o restfull */
router.patch('/customers/:id', middlewareCommons.validateAuth, middlewareCommons.validateAuth, validateUpdateCustomerSchema, customersController.setCustomer);

router.delete('/customers/:id', middlewareCommons.validateAuth, middlewareCommons.validateAuth, customersController.deleteCustomer);

/* Na rota para novos clientes propositalmente não é feita a validação de autenticação
 * Feito dessa forma porque o usuário ainda não está cadastrado, logo ele pode cadastrar-se
 * Caso a validação fosse feita, seria necessário que outro usuário já cadastrado fizesse o cadastro */
router.post('/customers/', middlewareCommons.validateAuth, customersController.addCustomer);

router.get('/customers/', middlewareCommons.validateAuth, customersController.getCustomers);


export default router;