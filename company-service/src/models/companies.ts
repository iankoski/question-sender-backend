import { CompanyStatus } from './companyStatus';
/* Schema do TypeScript => validação de tipos */
export interface ICompany {
    /*O id pode ser opcional, pois o sequelize vai gerear um*/
    id?: number,
    name: string,
    userName: string,
    password: string,
    status?: number,
    urlQrCode: string
}
