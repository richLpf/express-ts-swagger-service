import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Task } from '../interfaces/task.interface';

export type TaskCreationAttributes = Optional<Task, 'id'>;

export class TaskModel extends Model<Task, TaskCreationAttributes> implements Task {
  public id: number;
  public type: number;
  public title: string;
  public projectId: number;
  public priority: number;
  public startAt: number;
  public endAt: number;
  public desc: string;
  public order: number;
  public status: number;
  public progress: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof TaskModel {
  TaskModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      type: {
        allowNull: true,
        type: DataTypes.INTEGER
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING(1234)
      },
      desc: {
        allowNull: true,
        type: DataTypes.TEXT
      },
      projectId: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      priority: {
        allowNull: true,
        type: DataTypes.INTEGER
      },
      startAt: {
        type: DataTypes.INTEGER
      },
      endAt: {
        type: DataTypes.INTEGER
      },
      order: {
        allowNull: true,
        type: DataTypes.INTEGER
      },
      progress: {
        allowNull: true,
        type: DataTypes.INTEGER
      },
      status: {
        type: DataTypes.INTEGER
      },
      createdAt: {
        type: DataTypes.DATE
      },
      updatedAt: {
        type: DataTypes.DATE
      },
    },
    {
      tableName: 'task',
      sequelize,
      deletedAt: 'deletedAt',
      paranoid: true
    },
  );

  return TaskModel;
}
