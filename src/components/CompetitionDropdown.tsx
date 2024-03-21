import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { CompetitionWithCountry } from '../api/competitions';

interface DropdownProps {
  selectedCompetition: string;
  handleChange: (event: SelectChangeEvent) => void;
  competitions?: CompetitionWithCountry[];
}

function CompetitionDropdown({
  selectedCompetition,
  handleChange,
  competitions,
}: DropdownProps) {
  return (
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
        <MenuItem value={'All'}>All</MenuItem>
        {competitions?.map((competition) => (
          <MenuItem key={competition.id} value={competition.id}>
            {`${competition.name}, ${competition.countryName}`}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default CompetitionDropdown;
