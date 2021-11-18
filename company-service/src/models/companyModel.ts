import Sequelize, {Model, Optional} from 'sequelize';
import database from 'ms-commons/data/db';
import { ICompany } from './companies';


interface ICompanyCreationAttributes extends Optional<ICompany, "id">{}

export interface ICompanyModel extends Model<ICompany, ICompanyCreationAttributes>, ICompany{}

export default database.define<ICompanyModel>('company',{
        id: {
            type: Sequelize.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING(150),
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING(150),
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        /* Dados da geolocalização */
        status: {
            type: Sequelize.SMALLINT.UNSIGNED,
            defaultValue: 100,
            allowNull: false
        },
        city: {
            type: Sequelize.STRING(150),
            allowNull: true
        },
        country: {
            type: Sequelize.STRING(150),
            allowNull: true
        },   
        region: {
            type: Sequelize.STRING(150),
            allowNull: true
        },             
        latitute: {
            type: Sequelize.DOUBLE,
            allowNull: true
        },
        longitute: {
            type: Sequelize.DOUBLE,
            allowNull: true
        },
        timezone: {
            type: Sequelize.STRING(150),
            allowNull: true
        }
});

