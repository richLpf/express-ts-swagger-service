export interface Resource {
    id: number;
    branch: string;
    commitMsg: string;
    data: string;
    status: string;
    gitProjectId: number;
    projectId: string;
    channel: string;
    createdAt: Date;
    createdUser: string;
    updatedAt?: Date;
}

export interface ResourceResponse {
    Data: Resource[],
    count: number;
}

export interface ResourceQuery {
    offset: number;
    limit: number;
}
interface ResourceConfig {
    projectKey: string;
    name?: string;
    router?: ResourceConfigRouter[];
}

interface ResourceConfigRouter {
    name: string;
    order: number;
    url: string;
    isTop: boolean;
    icon: string;
    nameCN: string;
}
export interface ResourceVersion {
    files: string[];
    config: ResourceConfig,
    dependencies: string[];
}

export interface ResourceResult {
    [project: string]: ResourceVersion;
}