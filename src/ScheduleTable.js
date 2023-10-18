import { useState,useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { TableCell, TableRow } from '@mui/material';
import TableHead from '@mui/material/TableHead';
import './index.css'
import LeagueService from './services/LeagueService';

function ScheduleTable({ matches }) {
    // Check if matches is defined before trying to map over it
    if (!matches || matches.length === 0) {
      return <p>No matches available</p>;
    }
  
    const formatDate = (dateString) => {
      const options = {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false, 
      };
    
      const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
    
      return formattedDate;
    };
    
    return ( 
      <div>
          <Table style={{marginBottom: '60px', marginTop: '20px', width: '90%' }} align = "center" className='table-font'>
            <TableHead className='table-header table-header-dimensions'>
              <TableRow>
                <TableCell style={{ fontSize: '12px', fontWeight:'bold'}}>Match Date</TableCell>
                <TableCell style={{ fontSize: '12px', fontWeight:'bold'}}>Stadium</TableCell>
                <TableCell style={{ fontSize: '12px', fontWeight:'bold'}} align='right'>Home Team</TableCell>
                <TableCell style={{ fontSize: '12px', fontWeight:'bold'}} align='center'></TableCell>
                <TableCell style={{ fontSize: '12px', fontWeight:'bold'}} align='left'>Away Team</TableCell>
                
              </TableRow>
            </TableHead>
            <TableBody className='table-cell-dimensions table-body'>
              {matches.map((match, index) => (
                <TableRow key={index} className={index % 2 === 1 ? 'even-row' : ''}>
                  <TableCell>
                    <span className='table-cell date-table-cell'>{formatDate(match.matchDate)}</span>
                  </TableCell>
                  <TableCell>
                    <span className='table-cell'>{match.stadium}</span>
                  </TableCell>
                  <TableCell align="right">
                    <span className='bold-table-cell' style={{ textAlign: 'left', margin:'15px' }}>{match.homeTeam}</span>
                    <img src={`https://flagsapi.codeaid.io/${match.homeTeam}.png`} height = "37px" width="53px" align="right"/>
                  </TableCell>
                  <TableCell align='center'>
                     <span className='bold-table-cell' style={{ textAlign: 'center' }}>{match.matchPlayed ? match.homeTeamScore : '-'}  : {match.matchPlayed ? match.awayTeamScore : '-'}</span>
                  </TableCell>
                  <TableCell align="left" >
                    <img src={`https://flagsapi.codeaid.io/${match.awayTeam}.png`} height = "37px" width="53px" style={{ float: 'left' }} />
                    <span className='bold-table-cell' style={{ textAlign: 'right',  margin:'15px' }} align="right">{match.awayTeam}</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
    );
  }

  function LeagueTable() {
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
          <h1 align ="center" className='league-schedule-heading'>League Schedule</h1>
          <ScheduleTable matches={matches} />
        </div>
    );
  }

  export default LeagueTable;