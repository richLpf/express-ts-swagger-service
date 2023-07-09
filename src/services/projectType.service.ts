import DB from '../databases';
import { ProjectType, ProjectTypeResponse } from '../interfaces/projectType.interface';

class ProjectTypeService {
	public ProjectType = DB.ProjectType;

	public async findAll({ limit, offset, ...query }: any): Promise<ProjectTypeResponse> {
		console.log("query", query)
		const { count, rows } = await this.ProjectType.findAndCountAll({
			where: { ...(query || {}) },
			order: [['createdAt', 'asc']],
			limit,
			offset
		});
		return { Data: rows, count };
	}

	public async createProjectType(Data: ProjectType): Promise<ProjectType> {
		const createProjectData: ProjectType = await this.ProjectType.create({ ...Data });
		return createProjectData;
	}

	public async updateProjectType({ id, ...Data }: ProjectType): Promise<[number]> {
		const updateData: [number] = await this.ProjectType.update({ ...Data }, {
      where: { id }
    })
		return updateData;
	}

    public async deleteProjectType({ id }: {id: number}): Promise<any>{
        const deleteData = await this.ProjectType.destroy({
            where: {
              id
            }
        });
        return deleteData
    }
}

export default ProjectTypeService;
