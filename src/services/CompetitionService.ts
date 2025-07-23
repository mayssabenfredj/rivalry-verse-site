import api from '@/services/api';

interface Competition {
  id: number;
  name: string;
  category: string;
  status: 'Ongoing' | 'Finished';
  start_date: string;
  end_date: string | null;
  location?: string;
  description?: string;
  players_list?: number[];
  created_at: string;
  updated_at: string;
}

interface Player {
  id: number;
  name: string;
  email: string | null;
  phone: string;
  role: 'player' | 'voter' | 'admin';
  photo?: string;
  team?: string;
}

export const CompetitionService = {
  async getCompetitions(): Promise<Competition[]> {
    try {
      const response = await api.get('/competitions');
      return response.data || [];
    } catch (error) {
      console.error('Error fetching competitions:', error);
      throw new Error('Failed to fetch competitions');
    }
  },
  
  async getCompetitionDetails(id: number): Promise<Competition> {
    try {
      const response = await api.get(`/competitions/${id}`);
      if (!response.data) {
        throw new Error('Competition not found');
      }
      return response.data;
    } catch (error) {
      console.error(`Error fetching competition details for ID ${id}:`, error);
      throw new Error('Failed to fetch competition details');
    }
  },
  
  async getCompetitionPlayers(id: number): Promise<Player[]> {
    try {
      const response = await api.get(`/competitions/${id}/players`);
      return response.data?.players || [];
    } catch (error) {
      console.error(`Error fetching players for competition ${id}:`, error);
      throw new Error('Failed to fetch competition players');
    }
  },

  async addPlayerToCompetition(competitionId: number, playerId: number): Promise<Competition> {
    try {
      const response = await api.post(`/competitions/${competitionId}/players/${playerId}`);
      return response.data;
    } catch (error) {
      console.error(`Error adding player ${playerId} to competition ${competitionId}:`, error);
      throw new Error('Failed to add player to competition');
    }
  },

  async removePlayerFromCompetition(competitionId: number, playerId: number): Promise<void> {
    try {
      await api.delete(`/competitions/${competitionId}/players/${playerId}`);
    } catch (error) {
      console.error(`Error removing player ${playerId} from competition ${competitionId}:`, error);
      throw new Error('Failed to remove player from competition');
    }
  }
};