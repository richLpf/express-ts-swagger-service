export interface Project {
    id: number;
    name: string;
    priority: number;
    startAt: number;
    endAt: number;
    progress: number;
    parentProjectId: number;
    desc: string;
    order: number;
    status: number;
    createdUser: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ProjectResponse {
  Data: Project[],
  count: number;
}

export interface CreateProjectQuery {
  id: number;
  name: string;
  priority: number;
  startAt: number;
  endAt: number;
  progress: number;
  parentProjectId: number; // 0 表示主项目
  desc: string;
  order: number;
  status: number; // 0 表示待开始任务 1 执行中 2 待复盘 3 已完成 3 已放弃 
  createdUser: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectQuery {
  offset: number;
  limit: number;
}

export interface VersionQuery {
  AdminUserId: number;
  UserMail: string;
  Channel: string;
  Products: string[];
}

export interface VersionService {
  adminUserId: number;
  channel: string;
  products: string[];
}