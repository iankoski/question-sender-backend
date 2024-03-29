import { QuestionStatus } from './questionStatus';
/* Schema do TypeScript => validação de tipos */
export interface IQuestion {
    /*O id pode ser opcional, pois o sequelize vai gerear um*/
    id?: number,
    description: string,
    companyId: number,
    status?: number,
    startDate: Date,
    endDate: Date
}
