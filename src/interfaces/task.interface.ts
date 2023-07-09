export interface Task {
  id: number;
  type: number;
  title: string;
  projectId: number;
  priority: number;
  startAt: number;
  endAt: number;
  desc: string;
  order: number;
  status: number;
  progress: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface TaskResponse {
  Data: Task[],
  count: number;
}

export interface TaskQuery {
  offset: number;
  limit: number;
}
