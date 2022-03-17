import { CompanyStatus } from './companyStatus';
/* Schema do TypeScript => validação de tipos */
export interface ICompany {
    /*O id pode ser opcional, pois o sequelize vai gerear um*/
    id?: number,
    name: string,
    customerId: number,
    status?: number,
    city?: string,
    country?: string,
    region?: string,
    latitute?: number,
    longitute?: number,
    timezone?: string
}
