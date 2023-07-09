import { NextFunction, Request, Response } from 'express';
import { ProjectType, ProjectTypeQuery, ProjectTypeResponse } from 'interfaces/projectType.interface';
import ProjectTypeService from '../services/projectType.service';
import { pageSize } from '../utils/util'

class ProjectTypeController {
  public ProjectTypeService = new ProjectTypeService();

  public createProjectType = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query: ProjectTypeQuery = req.body;
      const remoteUser = req.header('remoteUser')
      const { Action, ...params } = query as any;
      
      console.log('创建项目类型参数：')
      console.log(params)

      if (!params.name) {
        res.status(200).json({ RetCode: 1, Message: '缺少必要的参数！' });
        return;
      }

	    const createData: ProjectType = await this.ProjectTypeService.createProjectType(
            {
            ...params,
            username: remoteUser
            }
		);
		res.status(201).json({ RetCode: 0, Data: createData, Message: '创建项目类型成功！' });
		} catch (error) {
			next(error);
		}
  }

  public getProjectType = async (req: Request, res: Response, next: NextFunction) => {
	  try {
		const query: ProjectTypeQuery = req.body;
      let { Action, ...params } = query as any;

      if (!params) {
        res.status(200).json({ RetCode: 1, Message: '请求参数错误！' });
        return;
      }

      params = {
        ...pageSize,
        ...params
      }

      const findAllData: ProjectTypeResponse = await this.ProjectTypeService.findAll(
        { ...params }
      );

      res.status(200).json({ RetCode: 0, Message: `项目列表：`, ...findAllData });
      } catch (error) {
        next(error);
      }
  }

  public updateProjectType = async (req: Request, res: Response, next: NextFunction) => {
		try {
      const query: ProjectTypeQuery = req.body;
      const { Action, ...params } = query as any;
      
      console.log('更新项目参数：')
      console.log(params)
      
      if (!params) {
        res.status(200).json({ RetCode: 1, Message: '请求参数错误！' });
        return;
      }

      if (params.id === undefined) {
        res.status(200).json({ RetCode: 1, Message: '请求参数中缺少更新主键id！' });
        return;
      }

      const updateData: [number] = await this.ProjectTypeService.updateProjectType(
        params
      );

	  res.status(200).json({ RetCode: 0, Message: '更新子项目信息成功！' });
	  } catch (error) {
		next(error);
	  }
  }
  public deleteProjectType = async (req: Request, res: Response, next: NextFunction) => {
    const query = req.body;
    const { id } = query
    if(!id){
        res.status(200).json({ RetCode: 1, Message: '缺少id' });
        return
    }
    const deleteData: [number] = await this.ProjectTypeService.deleteProjectType({id});
    res.status(200).json({ RetCode: 0, Message: 'success', Data: deleteData });
    return;
  }
}

export default ProjectTypeController;