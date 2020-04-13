import {User} from '../types';

const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

export const formatDate = (dateString: string): string => {
    const d = new Date(dateString);

    const year = d.getFullYear();
    const date = d.getDate();
    const monthName = months[d.getMonth()];


    return `${date} ${monthName} ${year}`;
};

export const fullUserName = (user: User) => {
    return [user.firstName, user.lastName].filter(part => !!part).join(' ');
};