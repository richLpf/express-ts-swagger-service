const { Op } = require("sequelize");
import DB from '../databases';
// import { HttpException } from '../exceptions/HttpException';
import { Task, TaskResponse } from '../interfaces/task.interface';
// import { isEmpty } from '../utils/util';

class TaskService {
	public Task = DB.Task;

	public async findAll({ limit, offset, startAt, endAt, type, ...query }: any): Promise<TaskResponse> {
	const { count, rows } = await this.Task.findAndCountAll({
      where: {  
		...query,
		startAt: {
			[Op.or] : { 
				[Op.gte]: startAt,
				[Op.lte]: endAt,
			}
		},
		endAt: {
			[Op.or] : { 
				[Op.gte]: startAt,
				[Op.lte]: endAt
			}
		},
		type: {
			[Op.in]: Array.isArray(type)?type:[type],
		}
	  },
      order: [
        ['priority', 'asc']
      ],
      limit,
      offset
    });
		return { Data: rows, count };
	}

	public async findTaskById(Id: number): Promise<Task | null> {
		const findTask: Task | null = await this.Task.findByPk(Id);

		return findTask;
	}

	public async createTask(Data: Task): Promise<Task> {
		console.log("Data", Data)
		const createTaskData: Task = await this.Task.create({ ...Data });
		return createTaskData;
	}

  public async updateTask({ id, ...Data }: Task): Promise<[number]> {
		const updateData: [number] = await this.Task.update({ ...Data }, {
      where: { id }
    })
		return updateData;
	}
}

export default TaskService;
