import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Trophy, Medal, Award, Users, Calendar, MapPin } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CompetitionService } from '@/services/CompetitionService';

const CompetitionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [competition, setCompetition] = useState<any>(null);
  const [players, setPlayers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [compData, playersData] = await Promise.all([
          CompetitionService.getCompetitionDetails(Number(id)),
          CompetitionService.getCompetitionPlayers(Number(id))
        ]);
        
        setCompetition(compData);
        setPlayers(playersData);
      } catch (err) {
        console.error('Error fetching competition details:', err);
        setError('Failed to load competition details');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 2: return <Medal className="w-5 h-5 text-gray-400" />;
      case 3: return <Award className="w-5 h-5 text-amber-600" />;
      default: return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold">{rank}</span>;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ongoing': return 'bg-green-500';
      case 'Finished': return 'bg-gray-500';
      default: return 'bg-blue-500';
    }
  };

  const getSportEmoji = (category: string) => {
    switch (category?.toLowerCase()) {
      case 'football': return '⚽';
      case 'basketball': return '🏀';
      case 'tennis': return '🎾';
      case 'rugby': return '🏉';
      case 'volleyball': return '🏐';
      case 'golf': return '⛳';
      case 'esport': return '🎮';
      case 'athletics': return '🏃‍♂️';
      case 'swimming': return '🏊‍♂️';
      default: return '🏆';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Chargement des détails de la compétition...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <div className="text-center max-w-md p-6 bg-white rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-2">Erreur de chargement</h3>
          <p className="text-muted-foreground mb-4">{error}</p>
          <div className="flex justify-center gap-4">
            <Button variant="outline" onClick={() => navigate('/competitions')}>
              Retour aux compétitions
            </Button>
            <Button onClick={() => window.location.reload()}>
              Réessayer
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!competition) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <div className="text-center max-w-md p-6 bg-white rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-2">Compétition introuvable</h3>
          <p className="text-muted-foreground mb-4">
            La compétition demandée n'existe pas ou a été supprimée.
          </p>
          <Button onClick={() => navigate('/competitions')}>
            Retour aux compétitions
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => navigate('/competitions')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour aux Compétitions
          </Button>
        </div>

        {/* Competition Header */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="text-6xl">{getSportEmoji(competition.category)}</div>
                <div>
                  <CardTitle className="text-3xl mb-2">{competition.name}</CardTitle>
                  <CardDescription className="text-lg">
                    {competition.description || `Compétition de ${competition.category.toLowerCase()}`}
                  </CardDescription>
                  <div className="flex flex-wrap items-center gap-4 mt-4">
                    <Badge className={`text-white ${getStatusColor(competition.status)}`}>
                      {competition.status === 'Ongoing' ? 'En cours' : 'Terminé'}
                    </Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="w-4 h-4 mr-1" />
                      {competition.players_list?.length || 0} participants
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(competition.start_date)} - {competition.end_date ? formatDate(competition.end_date) : 'N/A'}
                    </div>
                    {competition.location && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 mr-1" />
                        {competition.location}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Players Table */}
        <Card>
          <CardHeader>
            <CardTitle>Participants</CardTitle>
            <CardDescription>
              Liste des joueurs inscrits à cette compétition
            </CardDescription>
          </CardHeader>
          <CardContent>
            {players.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Aucun joueur inscrit pour le moment
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[120px]">Position</TableHead>
                    <TableHead>Joueur</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Téléphone</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {players.map((player, index) => (
                    <TableRow key={player.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {getRankIcon(index + 1)}
                          <span>#{index + 1}</span>
                        </div>
                      </TableCell>
                      <TableCell>{player.name}</TableCell>
                      <TableCell>{player.email || 'N/A'}</TableCell>
                      <TableCell>{player.phone || 'N/A'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CompetitionDetail;