import { useQuery } from '@tanstack/react-query';
import { getLiveMatches } from './matches';
import { Competition } from '../types/matchTypes';

export interface CompetitionWithCountry extends Competition {
  countryName: string;
}

const getCompetitions = async (): Promise<CompetitionWithCountry[]> => {
  const matches = await getLiveMatches();
  const competitionsList: { [key: number]: CompetitionWithCountry } = {};

  matches.forEach((match) => {
    const { competition, country } = match;
    if (competition && country && !competitionsList[competition.id]) {
      competitionsList[competition.id] = {
        ...competition,
        countryName: country.name,
      };
    }
  });

  return Object.values(competitionsList);
};

export const useGetCompetitions = () =>
  useQuery({
    queryKey: ['competitions'],
    queryFn: getCompetitions,
  });
