import { List, ListItem, Paper, Typography } from '@mui/material';
import { Match } from '../types/matchTypes';

interface MatchesListProps {
  filteredMatches: Match[];
}

function MatchesList({ filteredMatches }: MatchesListProps) {
  return (
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
          <Typography variant='body1'>Competition is not selected.</Typography>
        )}
      </List>
    </Paper>
  );
}

export default MatchesList;
