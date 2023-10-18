import React, { useEffect, useState } from 'react';
import LeagueService from './services/LeagueService';
import './App.module.css';
import './index.css'

function App() {
  const [matches, setMatches] = useState([]);
  const leagueService = new LeagueService();
  useEffect(() => {
    async function fetchMatches() {
      try {
        const data = await leagueService.fetchData();
        setMatches(data.matches);
      } catch (error) {
        console.error(error);
      }
    }

    fetchMatches();
  }, []);

  return (
    <div>
    </div>
  );
}

export default App;
