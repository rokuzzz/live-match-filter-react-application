import { useState, useEffect } from 'react';
import { Box, SelectChangeEvent, Typography } from '@mui/material';
import { useGetCompetitions } from './api/competitions';
import { getLiveMatches } from './api/matches';
import { Match } from './types/matchTypes';
import CompetitionDropdown from './components/CompetitionDropdown';
import MatchesList from './components/MatchesList';

function App() {
  const { data: competitions } = useGetCompetitions();
  const [selectedCompetition, setSelectedCompetition] = useState('');
  const [filteredMatches, setFilteredMatches] = useState<Match[]>([]);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedCompetition(event.target.value as string);
  };

  useEffect(() => {
    const getAndFilterMatches = async () => {
      if (!selectedCompetition) {
        setFilteredMatches([]);
        return;
      }

      const matches = await getLiveMatches();
      const filtered = matches.filter(
        (match) =>
          match.competition.id.toString() === selectedCompetition.toString()
      );
      setFilteredMatches(filtered);
    };

    getAndFilterMatches();
  }, [selectedCompetition]);

  return (
    <Box sx={{ padding: '32px' }}>
      <Typography
        variant='h4'
        sx={{ textTransform: 'uppercase', fontWeight: '900' }}
      >
        Live Competitions
      </Typography>
      <CompetitionDropdown
        selectedCompetition={selectedCompetition}
        handleChange={handleChange}
        competitions={competitions}
      />
      <MatchesList filteredMatches={filteredMatches} />
    </Box>
  );
}

export default App;
