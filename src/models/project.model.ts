import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Project } from '../interfaces/project.interface';

export type ProjectCreationAttributes = Optional<Project, 'id'>;

export class ProjectModel extends Model<Project, ProjectCreationAttributes> implements Project {
  public id: number;
  public name: string;
  public priority: number;
  public startAt: number;
  public endAt: number;
  public desc: string;
  public order: number;
  public status: number;
  public progress: number;
  public parentProjectId: number;
  public createdUser: string;
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof ProjectModel {
  ProjectModel.init(
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
      priority: {
        type: DataTypes.INTEGER
      },
      startAt: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      endAt: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      status: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      progress: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      createdUser: {
        allowNull: true,
        type: DataTypes.STRING
      },
      parentProjectId: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      desc: {
        allowNull: true,
        type: DataTypes.STRING
      },
      order: {
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
      tableName: 'project',
      sequelize,
      deletedAt: 'deletedAt',
      paranoid: true
    },
  );

  return ProjectModel;
}
