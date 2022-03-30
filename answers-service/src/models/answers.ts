import { AnswerStatus } from './answerStatus';
/* Schema do TypeScript => validação de tipos */
export interface IAnswer {
    /*O id pode ser opcional, pois o sequelize vai gerear um*/
    id?: number,
    description: string,
    companyId: number,
    status?: number,
    questionId: number,
    alternativeId: number,
    alternativeChar: string
}
