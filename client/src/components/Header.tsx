import React from 'react';

import classes from './Header.module.css';
import {CustomLink} from './common/CustomLink';
import {useSession} from '../context/SessionContext';
import {IconButton} from './common/IconButton';
import {fetchLogout} from '../service/auth';
import {ProtectedComponent} from './common/ProtectedComponent';
import {useHistory} from 'react-router';

export const Header = () => {
    const [user, setUser] = useSession();
    const history = useHistory();

    const onLogout = () => {
        fetchLogout()
            .then(result => {
                setUser(null);
            })
            .catch(error => {
                console.error('error', error);
            })
    };

    const onCreatePostClick = () => {
        history.push('/create-post');
    };

    return <div className={classes.headerContainer}>
        <div className={classes.headerContent}>
            <div>
                <CustomLink to="/">
                    <strong>
                        oOb
                    </strong>
                </CustomLink>
            </div>
            <ProtectedComponent permission="author">
                <div style={{height: 20, paddingLeft: 10}}>
                    <IconButton height={20}
                                src="/images/create_yellow.svg"
                                onClick={onCreatePostClick}/>
                </div>
            </ProtectedComponent>
            <div style={{flex: 1}}/>
            {user &&
            <>
                <div>
                    {user?.username}
                </div>
                <div style={{height: 24, paddingLeft: 10}}>
                    <IconButton src="/images/exit.svg"
                                onClick={onLogout}/>
                </div>
            </>
            }
        </div>
    </div>
};
