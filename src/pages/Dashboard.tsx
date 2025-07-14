import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Trophy, Users, BarChart3, Vote, Plus, Edit, Trash2, Eye, Settings } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import AddCompetitionForm from '@/components/forms/AddCompetitionForm';
import AddPlayerForm from '@/components/forms/AddPlayerForm';
import CreateVoteForm from '@/components/forms/CreateVoteForm';

const Dashboard = () => {
  const { user, isAdmin } = useAuth();
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddCompetition, setShowAddCompetition] = useState(false);
  const [showAddPlayer, setShowAddPlayer] = useState(false);
  const [showCreateVote, setShowCreateVote] = useState(false);

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  const competitions = [
    { id: 1, name: 'Championnat Football', participants: 256, status: 'En cours' },
    { id: 2, name: 'Open Tennis', participants: 64, status: 'Inscription' },
    { id: 3, name: 'League Basketball', participants: 128, status: 'Terminé' },
  ];

  const players = [
    { id: 1, name: 'Alexandre Dubois', email: 'alex@example.com', sport: 'Football', score: 2847 },
    { id: 2, name: 'Sophie Martin', email: 'sophie@example.com', sport: 'Tennis', score: 2756 },
    { id: 3, name: 'Lucas Bernard', email: 'lucas@example.com', sport: 'Basketball', score: 2689 },
  ];

  const results = [
    { id: 1, competition: 'Championnat Football', match: 'Équipe A vs Équipe B', score: '2-1', date: '2024-01-15' },
    { id: 2, competition: 'Open Tennis', match: 'Sophie vs Marie', score: '6-4, 6-2', date: '2024-01-14' },
    { id: 3, competition: 'League Basketball', match: 'Lions vs Tigers', score: '95-87', date: '2024-01-13' },
  ];

  const votes = [
    { id: 1, category: 'Meilleur Joueur', options: ['Alexandre', 'Sophie', 'Lucas'], totalVotes: 1250 },
    { id: 2, category: 'Match de la Semaine', options: ['Football Final', 'Tennis Semi', 'Basket Quarter'], totalVotes: 890 },
  ];

  const handleAddCompetition = (data: any) => {
    console.log('Nouvelle compétition:', data);
    setShowAddCompetition(false);
    // Ici on ajouterait la logique pour sauvegarder en base
  };

  const handleAddPlayer = (data: any) => {
    console.log('Nouveau joueur:', data);
    setShowAddPlayer(false);
    // Ici on ajouterait la logique pour sauvegarder en base
  };

  const handleCreateVote = (data: any) => {
    console.log('Nouveau vote:', data);
    setShowCreateVote(false);
    // Ici on ajouterait la logique pour sauvegarder en base
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{t('welcomeDashboard')}</h1>
          <p className="text-muted-foreground">Bienvenue, {user?.name}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Compétitions</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">+2 ce mois</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Joueurs Actifs</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,247</div>
              <p className="text-xs text-muted-foreground">+15% ce mois</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Matchs Joués</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">+8 cette semaine</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Votes Total</CardTitle>
              <Vote className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,140</div>
              <p className="text-xs text-muted-foreground">+23% ce mois</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="competitions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="competitions">{t('manageCompetitions')}</TabsTrigger>
            <TabsTrigger value="players">{t('managePlayers')}</TabsTrigger>
            <TabsTrigger value="results">{t('results')}</TabsTrigger>
            <TabsTrigger value="voting">{t('voting')}</TabsTrigger>
          </TabsList>

          <TabsContent value="competitions" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Gestion des Compétitions</CardTitle>
                  <Dialog open={showAddCompetition} onOpenChange={setShowAddCompetition}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Nouvelle Compétition
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                      <AddCompetitionForm
                        onSubmit={handleAddCompetition}
                        onCancel={() => setShowAddCompetition(false)}
                      />
                    </DialogContent>
                  </Dialog>
                </div>
                <CardDescription>
                  Créez, modifiez et gérez toutes vos compétitions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Input
                    placeholder="Rechercher une compétition..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  
                  <div className="space-y-3">
                    {competitions.map((comp) => (
                      <div key={comp.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <Trophy className="w-5 h-5 text-primary" />
                          <div>
                            <h3 className="font-semibold">{comp.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {comp.participants} participants
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Badge variant={comp.status === 'En cours' ? 'default' : 'secondary'}>
                            {comp.status}
                          </Badge>
                          <Button variant="ghost" size="sm" onClick={() => window.open(`/competition/${comp.id}`, '_blank')}>
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
                                <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Êtes-vous sûr de vouloir supprimer la compétition "{comp.name}" ? Cette action est irréversible.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Annuler</AlertDialogCancel>
                                <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                  Supprimer
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="players" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Gestion des Joueurs</CardTitle>
                  <Dialog open={showAddPlayer} onOpenChange={setShowAddPlayer}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Nouveau Joueur
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                      <AddPlayerForm
                        onSubmit={handleAddPlayer}
                        onCancel={() => setShowAddPlayer(false)}
                      />
                    </DialogContent>
                  </Dialog>
                </div>
                <CardDescription>
                  Visualisez et gérez tous les joueurs inscrits
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Input
                    placeholder="Rechercher un joueur..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  
                  <div className="space-y-3">
                    {players.map((player) => (
                      <div key={player.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <Users className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{player.name}</h3>
                            <p className="text-sm text-muted-foreground">{player.email}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <div className="font-semibold">{player.sport}</div>
                            <div className="text-sm text-primary">{player.score} pts</div>
                          </div>
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
                                <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Êtes-vous sûr de vouloir supprimer le joueur "{player.name}" ? Cette action est irréversible.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Annuler</AlertDialogCancel>
                                <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                  Supprimer
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="results" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Suivi des Résultats</CardTitle>
                <CardDescription>
                  Consultez et mettez à jour tous les résultats
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {results.map((result) => (
                    <div key={result.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <BarChart3 className="w-5 h-5 text-accent" />
                        <div>
                          <h3 className="font-semibold">{result.match}</h3>
                          <p className="text-sm text-muted-foreground">{result.competition}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="font-semibold">{result.score}</div>
                          <div className="text-sm text-muted-foreground">{result.date}</div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="voting" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Système de Vote</CardTitle>
                  <Dialog open={showCreateVote} onOpenChange={setShowCreateVote}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Nouveau Vote
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                      <CreateVoteForm
                        onSubmit={handleCreateVote}
                        onCancel={() => setShowCreateVote(false)}
                      />
                    </DialogContent>
                  </Dialog>
                </div>
                <CardDescription>
                  Gérez les votes et consultez les résultats
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {votes.map((vote) => (
                    <div key={vote.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold">{vote.category}</h3>
                        <div className="flex items-center gap-2">
                          <Badge>{vote.totalVotes} votes</Badge>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="w-4 h-4 text-destructive" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Êtes-vous sûr de vouloir supprimer le vote "{vote.category}" ? Cette action est irréversible.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Annuler</AlertDialogCancel>
                                <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                  Supprimer
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        {vote.options.map((option, index) => (
                          <div key={index} className="flex items-center justify-between text-sm">
                            <span>{option}</span>
                            <div className="flex items-center space-x-2">
                              <div className="w-20 bg-muted rounded-full h-2">
                                <div 
                                  className="bg-primary h-2 rounded-full"
                                  style={{ width: `${Math.random() * 100}%` }}
                                ></div>
                              </div>
                              <span className="text-muted-foreground">
                                {Math.floor(Math.random() * 500)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
