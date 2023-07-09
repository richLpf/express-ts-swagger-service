import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { ProjectType } from '../interfaces/projectType.interface';

export type ProjectCreationAttributes = Optional<ProjectType, 'id'>;

export class ProjectTypeModel extends Model<ProjectType, ProjectCreationAttributes> implements ProjectType {
  public id: number;
  public name: string;
  public desc: string;
  public status: number;
  public username: string;
  public order: number;
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof ProjectTypeModel {
  ProjectTypeModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING
      },
      desc: {
        allowNull: true,
        type: DataTypes.STRING
      },
      username: {
        allowNull: false,
        type: DataTypes.STRING
      },
      status: {
        allowNull: true,
        type: DataTypes.INTEGER
      },
      order: {
        allowNull: true,
        type: DataTypes.INTEGER
      },
      createdAt: {
        type: DataTypes.DATE
      },
      updatedAt: {
        type: DataTypes.DATE
      }
    },
    {
      tableName: 'projectType',
      sequelize,
    },
  );

  return ProjectTypeModel;
}
