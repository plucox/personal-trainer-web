import React from 'react'
import Signup from '../LoginSystem/Signup'
import Login from '../LoginSystem/Login'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Content from './Content';
import Paperbase from './Paperbase';
import { AuthProvider } from '../contexts/AuthContext'

const RouteSwitch = () => {
    return (
        <Router>
        <AuthProvider>
            <Switch>
                <Route path="/" exact component={Paperbase} />
                <Route path="/signup" component={Signup} />
                <Route path="/login" component={Login} />          
            </Switch>
        </AuthProvider>
        </Router>
    )
}

export default RouteSwitch;

