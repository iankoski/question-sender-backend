import Sequelize, {Model, Optional} from 'sequelize';
import database from 'ms-commons/data/db';
import { IQuestion } from './questions';


interface IQuestionCreationAttributes extends Optional<IQuestion, "id">{}

export interface IQuestionModel extends Model<IQuestion, IQuestionCreationAttributes>, IQuestion{}

const Question = database.define<IQuestionModel>('question',{
        id: {
            type: Sequelize.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        companyId: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: false,        
        },
        customerId: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: false,        
        },        
        timeToLive: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: false
        },        
        description: {
            type: Sequelize.STRING(150),
            allowNull: false,
        },
        status: {
            type: Sequelize.SMALLINT.UNSIGNED,
            defaultValue: 100,
            allowNull: false
        }        
});

export default Question;

