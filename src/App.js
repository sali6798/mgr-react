import React from 'react';
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CreateAccount from "./pages/CreateAccount"
import Login from "./pages/Login"
import Landing from "./pages/Landing"
import GroupView from "./pages/GroupView"

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Switch>
          <Route exact path={"/dashboard"} component={Dashboard} />
          <Route exact path={["/"]} component={Landing} /> 
          <Route exact path="/createaccount" component={CreateAccount} /> 
          <Route exact path="/login" component={Login} /> 
          <Route exact path="/groups" component={GroupView} /> 
          
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
