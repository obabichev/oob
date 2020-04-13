import {service} from './rest';
import {Post} from '../types';


export const fetchPosts = async () => {
    const response = await service.get<{ posts: Post[] }>('/post');
    return response.posts;
};

export const fetchPost = async (id: number | string) => {
    const response = await service.get<{ post: Post }>(`/post/${id}`);
    return response.post;
};

export const updatePost = async (post: Post) => {
    const response = await service.put<{ post: Post; }>(`/post/${post.id}`, post);
    return response.post;
};

export const fetchInitPost = async () => {
    const response = await service.get<{ post: Post }>('/post', {status: 'init'});
    return response.post;
};

export const fetchPostFiles = async (postId: number) => {
    const response = await service.get<{ files: any[] }>(`/post/${postId}/files`);
    return response.files;
};
