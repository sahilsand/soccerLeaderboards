import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './index.css'

function LeagueNavBar() {
    return (
      <Navbar className="page-header"  variant="dark">
            <Navbar.Brand> <img src="/Images/logo.svg" alt="League Web UI"/></Navbar.Brand>
            <Nav className="ml-auto">
              <Nav.Link href="/"><img src="/Images/schedule.png" width="25" height="25"/>Schedule</Nav.Link>
              <Nav.Link href="/leaderboard"><img src="/Images/leaderboard.png" width="25" height="25"/>Leaderboard</Nav.Link>
            </Nav>
        </Navbar>
    );
  }

  export default LeagueNavBar;