import {service} from './rest';
import {Maybe, User} from '../types';

export const fetchRegister = async (credentials: { username: string, password: string, email: string, firstName: string, lastName: string }) => {
    const {user} = await service.post<{ user: User }>('/register', credentials);
    return user;
};

export const fetchLogin = async (credentials: { email: string, password: string }) => {
    const {user} = await service.post<{ user: User }>('/login', credentials);
    return user;
};

export const fetchCurrentUser = async () => {
    const {user} = await service.get<{ user: Maybe<User> }>('/user');
    return user;
};

export const fetchLogout = async () => {
    return service.get('/logout');
};
