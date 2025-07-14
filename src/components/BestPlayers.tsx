
import React from 'react';
import { Medal, Star, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';

const BestPlayers = () => {
  const { t } = useLanguage();

  const players = [
    {
      id: 1,
      name: 'Alexandre Dubois',
      sport: 'Football',
      score: 2847,
      matches: 45,
      winRate: 89,
      avatar: '🏆',
      rank: 1,
      change: '+2'
    },
    {
      id: 2,
      name: 'Sophie Martin',
      sport: 'Tennis',
      score: 2756,
      matches: 38,
      winRate: 87,
      avatar: '⭐',
      rank: 2,
      change: '+1'
    },
    {
      id: 3,
      name: 'Lucas Bernard',
      sport: 'Basketball',
      score: 2689,
      matches: 42,
      winRate: 85,
      avatar: '🎯',
      rank: 3,
      change: '-1'
    },
    {
      id: 4,
      name: 'Emma Rousseau',
      sport: 'Volleyball',
      score: 2634,
      matches: 40,
      winRate: 83,
      avatar: '🌟',
      rank: 4,
      change: '0'
    },
    {
      id: 5,
      name: 'Thomas Petit',
      sport: 'Rugby',
      score: 2578,
      matches: 36,
      winRate: 81,
      avatar: '🚀',
      rank: 5,
      change: '+3'
    },
    {
      id: 6,
      name: 'Camille Moreau',
      sport: 'Handball',
      score: 2523,
      matches: 39,
      winRate: 79,
      avatar: '💎',
      rank: 6,
      change: '-2'
    }
  ];

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'text-yellow-500';
      case 2: return 'text-gray-400';
      case 3: return 'text-amber-600';
      default: return 'text-muted-foreground';
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Medal className="w-5 h-5 text-yellow-500" />;
      case 2: return <Medal className="w-5 h-5 text-gray-400" />;
      case 3: return <Medal className="w-5 h-5 text-amber-600" />;
      default: return <Star className="w-5 h-5 text-muted-foreground" />;
    }
  };

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            {t('bestPlayersTitle')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('bestPlayersSubtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {players.map((player) => (
            <Card key={player.id} className="p-6 hover-glow hover-scale group">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{player.avatar}</div>
                  <div>
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                      {player.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{player.sport}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1">
                  {getRankIcon(player.rank)}
                  <span className={`font-bold ${getRankColor(player.rank)}`}>
                    #{player.rank}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Score</span>
                  <span className="font-semibold text-primary">{player.score.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Matchs</span>
                  <span className="font-semibold">{player.matches}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Victoires</span>
                  <div className="flex items-center space-x-1">
                    <span className="font-semibold text-green-500">{player.winRate}%</span>
                    <div className={`flex items-center text-xs ${
                      player.change.startsWith('+') ? 'text-green-500' : 
                      player.change.startsWith('-') ? 'text-red-500' : 'text-muted-foreground'
                    }`}>
                      {player.change !== '0' && (
                        <TrendingUp className={`w-3 h-3 mr-1 ${
                          player.change.startsWith('-') ? 'rotate-180' : ''
                        }`} />
                      )}
                      {player.change !== '0' && player.change}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t">
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-500"
                    style={{ width: `${player.winRate}%` }}
                  ></div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestPlayers;
