import DB from '../databases';
import { Project, ProjectResponse, CreateProjectQuery } from '../interfaces/project.interface';

class ProjectService {
	public Projects = DB.Projects;

	public async findAll({ limit, offset, ...query }: any): Promise<ProjectResponse> {
		console.log("query", query)
		const { count, rows } = await this.Projects.findAndCountAll({
			where: { 
				...(query || {})
			},
			order: [['priority', 'asc']],
			limit,
			offset
		});
		return { Data: rows, count };
	}

	public async createProject(Data: CreateProjectQuery): Promise<Project> {
		const createProjectData: Project = await this.Projects.create({ ...Data });
		return createProjectData;
	}

	public async updateProject({ id, ...Data }: Project): Promise<[number]> {
		const updateData: [number] = await this.Projects.update({ ...Data }, {
			where: { id }
		})
		return updateData;
	}

	public async deleteProject({ id }: Project): Promise<[number]> {
		const deleteData: any = await this.Projects.destroy({
			where: { id }
		})
		return deleteData;
	}
}

export default ProjectService;
