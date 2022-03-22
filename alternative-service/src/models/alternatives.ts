import { AlternativeStatus } from './alternativeStatus';
/* Schema do TypeScript => validação de tipos */
export interface IAlternative {
    /*O id pode ser opcional, pois o sequelize vai gerear um*/
    id?: number,
    description: string,
    companyId: number,
    questionId: number,
    status?: number
}
