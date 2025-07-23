import React, { useState, useEffect } from 'react';
import { Calendar, Users, Trophy, Clock, MapPin, Eye } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { CompetitionService } from '@/services/CompetitionService';

const Competitions = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [competitions, setCompetitions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        const data = await CompetitionService.getCompetitions();
        // Filter to show only ongoing competitions
        const ongoingCompetitions = data.filter((comp: any) => comp.status === 'Ongoing');
        setCompetitions(ongoingCompetitions);
      } catch (error) {
        console.error('Error fetching competitions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompetitions();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ongoing': return 'bg-green-500';
      case 'Finished': return 'bg-gray-500';
      default: return 'bg-blue-500';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short'
    });
  };

  if (loading) {
    return (
      <div className="text-center py-24">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
        <p className="mt-4 text-muted-foreground">Chargement des compétitions...</p>
      </div>
    );
  }

  if (competitions.length === 0) {
    return (
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            {t('competitionsTitle')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            {t('competitionsSubtitle')}
          </p>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm max-w-md mx-auto">
            <Trophy className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Aucune compétition en cours</h3>
            <p className="text-muted-foreground mb-4">
              Il n'y a actuellement aucune compétition active. Revenez plus tard!
            </p>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Actualiser
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            {t('competitionsTitle')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('competitionsSubtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {competitions.map((competition: any) => (
            <Card key={competition.id} className="overflow-hidden hover-glow hover-scale group transition-all duration-300">
              <div className="p-6 h-full flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{getSportEmoji(competition.category)}</div>
                  <Badge className={`text-white ${getStatusColor(competition.status)}`}>
                    {competition.status === 'Ongoing' ? 'En cours' : 'Terminé'}
                  </Badge>
                </div>

                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {competition.name}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  Compétition de {competition.category.toLowerCase()}
                </p>

                <div className="space-y-2 mb-4 flex-grow">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="w-4 h-4 mr-2" />
                    {competition.players_list?.length || 0} participants
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-2" />
                    {formatDate(competition.start_date)} - {competition.end_date ? formatDate(competition.end_date) : 'N/A'}
                  </div>
                </div>

                <Button 
                  className="w-full group mt-auto" 
                  variant="outline"
                  onClick={() => navigate(`/competitions/${competition.id}`)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  {t('viewDetails')}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            size="lg" 
            className="group"
            onClick={() => window.location.reload()}
          >
            Actualiser la liste
            <Trophy className="ml-2 h-4 w-4 transition-transform group-hover:scale-110" />
          </Button>
        </div>
      </div>
    </section>
  );
};

// Helper function to get emoji based on sport category
function getSportEmoji(category: string) {
  switch(category.toLowerCase()) {
    case 'football': return '⚽';
    case 'tennis': return '🎾';
    case 'basketball': return '🏀';
    case 'volleyball': return '🏐';
    case 'rugby': return '🏉';
    case 'handball': return '🤾';
    default: return '🏆';
  }
}

export default Competitions;