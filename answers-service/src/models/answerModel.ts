import Sequelize, {Model, Optional} from 'sequelize';
import database from 'ms-commons/data/db';
import { IAnswer } from './answers';


interface IAnswerCreationAttributes extends Optional<IAnswer, "id">{}

export interface IAnswerModel extends Model<IAnswer, IAnswerCreationAttributes>, IAnswer{}

const Answer = database.define<IAnswerModel>('answer',{
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
        questionId: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: false,        
        },   
        alternativeId: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: false,        
        },
        status: {
            type: Sequelize.SMALLINT.UNSIGNED,
            defaultValue: 100,
            allowNull: false
        },
        deviceId: {
            type: Sequelize.STRING(200),
            allowNull: false
        }   
});

export default Answer;

