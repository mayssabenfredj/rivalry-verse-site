import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Settings, Mail, Phone, Calendar, Users, Award } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Données utilisateur avec les nouveaux champs
  const userProfile = {
    id: user?.id || 1,
    name: user?.name || 'Utilisateur',
    age: user?.age || 25,
    email: user?.email || 'user@example.com',
    phone: user?.phone || '+33 6 12 34 56 78',
    description: user?.description || 'Un passionné de sport et de compétition',
    team: user?.team || 'Équipe Dynamique',
    logo: user?.logo || '/team-logo.png',
    photo: user?.photo || '/default-avatar.jpg',
    joinDate: '2023-01-15'
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          setPreviewImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header du profil */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-start gap-6">
              <div className="relative group">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={previewImage || userProfile.photo} />
                  <AvatarFallback>
                    <User className="w-12 h-12" />
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Label htmlFor="photo-upload" className="cursor-pointer">
                      <Settings className="w-6 h-6 text-white" />
                      <input
                        id="photo-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                    </Label>
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold">{userProfile.name}</h1>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary">{userProfile.age} ans</Badge>
                      <Badge>
                        <Users className="w-3 h-3 mr-1" />
                        {userProfile.team}
                      </Badge>
                    </div>
                  </div>
                  <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
                    <Settings className="w-4 h-4 mr-2" />
                    {isEditing ? 'Annuler' : 'Modifier'}
                  </Button>
                </div>

                <p className="text-muted-foreground mb-4">{userProfile.description}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">12</div>
                    <div className="text-sm text-muted-foreground">Compétitions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-500">7</div>
                    <div className="text-sm text-muted-foreground">Victoires</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">2847</div>
                    <div className="text-sm text-muted-foreground">Points</div>
                  </div>
                  <div className="text-center">
                    <Award className="w-6 h-6 mx-auto text-amber-500" />
                    <div className="text-sm text-muted-foreground">Niveau 3</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="competitions">Compétitions</TabsTrigger>
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
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span>{userProfile.team}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>Membre depuis {new Date(userProfile.joinDate).toLocaleDateString('fr-FR')}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Description */}
              <Card>
                <CardHeader>
                  <CardTitle>À propos</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{userProfile.description}</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="competitions">
            <Card>
              <CardHeader>
                <CardTitle>Mes compétitions</CardTitle>
                <CardDescription>
                  Votre historique de participation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">Compétition #{item}</h3>
                          <p className="text-sm text-muted-foreground">
                            {new Date().toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                        <Badge variant="outline">Terminé</Badge>
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
                      <Label htmlFor="name">Nom complet</Label>
                      <Input id="name" defaultValue={userProfile.name} disabled={!isEditing} />
                    </div>
                    <div>
                      <Label htmlFor="age">Âge</Label>
                      <Input id="age" type="number" defaultValue={userProfile.age} disabled={!isEditing} />
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
                      <Label htmlFor="team">Équipe</Label>
                      <Input id="team" defaultValue={userProfile.team} disabled={!isEditing} />
                    </div>
                    <div>
                      <Label htmlFor="logo">Logo de l'équipe (URL)</Label>
                      <Input id="logo" defaultValue={userProfile.logo} disabled={!isEditing} />
                    </div>
                    <div>
                      <Label htmlFor="photo">Photo de profil (URL)</Label>
                      <Input id="photo" defaultValue={userProfile.photo} disabled={!isEditing} />
                    </div>
                    {isEditing && (
                      <div>
                        <Label htmlFor="photo-upload">Ou uploader une photo</Label>
                        <Input 
                          id="photo-upload" 
                          type="file" 
                          accept="image/*" 
                          onChange={handleImageChange}
                          disabled={!isEditing}
                        />
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    defaultValue={userProfile.description} 
                    disabled={!isEditing} 
                    rows={4}
                  />
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