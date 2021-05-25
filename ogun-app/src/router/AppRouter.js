import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";
import { EventScreen } from '../components/event/EventScreen';
  

export const AppRouter = () => {
    return (
        <Router>
    
  <div>
   
          <Switch>
            <Route exact path="/" component={ EventScreen } />
         <Redirect to="/" />
          </Switch>
        </div>
      </Router>
    )
}
