import React from 'react';

import classes from './CustomLink.module.css';
import {Link} from 'react-router-dom';

export const CustomLink: React.FunctionComponent<{ to: string }> = ({children, to}) => {
    return <Link className={classes.a} to={to}>
        {children}
    </Link>
};
