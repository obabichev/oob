import React, {useEffect} from 'react';
import {useFetchPosts} from './hooks';

import Prism from 'prismjs';
import 'prismjs/themes/prism-okaidia.css';
import 'prismjs/components/prism-typescript.min.js'
import {Page} from '../Page';
import {CustomLink} from '../common/CustomLink';
import {IconButton} from '../common/IconButton';
import {useSession} from '../../context/SessionContext';
import {useHistory} from 'react-router';
import {formatDate, fullUserName} from '../../utils/format';


export const PostsPage: React.FunctionComponent<{}> = (props) => {
    const history = useHistory();

    useEffect(() => {
        Prism.highlightAll();
    });

    const [user] = useSession();

    const posts = useFetchPosts();

    const onEditPostClick = (postId: number) => () => {
        history.push(`/post/${postId}/edit`)
    };

    const isOwner = (ownerId: number) => user && user.id === ownerId;

    return <Page>
        {posts.map(post => {
            return <div key={post.id}>
                <CustomLink to={`/post/${post.id}`}>
                    <h2 style={{margin: 0, display: 'inline'}}>
                        {post.status === 'draft' && <span style={{color: '#9975ab'}}>[Draft]</span>}
                        {post.title}
                    </h2>
                </CustomLink>
                {isOwner(post.owner.id) && <IconButton
                    height={20}
                    src="/images/edit_yellow.svg"
                    onClick={onEditPostClick(post.id)}/>}
                <div>
                    <small style={{color: '#a9b7c6'}}>
                        {[fullUserName(post.owner), formatDate(post.createdAt)].join(', ')}
                    </small>
                    <p style={{color: '#a9b7c6', marginTop: 0, marginBottom: 28}}>{post.description}</p>
                </div>
            </div>
        })}
    </Page>
};