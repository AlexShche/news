import React from 'react'
import {Route, Switch} from 'react-router-dom';

// pages
import Main from "../pages/Main/Main";
import PostShow from "../pages/PostShow/PostShow";

export function Routes() {
    return (
        <Switch>
            <Route exact path="/" component={Main}/>
            <Route path='/:id' component={PostShow} />
        </Switch>
    )
}