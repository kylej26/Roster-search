import React, { useEffect, useState } from 'react';
import axios from 'axios';
interface TeamListProps {
  leagueId: number | null;
  selectedteam: number | null;
}
const TeamList: React.FC<TeamListProps> = ({ leagueId }) => {
  const [teams, setTeams] = useState([]);
  useEffect(() => {
    async function getTeams() {
      try {
        if (leagueId !== null) {
          const response = await axios.get(`https://statsapi.mlb.com/api/v1/teams?leagueIds=${leagueId}`);
          const teamData = response.data.teams;
          setTeams(teamData);
        } else {
          setTeams([]); 
        }
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    }
    getTeams();
  }, [leagueId]);
  return (
    <div className="team">
    
    </div>
  );
};
export default TeamList;