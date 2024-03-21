import { useState } from 'react';

import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import './App.css';
import { useGetCompetitions } from './api/competitions';

function App() {
  const { data: competitions } = useGetCompetitions();
  const [selectedCompetition, setSelectedCompetition] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedCompetition(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 300 }}>
      <FormControl fullWidth>
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
                maxHeight: 125,
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
    </Box>
  );
}

export default App;
