import { NextFunction, Request, Response } from 'express';
import { Project, ProjectQuery, ProjectResponse } from 'interfaces/project.interface';
import ProjectService from '../services/project.service';

class ProjectController {
  public ProjectService = new ProjectService();

  public createProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query: ProjectQuery = req.body;
      const remoteUser = req.headers['remoteUser']
      const params  = query as any;
      
      if (!params) {
        res.status(200).json({ RetCode: 1, Message: '请求参数错误！' });
        return;
      }

			const createData: Project = await this.ProjectService.createProject(
				{
          ...params,
          createdUser: remoteUser
        }
			);

			res.status(200).json({ RetCode: 0, Data: createData, Message: '创建项目成功！' });
		} catch (error) {
			next(error);
		}
  }

  public getProjects = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const query: ProjectQuery = req.body;
      const { remoteUser } = req.headers
      const { Action, ...params } = query as any;

      if (!params) {
        res.status(200).json({ RetCode: 1, Message: '请求参数错误！' });
        return;
      }

      // 默认从第一页查
      params.offset = params.offset || 0;

      // 默认一页10条
      params.limit = params.limit || 10;

			const findAllData: ProjectResponse = await this.ProjectService.findAll(
				{ ...params, ...{createdUser: remoteUser} }
			);

			res.status(200).json({ RetCode: 0, Message: `项目列表：`, ...findAllData });
		} catch (error) {
			next(error);
		}
  }

  public updateProject = async (req: Request, res: Response, next: NextFunction) => {
		try {
      const query: ProjectQuery = req.body;
      const { Action, ...params } = query as any;
      
      console.log('更新子项目参数：')
      console.log(params)
      
      if (!params) {
        res.status(200).json({ RetCode: 1, Message: '请求参数错误！' });
        return;
      }

      if (params.id === undefined) {
        res.status(200).json({ RetCode: 1, Message: '请求参数中缺少更新主键id！' });
        return;
      }

			const updateData: [number] = await this.ProjectService.updateProject(
				params
			);

			res.status(200).json({ RetCode: 0, Message: '更新子项目信息成功！' });
		} catch (error) {
			next(error);
		}
  }

  public deleteProject = async (req: Request, res: Response, next: NextFunction) => {
		try {
      const query: ProjectQuery = req.body;
      const { Action, ...params } = query as any;

      if (params.id === undefined) {
        res.status(200).json({ RetCode: 1, Message: '请求参数中缺少更新主键id！' });
        return;
      }

			const deleteData: [number] = await this.ProjectService.deleteProject(
				params
			);

			res.status(200).json({ RetCode: 0, Message: '删除项目成功！' });
		} catch (error) {
			next(error);
		}
  }
}

export default ProjectController;