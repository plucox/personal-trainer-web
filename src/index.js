import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Paperbase from './views/Paperbase';
import SignUp from './views/SignUp';
import SignIn from './views/SignIn';



const App = () => {
  return(
    <div>
    {/* <Paperbase /> */}
    <SignIn />
    <SignUp />
    </div>
  );
};

ReactDOM.render(
    <App />,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
