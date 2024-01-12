import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

interface LeagueSelectorProps {
  onSelectLeague: (leagueId: number) => void;
  onSelectTeam: (teamId: number) => void;
}

const LeagueSelector: React.FC<LeagueSelectorProps> = ({ onSelectLeague, onSelectTeam }) => {
  const [selectedLeague, setSelectedLeague] = useState<number | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<number | null>(null);
  const [leagueOptions, setLeagueOptions] = useState<{ id: number; name: string }[]>([]);
  const [teamOptions, setTeamOptions] = useState<{ id: number; name: string; leagueId: number }[]>([]);
  const [roster, setRoster] = useState<string[]>([]);


  const getLeagues = async () => {
    try {
      const response = await axios.get('https://statsapi.mlb.com/api/v1/leagues');
      const leagues = response.data.leagues;
      const options = leagues
        .filter((league: any) => [103, 104,587, 107,5536,130,5468,110,123
        ,122,118,126,116,111,109,113,112,117].includes(league.id))
        .map((league: any) => ({
          id: league.id,
          name: league.name,
        }));
      if (options.length > 0) {
        setLeagueOptions(options);
        onSelectLeague(options[0].id); 
      }
    } catch (error) {
      console.error('Error fetching leagues:', error);
    }
  };

  
  const fetchTeams = async (leagueId: number) => {
    try {
      const response = await axios.get(`https://statsapi.mlb.com/api/v1/teams?leagueId=${leagueId}`);
      const teams = response.data.teams;
      const options = teams.map((team: any) => ({
        id: team.id,
        name: team.name,
        leagueId: team.league.id,
      }));
      if (options.length > 0) {
        setTeamOptions(options);
        setSelectedTeam(options[0].id); 
        onSelectTeam(options[0].id); 
      }
    } catch (error) {
      console.error('Error fetching teams:', error);
    }
  };

  useEffect(() => {
    getLeagues();
  }, [onSelectLeague]);

  useEffect(() => {
    if (selectedLeague !== null) {
      fetchTeams(selectedLeague); 
    }
  }, [selectedLeague, onSelectTeam]);

  // handles change with league
  const handleLeagueChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = parseInt(event.target.value, 10);
    setSelectedLeague(selectedId);
    onSelectLeague(selectedId);
  };

  // handles change with teams
  const handleTeamChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = parseInt(event.target.value, 10);
    setSelectedTeam(selectedId);
    onSelectTeam(selectedId);
    if (selectedLeague !== null) {
      
      getRosterData(selectedId);
    }
  };

  
  const getRosterData = async (teamId: number) => {
    try {
      const response = await axios.get(`https://statsapi.mlb.com/api/v1/teams/${teamId}/roster`);
      const rosterData = response.data.roster;
      const fullNames = rosterData.map((player: any) => player.person.fullName);
      setRoster(fullNames);
    } catch (error) {
      console.error('Error getting rosters:', error);
    }
  };

  return (
    <div>
      <div>
        <label className="choose1">League:</label>
        <select className="choose" value={selectedLeague || ''} onChange={handleLeagueChange}>
          {leagueOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="choose3">Team:</label>
        <select className="choose2" value={selectedTeam || ''} onChange={handleTeamChange}>
          {teamOptions
            .filter((team) => team.leagueId === selectedLeague)
            .map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
        </select>
      </div>
      <div className="list">
        <h2 className="roster_header">Roster for Selected Team</h2>
        <ul className="players">
          {roster.map((fullName, index) => (
            <li key={index}>{fullName}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LeagueSelector;
