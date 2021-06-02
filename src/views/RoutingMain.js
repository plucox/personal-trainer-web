import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SetProfile from './SetProfile'
import Content from './Content'


const RoutingMain = () => {
    return (
        <>
            <Switch>
                <Route path="/" exact component={Content} />
                <Route path="/profile" exact component={SetProfile} />
            </Switch>
        </>
    )
}

export default RoutingMain;