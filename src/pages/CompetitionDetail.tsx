
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Trophy, Medal, Award, Users, Calendar, MapPin, Eye, Edit, Trash2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

const CompetitionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();

  // Mock data - dans une vraie app, cela viendrait d'une API
  const competition = {
    id: parseInt(id || '1'),
    title: 'Championnat de Football',
    description: 'Tournoi inter-clubs avec 16 équipes participantes',
    sport: 'Football',
    startDate: '2024-02-15',
    endDate: '2024-03-20',
    location: 'Stade Municipal',
    status: 'En cours',
    prize: '5000€',
    coverImage: '⚽',
    maxParticipants: 64,
    currentParticipants: 48
  };

  const participants = [
    { id: 1, name: 'Alexandre Dubois', email: 'alex@example.com', score: 2847, rank: 1, status: 'Actif' },
    { id: 2, name: 'Sophie Martin', email: 'sophie@example.com', score: 2756, rank: 2, status: 'Actif' },
    { id: 3, name: 'Lucas Bernard', email: 'lucas@example.com', score: 2689, rank: 3, status: 'Actif' },
    { id: 4, name: 'Marie Leroy', email: 'marie@example.com', score: 2634, rank: 4, status: 'Actif' },
    { id: 5, name: 'Pierre Moreau', email: 'pierre@example.com', score: 2578, rank: 5, status: 'Éliminé' }
  ];

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
      case 'En cours': return 'bg-green-500';
      case 'Terminé': return 'bg-gray-500';
      case 'À venir': return 'bg-blue-500';
      case 'Inscription': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const handleDeleteCompetition = () => {
    console.log('Suppression de la compétition:', id);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour au Dashboard
          </Button>
        </div>

        {/* Header de la compétition */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="text-6xl">{competition.coverImage}</div>
                <div>
                  <CardTitle className="text-3xl mb-2">{competition.title}</CardTitle>
                  <CardDescription className="text-lg">{competition.description}</CardDescription>
                  <div className="flex items-center gap-4 mt-4">
                    <Badge className={`text-white ${getStatusColor(competition.status)}`}>
                      {competition.status}
                    </Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="w-4 h-4 mr-1" />
                      {competition.currentParticipants}/{competition.maxParticipants}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-1" />
                      {competition.startDate} - {competition.endDate}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-1" />
                      {competition.location}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Edit className="w-4 h-4 mr-2" />
                  Modifier
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Supprimer
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                      <AlertDialogDescription>
                        Êtes-vous sûr de vouloir supprimer cette compétition ? Cette action est irréversible.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Annuler</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDeleteCompetition} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                        Supprimer
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Participants</p>
                  <p className="text-2xl font-bold">{competition.currentParticipants}</p>
                </div>
                <Users className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Prix Total</p>
                  <p className="text-2xl font-bold">{competition.prize}</p>
                </div>
                <Trophy className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Joueurs Actifs</p>
                  <p className="text-2xl font-bold">{participants.filter(p => p.status === 'Actif').length}</p>
                </div>
                <Eye className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Éliminés</p>
                  <p className="text-2xl font-bold">{participants.filter(p => p.status === 'Éliminé').length}</p>
                </div>
                <Medal className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Classement des participants */}
        <Card>
          <CardHeader>
            <CardTitle>Classement des Participants</CardTitle>
            <CardDescription>
              Liste des joueurs inscrits et leur position actuelle
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Position</TableHead>
                  <TableHead>Joueur</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {participants.map((participant) => (
                  <TableRow key={participant.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {getRankIcon(participant.rank)}
                        <span>#{participant.rank}</span>
                      </div>
                    </TableCell>
                    <TableCell>{participant.name}</TableCell>
                    <TableCell>{participant.email}</TableCell>
                    <TableCell>
                      <span className="font-semibold text-primary">{participant.score} pts</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={participant.status === 'Actif' ? 'default' : 'secondary'}>
                        {participant.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Retirer le joueur</AlertDialogTitle>
                              <AlertDialogDescription>
                                Êtes-vous sûr de vouloir retirer {participant.name} de cette compétition ?
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Annuler</AlertDialogCancel>
                              <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                Retirer
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CompetitionDetail;
