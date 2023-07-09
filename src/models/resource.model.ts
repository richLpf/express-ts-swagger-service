import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Resource } from '../interfaces/resource.interface';

export type ResourceCreationAttributes = Optional<Resource, 'id'>;

export class ResourceModel extends Model<Resource, ResourceCreationAttributes> implements Resource {
  public id: number;
  public branch: string;
  public commitMsg: string;
  public data: string;
  public desc: string;
  public gitProjectId: number;
  public projectId: string;
  public channel: string;
  public createdUser: string;
  public status: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof ResourceModel {
  ResourceModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      branch: {
        allowNull: false,
        type: new DataTypes.STRING(4096)
      },
      commitMsg: {
        allowNull: true,
        type: DataTypes.STRING
      },
      data: {
        allowNull: false,
        type: DataTypes.TEXT
      },
      status: {
        type: DataTypes.ENUM,
        values: ['0', '1', '2', '3']
      },
      channel: {
        allowNull: false,
        type: DataTypes.STRING
      },
      gitProjectId: {
        allowNull: true,
        type: DataTypes.INTEGER
      },
      projectId: {
        allowNull: false,
        type: DataTypes.STRING
      },
      createdAt: {
        type: DataTypes.DATE
      },
      createdUser: {
        allowNull: false,
        type: DataTypes.STRING
      },
      updatedAt: {
        type: DataTypes.DATE
      }
    },
    {
      tableName: 'resource',
      sequelize,
    },
  );

  return ResourceModel;
}
