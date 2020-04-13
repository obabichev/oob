import React, {useEffect, useState} from 'react';
import {Page} from '../Page';
import {PostForm} from './PostForm';
import {fetchInitPost} from '../../service/post';
import {Maybe, Post} from '../../types';

export const CreatePostPage: React.FunctionComponent<{}> = () => {
    const [post, setPost] = useState<Maybe<Post>>(null);

    useEffect(() => {
        fetchInitPost()
            .then(post => {
                console.log('[obabichev] post 13135', post);
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
