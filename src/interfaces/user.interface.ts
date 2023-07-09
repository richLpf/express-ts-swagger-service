export interface User {
    id: number;
    username: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserResponse {
    Data: User[];
    count: number;
}

export interface UserQuery {
    id: number;
    username: string;
    password: string;
}