import api from '@/services/api';

export const authService = {
  async login(phone: string, password: string): Promise<{
    success: boolean;
    message?: string;
    token?: string;
    role?: 'admin' | 'player' | 'voter';
  }> {
    try {
      // 1. Envoi des credentials au endpoint de login
      const response = await api.post('/auth/login', { phone, password });
      
      // 2. Vérification de la réponse
      if (response.data.token) {
        return {
          success: true,
          token: response.data.token,
          role: response.data.role // 'player' ou 'voter'
        };
      }
      
      return {
        success: false,
        message: response.data.message || 'Authentification échouée'
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur de connexion'
      };
    }
  },

  async signup(userData: {
    name: string;
    age: number;
    phone: string;
    password: string;
    email?: string;
    photo?: string;
  }): Promise<{
    success: boolean;
    message?: string;
    voter?: any;
    existing_user_id?: string;
    can_convert?: boolean;
  }> {
    try {
      const response = await api.post('/auth/register', userData);
      
      if (response.status === 201) {
        return {
          success: true,
          voter: response.data.voter,
          message: 'Inscription réussie'
        };
      }

      if (response.status === 409) {
        return {
          success: false,
          message: response.data.message,
          existing_user_id: response.data.existing_user_id,
          can_convert: response.data.can_convert
        };
      }

      return {
        success: false,
        message: response.data.message || 'Erreur lors de l\'inscription'
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors de l\'inscription'
      };
    }
  }
};