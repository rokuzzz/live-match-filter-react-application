import { useState, useEffect } from 'react';
import { Box, SelectChangeEvent, Typography } from '@mui/material';
import { useGetCompetitions } from './api/competitions';
import { useGetMatches } from './api/matches';
import { Match } from './types/matchTypes';
import CompetitionDropdown from './components/CompetitionDropdown';
import MatchesList from './components/MatchesList';

function App() {
  const { data: competitions } = useGetCompetitions();
  const { data: matches, isLoading } = useGetMatches();
  const [selectedCompetition, setSelectedCompetition] = useState('');
  const [filteredMatches, setFilteredMatches] = useState<Match[]>([]);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedCompetition(event.target.value as string);
  };

  useEffect(() => {
    const fetchAndFilterMatches = async () => {
      if (!matches) return;

      if (selectedCompetition === 'All') {
        setFilteredMatches(matches);
      } else {
        const filtered = matches.filter(
          (match) =>
            match.competition.id.toString() === selectedCompetition.toString()
        );
        setFilteredMatches(filtered);
      }
    };

    fetchAndFilterMatches();
  }, [selectedCompetition, matches]);

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
      <MatchesList filteredMatches={filteredMatches} isLoading={isLoading} />
    </Box>
  );
}

export default App;
