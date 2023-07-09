export interface ProjectType {
    id: number;
    name: string;
    desc: string;
    username: string;
    status: number;
    order: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface ProjectTypeResponse {
  Data: ProjectType[],
  count: number;
}

export interface ProjectTypeQuery {
  offset: number;
  limit: number;
}