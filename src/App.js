import React from 'react';
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Switch>
          <Route exact path={"/"} component={Dashboard} />
          {/* <Route exact path="/books/:id" component={Detail} /> */}
          {/* <Route exact path="*" component={NoMatch} /> */}
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
