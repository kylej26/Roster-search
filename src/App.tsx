import React, { useState } from 'react';
import './App.css';
import LeagueSelector from './leagueselector';
import MLBStats from './MLBstats';
import TeamList from './TeamList';

function App() {
  const [selectedLeague, setSelectedLeague] = useState<number | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<number | null>(null);

  const handleSelectLeague = (leagueId: number) => {
    setSelectedLeague(leagueId);
  };

  const handleSelectTeam = (teamId: number) => {
    setSelectedTeam(teamId);
  };

  return (
    <div className="App">
      <h1 className="header">MLB Team Selector</h1>
      <LeagueSelector onSelectLeague={handleSelectLeague} onSelectTeam={handleSelectTeam} />
      <TeamList leagueId={selectedLeague} onSelectTeam={handleSelectTeam} selectedTeam={selectedTeam} />
      {selectedLeague && <MLBStats leagueId={selectedLeague} selectedteam={selectedTeam} />}
    </div>
  );
}

export default App;
