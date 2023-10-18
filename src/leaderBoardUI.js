import React, { useEffect, useState } from 'react';
import LeagueService from './services/LeagueService';
import './App.module.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { TableCell, TableRow } from '@mui/material';
import TableHead from '@mui/material/TableHead';
import './index.css'

function ScheduleLeaderBoard({ matches }) {
  // Check if matches is defined before trying to map over it
  if (!matches || matches.length === 0) {
    return <p>No matches available</p>;
  }
  
  return ( 
    <div>
        <Table style={{ width: 1200 }} align = "center" className='table-font'>
          <TableHead className='table-header table-head-lead'>
            <TableRow>
              <TableCell style={{ fontSize: '12px', fontWeight:'bold'}}>Team Name</TableCell>
              <TableCell style={{ fontSize: '12px', fontWeight:'bold'}}>MP</TableCell>
              <TableCell style={{ fontSize: '12px', fontWeight:'bold'}}>GF</TableCell>
              <TableCell style={{ fontSize: '12px', fontWeight:'bold'}}>GA</TableCell>
              <TableCell style={{ fontSize: '12px', fontWeight:'bold'}}>Points</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className='table-body-lead'>
            {matches.map((match, index) => (
              <TableRow key={index}>
                <TableCell align="left" >
                  <img src={`https://flagsapi.codeaid.io/${match.teamName}.png`} height = "37px" width="53px" style={{ float: 'left' }} />
                  <span className='bold-table-cell' style={{ textAlign: 'right',  margin:'15px' }} align="right">{match.teamName}</span>
                </TableCell>
                <TableCell>
                  <span className='table-cell'>{match.matchesPlayed}</span>
                </TableCell>
                <TableCell>
                  <span className='table-cell'>{match.goalsFor}</span>
                </TableCell>
                <TableCell>
                  <span className='table-cell'>{match.goalsAgainst}</span>
                </TableCell>
                <TableCell>
                  <span className='table-cell'>{match.points}</span>
                </TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
  );
}

function Leaderboard() {
    const [matches, setMatches] = useState([]);
    const leagueService = new LeagueService();
  
    useEffect(() => {
      async function fetchLeaderboard() {
        try {
          const data = await leagueService.fetchAndGenerateLeaderboard();
          setMatches(data);
        } catch (error) {
          console.error(error);
        }
      }
  
      fetchLeaderboard();
    }, []);
  
    return (
      <div>
        <br></br>
        <br></br>
        <br></br>
        
          <h1 align = "center">League Standings</h1>
          <br></br>
          <ScheduleLeaderBoard matches={matches} />
        </div>
    );
  }

  export default Leaderboard;