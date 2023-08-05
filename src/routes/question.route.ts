import { Router } from 'express';
// import { NextFunction, Request, Response } from 'express';
import { Routes } from '../interfaces/routes.interface';

// import UserController from '../controllers/user.controller';
import ProjectController from '../controllers/project.controller';
import TaskController from '../controllers/task.controller';
// import { checkSignToken, TokenSecretKey, RetCodeMap } from '../utils/util';

// 问题分类的增删改查
// 问题的增删改查

class Route implements Routes {
  public router = Router();
  // public UserController = new UserController();
  public ProjectController = new ProjectController();
  public TaskController = new TaskController();

  constructor() {
    this.initializeRoutes();
  }

  // private whiteActionList = ['Login', 'Register', 'GetUserInfo'];

  private initializeRoutes() {
    // 题目分类
    this.router.post('/category', this.ProjectController.createProject)
    this.router.put('/category', this.ProjectController.createProject)
    this.router.get('/category', this.ProjectController.createProject)
    // 题目相关
    this.router.get('/question', this.TaskController.getTasks)
    this.router.post('/question', this.TaskController.getTasks)
  }
}

export default Route;
