import { AnswerStatus } from './answerStatus';
/* Schema do TypeScript => validação de tipos */
export interface IAnswer {
    /*O id pode ser opcional, pois o sequelize vai gerear um*/
    id?: number,
    companyId: number,
    status?: number,
    questionId: number,
    alternativeId: number,
    deviceId: string
}
