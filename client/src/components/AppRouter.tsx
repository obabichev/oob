import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import {PostsPage} from './post/PostsPage';
import {PostPage} from './post/PostPage';
import {Header} from './Header';
import {Login} from './auth/Login';
import {Register} from './auth/Register';
import {CreatePostPage} from './post/CreatePostPage';
import {EditPostPage} from './post/EditPostPage';

export const AppRouter: React.FunctionComponent<{}> = () => {
    return <Router>
        <Header/>
        <Switch>
            <Route exact path="/" component={PostsPage}/>
            <Route exact path="/post/:id" component={PostPage}/>
            <Route exact path="/post/:id/edit" component={EditPostPage}/>
            <Route exact path="/create-post" component={CreatePostPage}/>
            <Route exact path="/login-fk7df87df989d99" component={Login}/>
            <Route exact path="/register-hhsd9s5d6f7dsf8" component={Register}/>
            <Redirect to="/"/>
        </Switch>
    </Router>
};