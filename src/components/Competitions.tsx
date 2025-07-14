
import React from 'react';
import { Calendar, Users, Trophy, Clock, MapPin, Eye } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Competitions = () => {
  const { t } = useLanguage();

  const competitions = [
    {
      id: 1,
      title: 'Championnat de Football',
      description: 'Tournoi inter-clubs avec 16 équipes participantes',
      sport: 'Football',
      participants: 256,
      startDate: '2024-02-15',
      endDate: '2024-03-20',
      location: 'Stade Municipal',
      status: 'En cours',
      prize: '5000€',
      image: '⚽',
      progress: 65
    },
    {
      id: 2,
      title: 'Open de Tennis',
      description: 'Tournoi ouvert à tous les niveaux',
      sport: 'Tennis',
      participants: 64,
      startDate: '2024-03-01',
      endDate: '2024-03-10',
      location: 'Centre Sportif',
      status: 'Inscription',
      prize: '2000€',
      image: '🎾',
      progress: 0
    },
    {
      id: 3,
      title: 'League Basketball',
      description: 'Championnat régional de basketball',
      sport: 'Basketball',
      participants: 128,
      startDate: '2024-01-20',
      endDate: '2024-02-28',
      location: 'Gymnase Central',
      status: 'Terminé',
      prize: '3000€',
      image: '🏀',
      progress: 100
    },
    {
      id: 4,
      title: 'Tournoi de Volleyball',
      description: 'Compétition féminine de volleyball',
      sport: 'Volleyball',
      participants: 96,
      startDate: '2024-03-15',
      endDate: '2024-03-25',
      location: 'Salle des Sports',
      status: 'À venir',
      prize: '1500€',
      image: '🏐',
      progress: 0
    },
    {
      id: 5,
      title: 'Championship Rugby',
      description: 'Tournoi élite de rugby à XV',
      sport: 'Rugby',
      participants: 180,
      startDate: '2024-04-01',
      endDate: '2024-05-15',
      location: 'Stade Régional',
      status: 'Inscription',
      prize: '8000€',
      image: '🏉',
      progress: 0
    },
    {
      id: 6,
      title: 'Coupe de Handball',
      description: 'Compétition nationale de handball',
      sport: 'Handball',
      participants: 144,
      startDate: '2024-02-10',
      endDate: '2024-03-15',
      location: 'Palais des Sports',
      status: 'En cours',
      prize: '4000€',
      image: '🤾',
      progress: 45
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'En cours': return 'bg-green-500';
      case 'Terminé': return 'bg-gray-500';
      case 'À venir': return 'bg-blue-500';
      case 'Inscription': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short'
    });
  };

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
          {competitions.map((competition) => (
            <Card key={competition.id} className="overflow-hidden hover-glow hover-scale group">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{competition.image}</div>
                  <Badge 
                    className={`text-white ${getStatusColor(competition.status)}`}
                  >
                    {competition.status}
                  </Badge>
                </div>

                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {competition.title}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {competition.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="w-4 h-4 mr-2" />
                    {competition.participants} participants
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-2" />
                    {formatDate(competition.startDate)} - {formatDate(competition.endDate)}
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-2" />
                    {competition.location}
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Trophy className="w-4 h-4 mr-2" />
                    Prix: {competition.prize}
                  </div>
                </div>

                {competition.progress > 0 && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Progression</span>
                      <span className="font-medium">{competition.progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-500"
                        style={{ width: `${competition.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                <Button className="w-full group" variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  {t('viewDetails')}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="group">
            Voir Toutes les Compétitions
            <Trophy className="ml-2 h-4 w-4 transition-transform group-hover:scale-110" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Competitions;
