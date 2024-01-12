import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

interface Team {
  id: number;
  name: string;
}

interface TeamListProps {
  leagueId: number | null;
  onSelectTeam: (teamId: number) => void;
  selectedTeam: number | null;
}

const TeamList: React.FC<TeamListProps> = ({ leagueId, onSelectTeam, selectedTeam }) => {
  const [teams, setTeams] = useState<Team[]>([]); 

  useEffect(() => {
    async function getTeams() {
      try {
        if (leagueId !== null) {
          const response = await axios.get(`https://statsapi.mlb.com/api/v1/teams?leagueIds=${leagueId}`);
          const teamData = response.data.teams;
          setTeams(teamData);
        } else {
          setTeams([]); //clears teams if nothing is picked
        }
      } catch (error) {
        console.error('Error getting teams:', error);
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
