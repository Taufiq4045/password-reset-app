import React from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

import Login from './pages/login/login';
import ForgotPassWord from './pages/forgotPassword/forgotPassword';
import Register from './pages/register/register';
import Protected from './pages/protected/protected';
import ChangePassword from './pages/changePassword/changePassword';

import './App.css';


export const AppContext=React.createContext()

function App() {
const [log,setLog]= React.useState(false)
const userId = localStorage.getItem("userId");
const token = localStorage.getItem("token");
  return (
    <div className="App">
        <BrowserRouter>
        <Switch>
          <AppContext.Provider value={[log,setLog]}>
          <Route exact path='/' render = {() => {return <Redirect to='/login' />}} />
          <Route path="/protected" component={Protected} />
          <Route exact path="/login" component={Login}/>
          <Route exact path="/forgot" component={ForgotPassWord}/>
          <Route path="/register" component={Register}/>
          <Route path={`/resetPassword/${userId}/${token}`} component={ChangePassword}/>
          </AppContext.Provider>
        </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;