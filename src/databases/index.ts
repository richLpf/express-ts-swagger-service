import Sequelize from 'sequelize';
import { NODE_ENV, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } from '../config';
import UserModal from '../models/user.model';
import TaskModel from '../models/task.model';
import ProjectModel from '../models/project.model';

console.log('数据库地址：' + DB_HOST + ': ' + DB_PORT)
const sequelize = new Sequelize.Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  dialect: 'mysql',
  host: DB_HOST,
  port: DB_PORT,
  timezone: '+08:00',
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    underscored: false,
    freezeTableName: true,
  },
  pool: {
    min: 0,
    max: 5,
  },
  logQueryParameters: true,
  logging: false,
  benchmark: true,
} as any);

sequelize.authenticate();

const DB = {
  Users: UserModal(sequelize), // 用户管理
  // ProjectType: ProjectTypeModel(sequelize), // 项目类型
  Projects: ProjectModel(sequelize), // 项目管理
  Task: TaskModel(sequelize),
  sequelize, // connection instance (RAW queries)
  Sequelize, // library
};

export default DB;
