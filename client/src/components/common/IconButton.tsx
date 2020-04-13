import React from 'react';

import classes from './IconButton.module.css';

interface IconButtonProps {
    src: string;
    onClick?: () => void;
    width?: number;
    height?: number;
}

export const IconButton: React.FunctionComponent<IconButtonProps> = (
    {
        src,
        onClick = () => null,
        width = 24,
        height = 24
    }
) => {
    return <img onClick={onClick}
                width={width}
                height={height}
                src={src}
                className={classes.icon}/>;
};