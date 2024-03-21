import { useQuery } from '@tanstack/react-query';
import { LiveMatchesResponse, Match } from '../types/matchTypes';
import axios from 'axios';

export const getLiveMatches = async (): Promise<Match[]> => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiSecret = import.meta.env.VITE_API_SECRET;

  try {
    const response = await axios.get<LiveMatchesResponse>(
      `https://livescore-api.com/api-client/matches/live.json`,
      {
        params: {
          key: apiKey,
          secret: apiSecret,
        },
      }
    );

    if (response.data.success) {
      return response.data.data?.match || [];
    } else {
      throw new Error(response.data.error);
    }
  } catch (error) {
    throw error;
  }
};

export const useGetMatches = () =>
  useQuery({
    queryKey: ['liveMatches'],
    queryFn: getLiveMatches,
  });
