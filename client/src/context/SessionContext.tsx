import React, {useContext, useEffect, useState} from 'react';
import {Maybe, User} from '../types';
import {fetchCurrentUser} from '../service/auth';

interface UserContextApi {
    user: Maybe<User>;
    setUser: (user: Maybe<User>) => void
}

const SessionContext = React.createContext<UserContextApi>({user: null, setUser: () => null});

export const SessionProvider: React.FunctionComponent<{}> = ({children}) => {
    const [user, setUser] = useState<Maybe<User>>(null);

    useEffect(() => {
        fetchCurrentUser()
            .then(user => {
                setUser(user);
            })
            .catch(error => {
                console.error('error', error);
            })
    }, []);

    return <SessionContext.Provider value={{user, setUser}}>
        {children}
    </SessionContext.Provider>
};

export const useSession = () => {
    const {user, setUser} = useContext(SessionContext);
    return [user, setUser] as [typeof user, typeof setUser];
};

export const usePermission = (permission: string) => {
    const {user} = useContext(SessionContext);

    return !!(user?.permissions || []).find(({name}) => name === permission);
};
