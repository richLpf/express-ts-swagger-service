import { NextFunction, Request, Response } from 'express';
import {
	Task,
	TaskQuery,
	TaskResponse,
} from '../interfaces/task.interface';
import TaskService from '../services/task.service';

class TaskController {
	public TaskService = new TaskService();

  /**
   * 获取渠道列表
   * @param req body: { Action, projectId, offset, limit }
   * @param res Response<any, Record<string, any>
   * @param next 
   */
	public getTasks = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const query: any = req.body;
      const { Action, startAt, endAt, ...params } = query as any;
      console.log("query", query)
      // 默认从第一页查
      params.offset = params.offset || 0;

      // 默认一页10条
      params.limit = params.limit || 100;
      if(!startAt || !endAt){
        res.status(200).json({ RetCode: 10, Message: `缺少请求参数` });
        return
      }

			const findAllData: TaskResponse = await this.TaskService.findAll(
				{ startAt, endAt, ...params }
			);

			res.status(200).json({ RetCode: 0, Message: `列表查询`, ...findAllData });
		} catch (error) {
			next(error);
		}
	};

  /**
   * 通过主键获取单个渠道详情
   * @param req 
   * @param res 
   * @param next 
   */
	public getTaskById = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
      const query: TaskQuery = req.body;
      const { Action, ...params } = query as any;

      if (!params || params.id === undefined) {
        res.status(200).json({ RetCode: 1, Message: '请求参数缺少渠道主键！' });
        return;
      }

      if (typeof params.id !== 'number') {
        res.status(200).json({ RetCode: 1, Message: '请求参数中渠道主键应为 number 类型！' });
        return;
      }

			const findOneData: Task | null =
				await this.TaskService.findTaskById(params.id);

      if (!findOneData) {
        res.status(200).json({ RetCode: 1, Message: '未找到对应渠道！' });
        return;
      }

			res.status(200).json({ RetCode: 0, Data: findOneData, Message: `主键为${params.id}的渠道信息查询结果：` });
		} catch (error) {
			next(error);
		}
	};

  /**
   * 创建一个渠道
   * @param req 
   * @param res 
   * @param next 
   */
	public createTask = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
      const query: TaskQuery = req.body;
      const { Action, ...params } = query as any;
      
      console.log('创建任务参数：')
      console.log(params)
      
      if (!params) {
        res.status(200).json({ RetCode: 1, Message: '请求参数错误！' });
        return;
      }

      if (!params.title) {
        res.status(200).json({ RetCode: 1, Message: '请求参数中缺少任务名称！' });
        return;
      }

			const createData: Task = await this.TaskService.createTask(
				params
			);

			res.status(200).json({ RetCode: 0, Data: createData, Message: '创建成功！' });
		} catch (error) {
			next(error);
		}
	};

  /**
   * 更新一个渠道
   * @param req 
   * @param res 
   * @param next 
   */
	public updateTask = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
      const query: TaskQuery = req.body;
      const { Action, ...params } = query as any;
      
      console.log('更新渠道参数：')
      console.log(params)
      
      if (!params) {
        res.status(200).json({ RetCode: 1, Message: '请求参数错误！' });
        return;
      }

      if (params.id === undefined) {
        res.status(200).json({ RetCode: 1, Message: '请求参数中缺少更新主键id！' });
        return;
      }

			const updateData: [number] = await this.TaskService.updateTask(
				params
			);

			res.status(200).json({ RetCode: 0, Message: '更新渠道信息成功！' });
		} catch (error) {
			next(error);
		}
	};
}

export default TaskController;
