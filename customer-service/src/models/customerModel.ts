import Sequelize, {Model, Optional} from 'sequelize';
import database from 'ms-commons/data/db';
import { ICustomer } from './customers';


interface ICustomerCreationAttributes extends Optional<ICustomer, "id">{}

export interface ICustomerModel extends Model<ICustomer, ICustomerCreationAttributes>, ICustomer{}

export default database.define<ICustomerModel>('customer',{
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
            type: Sequelize.STRING(200),
            allowNull: false
        },
        phone: {
            type: Sequelize.STRING(15),
            allowNull: true
        },
        status: {
            type: Sequelize.SMALLINT.UNSIGNED,
            defaultValue: 100,
            allowNull: false
        }        
});

