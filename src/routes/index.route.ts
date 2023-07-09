import { Router } from 'express';
import { NextFunction, Request, Response } from 'express';
import { Routes } from '../interfaces/routes.interface';

import UserController from '../controllers/user.controller';
import ProjectController from '../controllers/project.controller';
import TaskController from '../controllers/task.controller';
import { checkSignToken, TokenSecretKey, RetCodeMap } from '../utils/util';

class Route implements Routes {
  public router = Router();
  public UserController = new UserController();
  public ProjectController = new ProjectController();
  public TaskController = new TaskController();

  constructor() {
    this.initializeRoutes();
  }

  private whiteActionList = ['Login', 'Register', 'GetUserInfo'];

  private initializeRoutes() {
    this.router.post(
      `*`,
      async (req: Request, res: Response, next: NextFunction) => {

        const Action = req.body.Action;

        if (!this.whiteActionList.includes(Action)) {
          // 权限拦截
          const jwtToken = req.header('jwtToken') as string;
          if (!jwtToken) {
            console.log("jwtToken", jwtToken)
            res.status(200).json({ RetCode: RetCodeMap.NotLogIn, Message: '未登录的用户！' });
            return;
          }
          // 这里只需要判断jwtToken是否过期，过期就判断没有登录
          try {
            const userInfo:any = await checkSignToken(jwtToken, TokenSecretKey)
            // TODO: 验证账号密码正确，讲道理这里感觉不用，因为生成的options参数密码是唯一的，生成的Token也是唯一的
            req.headers["remoteUser"] = userInfo.username
          }catch(err){
            // 如果过期，获取refreshToken有效期，如果过期就返回未登录
            const refreshToken = req.header('refreshToken') as string;
            if(!refreshToken){
              res.status(200).json({ RetCode: RetCodeMap.NotLogIn, Message: '未登录的用户！' });
              return;
            }
            try{
              const userInfo:any = await checkSignToken(refreshToken, TokenSecretKey)
              req.headers["remoteUser"] = userInfo?.username
            }catch(err){
              res.status(200).json({ RetCode: RetCodeMap.NotLogIn, Message: '登录凭证已过期！' });
              return;
            } 
          }
        }

        switch (Action) {
          // 用户
          case 'Login':
            this.UserController.login(req, res, next);
            break;
          case 'Register':
            this.UserController.register(req, res, next);
            break;
          case 'GetUserInfo':
            this.UserController.getUserInfo(req, res, next);
            break;
          // 项目管理
          case 'CreateProject':
             this.ProjectController.createProject(req, res, next);
             break;
          case 'UpdateProject':
            this.ProjectController.updateProject(req, res, next)
            break;
          case 'GetProjects':
            this.ProjectController.getProjects(req, res, next)
            break;
          case 'DeleteProject':
              this.ProjectController.deleteProject(req, res, next)
              break;
          // 任务管理
          case 'GetProjectTasks':
            this.TaskController.getTasks(req, res, next);
            break;
          case 'GetTaskById':
            this.TaskController.getTaskById(req, res, next);
            break;
          case 'CreateTask':
            this.TaskController.createTask(req, res, next);
            break;
          case 'UpdateTask':
            this.TaskController.updateTask(req, res, next);
            break;
          default:
              res.status(404).json({ RetCode: 1, Data: null, Message: '未找到对应请求的 Action!' })
              break;
        }
      }
    );
  }
}

export default Route;
