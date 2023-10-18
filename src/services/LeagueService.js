class LeagueService {    
    constructor() {
        // Initialize the matches array as an empty array
        this.matches = [];
    }

    setMatches(matches) {
        this.matches = matches;
    }

    getMatches() {
       return this.matches;
    }

    getLeaderboard() {
        // Get the list of matches
        const matches = this.getMatches();
        // Create a map to store team data
        const teamData = new Map();
    
        // Calculate points, goals for, and goals against for each team
        for (const match of matches) {
            if (match.matchPlayed) {
                // Home team
                if (!teamData.has(match.homeTeam)) {
                    teamData.set(match.homeTeam, {
                        teamName: match.homeTeam,
                        matchesPlayed: 0,
                        goalsFor: 0,
                        goalsAgainst: 0,
                        points: 0
                    });
                }
                teamData.get(match.homeTeam).matchesPlayed++;
                teamData.get(match.homeTeam).goalsFor += match.homeTeamScore;
                teamData.get(match.homeTeam).goalsAgainst += match.awayTeamScore;
                if (match.homeTeamScore > match.awayTeamScore) {
                    teamData.get(match.homeTeam).points += 3;
                } else if (match.homeTeamScore === match.awayTeamScore) {
                    teamData.get(match.homeTeam).points += 1;
                }
    
                // Away team
                if (!teamData.has(match.awayTeam)) {
                    teamData.set(match.awayTeam, {
                        teamName: match.awayTeam,
                        matchesPlayed: 0,
                        goalsFor: 0,
                        goalsAgainst: 0,
                        points: 0
                    });
                }
                teamData.get(match.awayTeam).matchesPlayed++;
                teamData.get(match.awayTeam).goalsFor += match.awayTeamScore;
                teamData.get(match.awayTeam).goalsAgainst += match.homeTeamScore;
                if (match.awayTeamScore > match.homeTeamScore) {
                    teamData.get(match.awayTeam).points += 3;
                } else if (match.awayTeamScore === match.homeTeamScore) {
                    teamData.get(match.awayTeam).points += 1;
                }
            }
        }
    
        // Convert team data to an array
        const teamArray = [...teamData.values()];
    
        // Sort the team array by points in descending order
        teamArray.sort((a, b) => {
            if (a.points !== b.points) {
                return b.points - a.points;
            } else {
                // First tiebreaker: head-to-head matches
                const headToHeadMatchA = teamArray.find((team) => team.teamName === a.teamName);
                const headToHeadMatchB = teamArray.find((team) => team.teamName === b.teamName);
                if (headToHeadMatchA && headToHeadMatchB) {
                    if (headToHeadMatchA.points !== headToHeadMatchB.points) {
                        return headToHeadMatchB.points - headToHeadMatchA.points;
                    } else {
                        // Second tiebreaker: goal difference
                        const goalDifferenceA = headToHeadMatchA.goalsFor - headToHeadMatchA.goalsAgainst;
                        const goalDifferenceB = headToHeadMatchB.goalsFor - headToHeadMatchB.goalsAgainst;
                        if (goalDifferenceA !== goalDifferenceB) {
                            return goalDifferenceB - goalDifferenceA;
                        } else {
                            // Third tiebreaker: number of scored goals
                            if (headToHeadMatchA.goalsFor !== headToHeadMatchB.goalsFor) {
                                return headToHeadMatchB.goalsFor - headToHeadMatchA.goalsFor;
                            } else {
                                // Final tiebreaker: alphabetic order
                                return a.teamName.localeCompare(b.teamName);
                            }
                        }
                    }
                } else {
                    return 0;
                }
            }
        });
        console.log(teamArray);
        return teamArray;
    }
    
    async fetchAndGenerateLeaderboard() {
        await this.fetchData(); // Call fetchData to set matches
        const leaderboard = this.getLeaderboard(); // Now call getLeaderboard

        return leaderboard;
    }
    
    async fetchData() {
        const url = "http://localhost:3001/api/v1/getAllMatches"; // Replace with your API endpoint
        const authToken = "YuHBdSlDXY000xa8IlCm7Qgq4_s";
      
        try {
            const response = await fetch(url, {
              method: "GET",
              headers: {
                "Authorization": `Bearer ${authToken}` // Include your authentication token in the headers
              }
            });
        
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
        
            const data = await response.json();

            this.setMatches(data.matches);
            // Handle the fetched data here, e.g., update state or perform some action
            return data;
          } catch (error) {
          console.error("Error fetching data:", error);
          // Handle the error, e.g., show an error message to the user
        }
      }
        
}

export default LeagueService;