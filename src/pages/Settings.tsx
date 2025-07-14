
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Settings as SettingsIcon, Mail, Server, Shield, Save, TestTube } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const smtpSchema = z.object({
  host: z.string().min(1, "Host SMTP requis"),
  port: z.number().min(1, "Port requis").max(65535, "Port invalide"),
  username: z.string().min(1, "Nom d'utilisateur requis"),
  password: z.string().min(1, "Mot de passe requis"),
  encryption: z.enum(['none', 'tls', 'ssl']),
  fromEmail: z.string().email("Email expéditeur invalide"),
  fromName: z.string().min(1, "Nom expéditeur requis"),
});

type SMTPFormData = z.infer<typeof smtpSchema>;

const Settings = () => {
  const { toast } = useToast();
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const form = useForm<SMTPFormData>({
    resolver: zodResolver(smtpSchema),
    defaultValues: {
      host: '',
      port: 587,
      username: '',
      password: '',
      encryption: 'tls',
      fromEmail: '',
      fromName: 'Competition Platform',
    },
  });

  const handleSaveSettings = (data: SMTPFormData) => {
    console.log('Sauvegarde des paramètres SMTP:', data);
    toast({
      title: "Paramètres sauvegardés",
      description: "La configuration SMTP a été mise à jour avec succès.",
    });
  };

  const testConnection = async () => {
    setIsTestingConnection(true);
    try {
      // Simulation d'un test de connexion
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulation d'un résultat aléatoire pour la démo
      const success = Math.random() > 0.3;
      
      if (success) {
        setConnectionStatus('success');
        toast({
          title: "Connexion réussie",
          description: "La configuration SMTP fonctionne correctement.",
        });
      } else {
        setConnectionStatus('error');
        toast({
          title: "Erreur de connexion",
          description: "Impossible de se connecter au serveur SMTP. Vérifiez vos paramètres.",
          variant: "destructive",
        });
      }
    } catch (error) {
      setConnectionStatus('error');
      toast({
        title: "Erreur de test",
        description: "Une erreur est survenue lors du test de connexion.",
        variant: "destructive",
      });
    } finally {
      setIsTestingConnection(false);
    }
  };

  const getConnectionStatusBadge = () => {
    switch (connectionStatus) {
      case 'success':
        return <Badge className="bg-green-500">Connexion OK</Badge>;
      case 'error':
        return <Badge variant="destructive">Erreur</Badge>;
      default:
        return <Badge variant="outline">Non testé</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <SettingsIcon className="w-8 h-8" />
            Paramètres Système
          </h1>
          <p className="text-muted-foreground">Configurez les paramètres de votre plateforme</p>
        </div>

        <Tabs defaultValue="email" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="email">Configuration Email</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="general">Général</TabsTrigger>
          </TabsList>

          <TabsContent value="email" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Mail className="w-5 h-5" />
                      Configuration SMTP
                    </CardTitle>
                    <CardDescription>
                      Configurez votre serveur SMTP pour l'envoi d'emails
                    </CardDescription>
                  </div>
                  {getConnectionStatusBadge()}
                </div>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleSaveSettings)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="host"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Serveur SMTP</FormLabel>
                            <FormControl>
                              <Input placeholder="smtp.gmail.com" {...field} />
                            </FormControl>
                            <FormDescription>
                              Adresse du serveur SMTP
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="port"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Port</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                placeholder="587"
                                {...field}
                                onChange={e => field.onChange(parseInt(e.target.value))}
                              />
                            </FormControl>
                            <FormDescription>
                              Port du serveur SMTP (587 pour TLS, 465 pour SSL)
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nom d'utilisateur</FormLabel>
                            <FormControl>
                              <Input placeholder="votre-email@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Mot de passe</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="••••••••" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="encryption"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Chiffrement</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionner le chiffrement" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="none">Aucun</SelectItem>
                                <SelectItem value="tls">TLS</SelectItem>
                                <SelectItem value="ssl">SSL</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="fromEmail"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email expéditeur</FormLabel>
                              <FormControl>
                                <Input placeholder="noreply@example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="fromName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nom expéditeur</FormLabel>
                              <FormControl>
                                <Input placeholder="Competition Platform" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-6 border-t">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={testConnection}
                        disabled={isTestingConnection}
                      >
                        <TestTube className="w-4 h-4 mr-2" />
                        {isTestingConnection ? 'Test en cours...' : 'Tester la connexion'}
                      </Button>

                      <Button type="submit">
                        <Save className="w-4 h-4 mr-2" />
                        Sauvegarder
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Paramètres de notifications</CardTitle>
                <CardDescription>
                  Configurez les notifications automatiques de la plateforme
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="text-sm font-medium">Nouvelle inscription</div>
                      <div className="text-xs text-muted-foreground">
                        Envoyer un email lorsqu'un utilisateur s'inscrit
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="text-sm font-medium">Nouvelle compétition</div>
                      <div className="text-xs text-muted-foreground">
                        Notifier les utilisateurs des nouvelles compétitions
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="text-sm font-medium">Résultats de compétition</div>
                      <div className="text-xs text-muted-foreground">
                        Envoyer les résultats aux participants
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="text-sm font-medium">Rappels de vote</div>
                      <div className="text-xs text-muted-foreground">
                        Rappeler aux utilisateurs de voter
                      </div>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="text-sm font-medium">Newsletters</div>
                      <div className="text-xs text-muted-foreground">
                        Envoyer des newsletters périodiques
                      </div>
                    </div>
                    <Switch />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Paramètres généraux</CardTitle>
                <CardDescription>
                  Configuration générale de la plateforme
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium">Nom de la plateforme</label>
                    <Input defaultValue="Competition Platform" className="mt-1" />
                  </div>

                  <div>
                    <label className="text-sm font-medium">URL de la plateforme</label>
                    <Input defaultValue="https://competition.example.com" className="mt-1" />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Langue par défaut</label>
                    <Select defaultValue="fr">
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Fuseau horaire</label>
                    <Select defaultValue="Europe/Paris">
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Europe/Paris">Europe/Paris</SelectItem>
                        <SelectItem value="Europe/London">Europe/London</SelectItem>
                        <SelectItem value="America/New_York">America/New_York</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <Button>
                    <Save className="w-4 h-4 mr-2" />
                    Sauvegarder les paramètres
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
