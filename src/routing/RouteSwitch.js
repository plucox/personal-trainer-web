import React from 'react'
import Signup from '../LoginSystem/Signup'
import Login from '../LoginSystem/Login'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Content from '../views/Content';
import Paperbase from '../views/Paperbase';
import { AuthProvider } from '../contexts/AuthContext'
import SignupTrainer from '../LoginSystem/SignupTrainer'
import PrivateRoute from './PrivateRoute';
import Profile from '../views/SetProfile'

const RouteSwitch = () => {
    return (
        <Router>
        <AuthProvider>
            <Switch>
                <Route path="/" exact component={Paperbase} />  
                <Route path="/signup" component={Signup} />
                <Route path="/signupTrainer" component={SignupTrainer} />
                <Route path="/login" component={Login} />

            </Switch>
        </AuthProvider>
        </Router>
    )
}

export default RouteSwitch;

