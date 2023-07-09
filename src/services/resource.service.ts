import DB from '../databases';
import { Resource, ResourceResponse } from '../interfaces/resource.interface';

class ResourceService {
	public Resources = DB.Resources;

	public async findAll({ limit, offset, ...query }: any): Promise<ResourceResponse> {
		console.log("query", query)
		const { count, rows } = await this.Resources.findAndCountAll({
			where: { ...(query || {}) },
			order: [
				['updatedAt', 'desc']
			],
			limit,
			offset
		});
		return { Data: rows, count };
	}

	public async findResourceById(Id: number): Promise<Resource | null> {
		const findResource: Resource | null = await this.Resources.findByPk(Id);
		return findResource;
	}

	// TODO: 在存入资源的时候要判断下资源是否有效，如果无效，则将状态改为失败
	public async createResource(Data: Resource): Promise<Resource> {
		const createUserData: Resource = await this.Resources.create({ ...Data });
		return createUserData;
	}

	public async updateResource({ id, ...Data }: Resource): Promise<[number]> {
		const updateData: [number] = await this.Resources.update({ ...Data }, {
			where: { id }
		})
		return updateData;
	}
}

export default ResourceService;
