import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SetProfile from './SetProfile'
import Content from './Content'
import Dimensions from './Dimensions';


const RoutingMain = () => {
    return (
        <>
            <Switch>
                <Route path="/" exact component={Content} />
                <Route path="/profile" exact component={SetProfile} />
                <Route path="/dimensions" exact component={Dimensions} />
            </Switch>
        </>
    )
}

export default RoutingMain;