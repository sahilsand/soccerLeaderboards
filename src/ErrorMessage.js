import React from 'react';
import LeagueNavBar from './App';
import './App.module.css';

import './index.css'

function ErrorMessage() {
  
    return (
      <div>
        <LeagueNavBar />
        <img src = "/Images/404.png" class = "center"></img>
      </div>
    );
  }

  export default ErrorMessage;