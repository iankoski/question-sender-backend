import { CustomerStatus } from './customerStatus';
/* Schema do TypeScript => validação de tipos */
export interface ICustomer {
    /*O id pode ser opcional, pois o sequelize vai gerear um*/
    id?: number,
    name: string,
    email: string,
    password: string,
    phone: string,
    status?: number
}
