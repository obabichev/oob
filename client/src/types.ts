export type Maybe<T> = null | T;

export interface User {
    id: number;
    username: string;
    firstName?: string;
    lastName?: string;
    email: string;
    permissions: Permission[];
}

export interface Permission {
    id: number;
    name: string;
}

export enum PostStatus {
    DRAFT = 'draft',
    PROGRESS = 'progress',
    PUBLISHED = 'published',
    DELETED = 'deleted'
}

export interface Post {
    id: number;
    title: string;
    description: string;
    content: string;
    status: PostStatus;
    owner: User;
    createdAt: string;
}

export interface S3File {
    filename: string
    id: number
    key: string
    mimetype: string
    url: string
}