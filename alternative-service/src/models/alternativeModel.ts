import Sequelize, {Model, Optional} from 'sequelize';
import database from 'ms-commons/data/db';
import { IAlternative } from './alternatives';


interface IAlternativeCreationAttributes extends Optional<IAlternative, "id">{}

export interface IAlternativeModel extends Model<IAlternative, IAlternativeCreationAttributes>, IAlternative{}

const Alternative = database.define<IAlternativeModel>('alternative',{
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

export default Alternative;

