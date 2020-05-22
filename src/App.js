import React from 'react';
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CreateAccount from "./pages/CreateAccount"
import Login from "./pages/Login"
import Landing from "./pages/Landing"
import GroupView from "./pages/GroupView"
import ManageGroup from "./pages/ManageGroup"
import Test from "./pages/Test"
import MyAccount from "./pages/MyAccount"
import "./App.css"

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Switch>
          <Route exact path={"/dashboard"} component={Dashboard} />
          <Route exact path={["/", "/logout"]} component={Landing} /> 
          <Route exact path={"/test"} component={Test} /> 
          <Route exact path="/createaccount" component={CreateAccount} /> 
          <Route exact path="/manage/:id" component={ManageGroup} /> 
          <Route exact path="/login" component={Login} />
          <Route exact path="/groups" component={GroupView} /> 
          <Route exact path="/myaccount" component={MyAccount} /> 
          
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
