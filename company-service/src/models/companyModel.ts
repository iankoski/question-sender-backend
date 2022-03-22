import Sequelize, {Model, Optional} from 'sequelize';
import database from 'ms-commons/data/db';
import { ICompany } from './companies';


interface ICompanyCreationAttributes extends Optional<ICompany, "id">{}

export interface ICompanyModel extends Model<ICompany, ICompanyCreationAttributes>, ICompany{}

const Company = database.define<ICompanyModel>('company',{
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
        userName: {
            type: Sequelize.STRING(150),
            allowNull: false,
            unique: true
        },  
        password: {
            type: Sequelize.STRING(200),
            allowNull: false,
        },                  
        status: {
            type: Sequelize.SMALLINT.UNSIGNED,
            defaultValue: 100,
            allowNull: false
        },
        urlQrCode: {
            type: Sequelize.STRING(150),
            allowNull: true,            
        }    
       
});
Company.sync();
export default Company;

