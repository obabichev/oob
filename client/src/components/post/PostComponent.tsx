import React, {useEffect} from 'react';
import ReactMarkdown from 'react-markdown';
import Prism from 'prismjs';

import classes from './PostComponent.module.css';
import {IconButton} from '../common/IconButton';
import {Post} from '../../types';
import {useHistory} from 'react-router';
import {useSession} from '../../context/SessionContext';

export const PostComponent: React.FunctionComponent<{ post: Post; }> = ({post}) => {
    const history = useHistory();
    const [user] = useSession();

    const isOwner = (ownerId: number) => user && user.id === ownerId;

    useEffect(() => {
        Prism.highlightAll();
    }, [post]);

    const onEditPostClick = (postId: number) => () => {
        history.push(`/post/${postId}/edit`)
    };

    return <div>
        <h1>
            {post.title}
            {' '}
            {isOwner(post.owner.id) && <IconButton
                height={20}
                src="/images/edit_yellow.svg"
                onClick={onEditPostClick(post.id)}/>}
        </h1>

        <div className={classes.postComponent}>
            <ReactMarkdown source={post.content}/>
        </div>
    </div>;
};
