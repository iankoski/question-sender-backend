import Sequelize, {Model, Optional} from 'sequelize';
import database from 'ms-commons/data/db';
import { INew } from './news';


interface INewCreationAttributes extends Optional<INew, "id">{}

export interface INewModel extends Model<INew, INewCreationAttributes>, INew{}

const New = database.define<INewModel>('new',{
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
        description: {
            type: Sequelize.STRING(2000),
            allowNull: false,
        },
        status: {
            type: Sequelize.SMALLINT.UNSIGNED,
            defaultValue: 100,
            allowNull: false
        },       
        startDate: {
            type: Sequelize.DATE,
            allowNull: false
        },
        endDate: {
            type: Sequelize.DATE,
            allowNull: false
        },
        title: {
            type: Sequelize.STRING(60),
            allowNull: false          
        }
});

export default New;

