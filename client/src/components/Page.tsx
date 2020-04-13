import React from 'react';

import classes from './Page.module.css';

export const Page: React.FunctionComponent<{ maxWidth?: string }> = ({children, maxWidth = '48rem'}) => {
    return <div className={classes.content} style={{maxWidth}}>
        {children}
    </div>
};
