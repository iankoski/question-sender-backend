import { NewStatus } from './newStatus';
/* Schema do TypeScript => validação de tipos */
export interface INew {
    /*O id pode ser opcional, pois o sequelize vai gerear um*/
    id?: number,
    description: string,
    companyId: number,
    status?: number,
    startDate: Date,
    endDate: Date,
    title: string
}
