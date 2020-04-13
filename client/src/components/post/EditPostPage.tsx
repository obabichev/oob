import React, {useEffect, useState} from 'react';
import {RouteComponentProps} from 'react-router';
import {Maybe, Post} from '../../types';
import {fetchPost} from '../../service/post';
import {Page} from '../Page';
import {PostForm} from './PostForm';

interface EditPostPageProps extends RouteComponentProps<{ id: string }> {
}

export const EditPostPage: React.FunctionComponent<EditPostPageProps> = ({match}) => {
    const [post, setPost] = useState<Maybe<Post>>(null);

    const id = match.params.id;

    useEffect(() => {
        fetchPost(id)
            .then(post => {
                setPost(post);
            })
            .catch(error => {
                console.log('[obabichev] error', error.message);
            })
    }, []);

    if (!post) {
        return null;
    }

    return <Page>
        <PostForm post={post}/>
    </Page>
};
