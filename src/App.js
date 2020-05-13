import React from 'react';
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CreateAccount from "./pages/CreateAccount"

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Switch>
          {/* <Route exact path={["/", "/books"]} component={Books} /> */}
          {/* <Route exact path="/books/:id" component={Detail} /> */}
          {/* <Route exact path="*" component={NoMatch} /> */}
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
