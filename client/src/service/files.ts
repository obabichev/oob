import {service} from './rest';

export const fetchFilesList = async () => {
    const response = await service.get<{ files: any[] }>('/files');
    return response.files;
};

export const downloadFile = async (fileName: string) => {
    const response = await service.file<any>(`/file/${fileName}`);
    console.log('[obabichev] response', response);
};

export const uploadFile = async (file: any, postId: number) => {
    const response = await service.upload(`/post/${postId}/upload`, file);
    return response.file;
};
