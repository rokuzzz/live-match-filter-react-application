import { useState, useEffect } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  List,
  ListItem,
  Typography,
  Paper,
} from '@mui/material';
import { useGetCompetitions } from './api/competitions';
import { getLiveMatches } from './api/matches';
import { Match } from './types/matchTypes';

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
      <FormControl fullWidth sx={{ marginTop: '32px', maxWidth: '300px' }}>
        <InputLabel id='competition-select-label'>Competition</InputLabel>
        <Select
          labelId='competition-select-label'
          id='competition-select'
          value={selectedCompetition}
          label='Competition'
          onChange={handleChange}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 90,
              },
            },
          }}
        >
          {competitions?.map((competition) => (
            <MenuItem key={competition.id} value={competition.id}>
              {`${competition.name}, ${competition.countryName}`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Paper elevation={12} sx={{ marginTop: '16px', padding: '16px' }}>
        <Typography variant='h6' sx={{ fontWeight: '700' }}>
          Matches
        </Typography>
        <List>
          {filteredMatches.length ? (
            filteredMatches.map((match) => (
              <ListItem
                key={match.id}
                sx={{ margin: '4px 0px', paddingLeft: '0px' }}
              >
                <Typography variant='body2'>
                  {match.home.name} {match.scores.score} {match.away.name}
                </Typography>
              </ListItem>
            ))
          ) : (
            <Typography variant='body1'>
              Competition is not selected.
            </Typography>
          )}
        </List>
      </Paper>
    </Box>
  );
}

export default App;
