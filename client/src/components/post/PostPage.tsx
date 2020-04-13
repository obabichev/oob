import React from 'react';
import {useFetchPost} from './hooks';
import {Page} from '../Page';
import {PostComponent} from './PostComponent';

export const PostPage: React.FunctionComponent<{}> = (props) => {
    // @ts-ignore
    const id = props.match.params.id;

    const post = useFetchPost(id);

    if (!post) {
        return null;
    }

    return <Page>
        <PostComponent post={post}/>
    </Page>
};