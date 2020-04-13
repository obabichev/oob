import React, {ChangeEventHandler, useEffect, useState} from 'react';
import Prism from 'prismjs';
import {PostComponent} from './PostComponent';
import {updatePost} from '../../service/post';
import {useHistory} from 'react-router';
import {Post, PostStatus} from '../../types';
import {PostFiles} from './PostFiles';

import classes from './PostForm.module.css';
import classNames from 'classnames';

export const PostForm: React.FunctionComponent<{ post: Post }> = ({post}) => {
    const history = useHistory();
    const [form, setForm] = useState({...post});

    const onChange: ChangeEventHandler<{ value: string, name: string; }> = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    };

    useEffect(() => {
        Prism.highlightAll();
    }, [form.content]);

    const onPublish = () => {
        updatePost({...form, status: PostStatus.PUBLISHED})
            .then(post => {
                history.push(`/post/${post.id}`);
            })
            .catch(error => {
                console.error(error.message);
            })
    };

    const onSaveAsDraft = () => {
        updatePost({...form, status: PostStatus.DRAFT})
            .then(post => {
                history.push(`/post/${post.id}`);
            })
            .catch(error => {
                console.error(error.message);
            })
    };

    return <div>
        <div className={classes.formControl}>
            <label htmlFor="title">Title</label>
            <input type="text"
                   onChange={onChange}
                   value={form.title}
                   name="title"/>
        </div>
        <div className={classes.formControl}>
            <label htmlFor="title">Description</label>
            <input type="text"
                   onChange={onChange}
                   value={form.description} name="description"/>
        </div>
        <div className={classes.formControl}>
            <label>Content</label>
            <textarea
                value={form.content}
                onChange={onChange}
                name="content"/>
        </div>

        <div className={classes.marginBottom}>
            <button className={classes.primaryButton}
                    onClick={onPublish}>Publish
            </button>
            <button className={classNames(classes.secondaryButton, classes.marginLeft)}
                    onClick={onSaveAsDraft}>Save as draft
            </button>
        </div>

        <PostFiles postId={post.id}/>

        <PostComponent post={form}/>
    </div>;
};























