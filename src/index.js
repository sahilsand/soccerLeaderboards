import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect, Switch  } from "react-router-dom";
import './index.css';
import reportWebVitals from './reportWebVitals';
import Leaderboard from './leaderBoardUI';
import ErrorMessage from './ErrorMessage';
import LeagueNavBar from './LeagueNavBar';
import LeagueTable from './ScheduleTable';
import Footer from './footer';

ReactDOM.render(
  <Router>
    <LeagueNavBar />
        <Switch>
          <Route exact path="/" component={LeagueTable} />
          <Route exact path="/schedule" component={LeagueTable} />
          <Route path="/leaderboard" component={Leaderboard} />
          <Route path="/404" component={ErrorMessage} /> {/* Add a route for the Error404 component */}
          <Redirect from="*" to="/404" /> {/* Catch-all route for unknown URLs */}
        </Switch>
        <Footer/>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
