import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { User} from '../interfaces/user.interface';

export type UserCreationAttributes = Optional<User, 'id'>;

export class UserModel extends Model<User, UserCreationAttributes> implements User {
  public id: number;
  public username: string;
  public password: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof UserModel {
    UserModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      username: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING
      },
      updatedAt: {
        type: DataTypes.DATE
      },
      createdAt: {
        type: DataTypes.DATE
      }
    },
    {
      tableName: 'user',
      sequelize,
      deletedAt: 'deletedAt',
      paranoid: true
    },
  );

  return UserModel;
}
