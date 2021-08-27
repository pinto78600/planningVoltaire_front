import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Calendrier from '../calendar/Calendrier';
import login from '../home/login';

const index = () => {
    return (
      <Router>
          <Switch>
              <Route exact path='/' component={login} />
              <Route path='/calendar' component={Calendrier} />
              <Redirect to='/'/>
          </Switch>
      </Router>
    );
};

export default index;