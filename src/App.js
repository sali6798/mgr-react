import React from 'react';
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CreateAccount from "./pages/CreateAccount"
import Login from "./pages/Login"
import Landing from "./pages/Landing"

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
          
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
