import { NextFunction, Request, Response } from 'express';
// import { CreateUserDto } from '@dtos/users.dto';
import {
	Resource,
	ResourceQuery,
	ResourceResponse,
} from '../interfaces/resource.interface';
import ResourcesService from '../services/resource.service';

class ResourcesController {
	public ResourcesService = new ResourcesService();

  /**
   * 获取单个产品下所有资源
   * @param req body: { Action, projectId }
   * @param res Response<any, Record<string, any>
   * @param next 
   */
	public getResourcesByProjectId = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const query: ResourceQuery = req.body;
      const { Action, ...params } = query as any;

      if (!params || params.projectId === undefined || typeof params.projectId!== 'string') {
        res.status(200).json({ RetCode: 1, Message: '必须按照projectId来查找资源！' });
        return;
      }

      if (params.channel === undefined) {
        res.status(200).json({ RetCode: 1, Message: '查询缺少渠道信息！' });
        return;
      }

      // 默认从第一页查
      params.offset = params.offset || 0;

      // 默认一页10条
      params.limit = params.limit || 20;      

			const findAllData: ResourceResponse = await this.ResourcesService.findAll(
				{ ...params }
			);

			res.status(200).json({ RetCode: 0, Message: `产品${params.projectId}下属资源查询：`, ...findAllData });
		} catch (error) {
			next(error);
		}
	};

  /**
   * 通过主键获取资源
   * @param req 
   * @param res 
   * @param next 
   */
	public getResourcesById = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
      const query: ResourceQuery = req.body;
      const { Action, ...params } = query as any;

      if (!params || params.id === undefined) {
        res.status(200).json({ RetCode: 1, Message: '请求参数缺少资源主键！' });
        return;
      }

      if (typeof params.id !== 'number') {
        res.status(200).json({ RetCode: 1, Message: '请求参数中资源主键应为 number 类型！' });
        return;
      }

      if (params.channel === undefined) {
        res.status(200).json({ RetCode: 1, Message: '查询缺少渠道信息！' });
        return;
      }

			const findOneData: Resource | null =
				await this.ResourcesService.findResourceById(params.id);

      if (!findOneData) {
        res.status(200).json({ RetCode: 1, Message: '未找到对应资源！' });
        return;
      }

			res.status(200).json({ RetCode: 0, Data: findOneData, Message: `主键为${params.id}的资源查询结果：` });
		} catch (error) {
			next(error);
		}
	};

  /**
   * 创建一个资源
   * @param req 
   * @param res 
   * @param next 
   */
	public createResource = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
      const query: ResourceQuery = req.body;
      const { Action, ...params } = query as any;
      
      console.log('创建资源参数：')
      console.log(params)
      
      if (!params) {
        res.status(200).json({ RetCode: 1, Message: '请求参数错误！' });
        return;
      }

      if (!params.branch) {
        res.status(200).json({ RetCode: 1, Message: '请求参数中缺少提交分支信息！' });
        return;
      }

      if (!params.data) {
        res.status(200).json({ RetCode: 1, Message: '请求参数中缺少资源配置信息！' });
        return;
      }
    
      console.log("params", params)

      if (params.projectId === undefined) {
        res.status(200).json({ RetCode: 1, Message: '请求参数中缺少projectId信息！' });
        return;
      }

      if (!params.channel) {
        res.status(200).json({ RetCode: 1, Message: '请求参数中缺少产品渠道信息！' });
        return;
      }

      // 创建时 status 不给就默认给 0
      params.status = (params.status !== undefined && checkStatus(params.status)) ? params.status + '' : '0';

			const createData: Resource = await this.ResourcesService.createResource(
				{ ...params, createdUser: req.header('remoteUser') }
			);

			res.status(201).json({ RetCode: 0, Data: createData, Message: '创建资源成功！' });
		} catch (error) {
			next(error);
		}
	};

  /**
   * 更新一个资源
   * @param req 
   * @param res 
   * @param next 
   */
	public updateResource = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
      const query: ResourceQuery = req.body;
      const { Action, ...params } = query as any;
      
      console.log('更新资源参数：')
      console.log(params)
      
      if (!params) {
        res.status(200).json({ RetCode: 1, Message: '请求参数错误！' });
        return;
      }

      if (params.id === undefined) {
        res.status(200).json({ RetCode: 1, Message: '请求参数中缺少更新主键id！' });
        return;
      }

      // 检测 status
      if (params.status !== undefined && checkStatus(params.status)) {
        params.status = params.status + '';
      } else {
        res.status(200).json({ RetCode: 1, Message: '请求参数中 status 是个枚举，选择范围：0：构建完成 1：部署完成 2：构建失败，3：部署失败！' });
        return;
      }

			const updateData: [number] = await this.ResourcesService.updateResource(
				params
			);

			res.status(200).json({ RetCode: 0, Message: '更新资源成功！', Data: updateData });
		} catch (error) {
			next(error);
		}
	};
}

const checkStatus = (status: string) => {
  // 检测 status
  return ['0', '1', '2', '3'].includes(status);
}

export default ResourcesController;
