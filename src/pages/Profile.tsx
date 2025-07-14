
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, Avatar as AvatarComponent } from '@/components/ui/avatar';
import { Trophy, Medal, Award, User, Settings, History, BarChart3, Calendar, MapPin, Phone, Mail } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);

  // Mock data pour le profil utilisateur
  const userProfile = {
    id: 1,
    name: user?.name || 'Utilisateur',
    email: user?.email || 'user@example.com',
    phone: '+33 6 12 34 56 78',
    address: '123 Rue de la Paix, 75001 Paris',
    bio: 'Passionné de sport depuis 15 ans, je participe régulièrement aux compétitions locales et j\'adore les défis.',
    dateOfBirth: '1990-05-15',
    preferredSport: 'Football',
    level: 'Avancé',
    joinDate: '2023-01-15',
    profileImage: null,
  };

  const userStats = {
    totalCompetitions: 12,
    wins: 7,
    secondPlace: 3,
    thirdPlace: 2,
    totalPoints: 2847,
    averageRank: 2.3,
  };

  const recentCompetitions = [
    { id: 1, name: 'Championnat Football', date: '2024-01-15', rank: 1, status: 'Terminé' },
    { id: 2, name: 'Open Tennis', date: '2024-01-10', rank: 3, status: 'Terminé' },
    { id: 3, name: 'League Basketball', date: '2024-01-05', rank: 2, status: 'Terminé' },
  ];

  const achievements = [
    { id: 1, title: 'Premier Victory', description: 'Remporter votre première compétition', icon: Trophy, unlocked: true },
    { id: 2, title: 'Hat Trick', description: 'Gagner 3 compétitions consécutives', icon: Medal, unlocked: true },
    { id: 3, title: 'Participation Active', description: 'Participer à 10 compétitions', icon: Award, unlocked: true },
    { id: 4, title: 'Champion', description: 'Atteindre 5000 points', icon: Trophy, unlocked: false },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="w-4 h-4 text-yellow-500" />;
      case 2: return <Medal className="w-4 h-4 text-gray-400" />;
      case 3: return <Award className="w-4 h-4 text-amber-600" />;
      default: return <span className="w-4 h-4 flex items-center justify-center text-xs font-bold">#{rank}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header du profil */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-start gap-6">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="w-12 h-12 text-primary" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold">{userProfile.name}</h1>
                    <p className="text-muted-foreground">{userProfile.preferredSport} • {userProfile.level}</p>
                  </div>
                  <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
                    <Settings className="w-4 h-4 mr-2" />
                    {isEditing ? 'Annuler' : 'Modifier'}
                  </Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{userStats.totalCompetitions}</div>
                    <div className="text-sm text-muted-foreground">Compétitions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-500">{userStats.wins}</div>
                    <div className="text-sm text-muted-foreground">Victoires</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{userStats.totalPoints}</div>
                    <div className="text-sm text-muted-foreground">Points</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-500">{userStats.averageRank.toFixed(1)}</div>
                    <div className="text-sm text-muted-foreground">Rang moyen</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="competitions">Compétitions</TabsTrigger>
            <TabsTrigger value="achievements">Succès</TabsTrigger>
            <TabsTrigger value="settings">Paramètres</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Informations personnelles */}
              <Card>
                <CardHeader>
                  <CardTitle>Informations personnelles</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>{userProfile.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span>{userProfile.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{userProfile.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>Membre depuis {new Date(userProfile.joinDate).toLocaleDateString('fr-FR')}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Statistiques détaillées */}
              <Card>
                <CardHeader>
                  <CardTitle>Statistiques</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-yellow-500" />
                        1ère place
                      </span>
                      <Badge variant="outline">{userStats.wins}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-2">
                        <Medal className="w-4 h-4 text-gray-400" />
                        2ème place
                      </span>
                      <Badge variant="outline">{userStats.secondPlace}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-amber-600" />
                        3ème place
                      </span>
                      <Badge variant="outline">{userStats.thirdPlace}</Badge>
                    </div>
                    <div className="pt-4 border-t">
                      <div className="text-sm text-muted-foreground mb-2">Taux de réussite</div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${(userStats.wins / userStats.totalCompetitions) * 100}%` }}
                        ></div>
                      </div>
                      <div className="text-right text-sm text-muted-foreground mt-1">
                        {Math.round((userStats.wins / userStats.totalCompetitions) * 100)}%
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Bio */}
            <Card>
              <CardHeader>
                <CardTitle>À propos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{userProfile.bio}</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="competitions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Historique des compétitions</CardTitle>
                <CardDescription>
                  Vos participations récentes aux compétitions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentCompetitions.map((competition) => (
                    <div key={competition.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          {getRankIcon(competition.rank)}
                        </div>
                        <div>
                          <h3 className="font-semibold">{competition.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {new Date(competition.date).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                      </div>
                      <Badge variant={competition.status === 'Terminé' ? 'default' : 'secondary'}>
                        {competition.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Succès débloqués</CardTitle>
                <CardDescription>
                  Vos accomplissements et récompenses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {achievements.map((achievement) => (
                    <div 
                      key={achievement.id} 
                      className={`p-4 border rounded-lg ${achievement.unlocked ? 'border-primary bg-primary/5' : 'border-muted opacity-50'}`}
                    >
                      <div className="flex items-center gap-3">
                        <achievement.icon className={`w-8 h-8 ${achievement.unlocked ? 'text-primary' : 'text-muted-foreground'}`} />
                        <div>
                          <h3 className="font-semibold">{achievement.title}</h3>
                          <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Paramètres du profil</CardTitle>
                <CardDescription>
                  Modifiez vos informations personnelles
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Nom</Label>
                      <Input id="name" defaultValue={userProfile.name} disabled={!isEditing} />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue={userProfile.email} disabled={!isEditing} />
                    </div>
                    <div>
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input id="phone" defaultValue={userProfile.phone} disabled={!isEditing} />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="sport">Sport préféré</Label>
                      <Input id="sport" defaultValue={userProfile.preferredSport} disabled={!isEditing} />
                    </div>
                    <div>
                      <Label htmlFor="level">Niveau</Label>
                      <Input id="level" defaultValue={userProfile.level} disabled={!isEditing} />
                    </div>
                    <div>
                      <Label htmlFor="address">Adresse</Label>
                      <Input id="address" defaultValue={userProfile.address} disabled={!isEditing} />
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea id="bio" defaultValue={userProfile.bio} disabled={!isEditing} />
                </div>

                {isEditing && (
                  <div className="flex justify-end gap-4">
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Annuler
                    </Button>
                    <Button onClick={() => setIsEditing(false)}>
                      Sauvegarder
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
