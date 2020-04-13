import React from 'react';
import {usePermission} from '../../context/SessionContext';

export const ProtectedComponent: React.FunctionComponent<{ permission: string; }> = ({permission, children}) => {
    const isAllowed = usePermission(permission);

    return <>
        {isAllowed && children}
    </>;
};