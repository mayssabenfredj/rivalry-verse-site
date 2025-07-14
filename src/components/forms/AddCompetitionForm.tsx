
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const competitionSchema = z.object({
  title: z.string().min(3, "Le titre doit contenir au moins 3 caractères"),
  description: z.string().min(10, "La description doit contenir au moins 10 caractères"),
  sport: z.string().min(1, "Veuillez sélectionner un sport"),
  startDate: z.string().min(1, "Date de début requise"),
  endDate: z.string().min(1, "Date de fin requise"),
  location: z.string().min(3, "Lieu requis"),
  maxParticipants: z.number().min(2, "Minimum 2 participants"),
  prize: z.string().min(1, "Prix requis"),
});

type CompetitionFormData = z.infer<typeof competitionSchema>;

interface AddCompetitionFormProps {
  onSubmit: (data: CompetitionFormData & { selectedPlayers: number[], coverImage?: File }) => void;
  onCancel: () => void;
}

const AddCompetitionForm: React.FC<AddCompetitionFormProps> = ({ onSubmit, onCancel }) => {
  const [selectedPlayers, setSelectedPlayers] = useState<number[]>([]);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  // Mock data des joueurs disponibles
  const availablePlayers = [
    { id: 1, name: 'Alexandre Dubois', email: 'alex@example.com' },
    { id: 2, name: 'Sophie Martin', email: 'sophie@example.com' },
    { id: 3, name: 'Lucas Bernard', email: 'lucas@example.com' },
    { id: 4, name: 'Marie Leroy', email: 'marie@example.com' },
    { id: 5, name: 'Pierre Moreau', email: 'pierre@example.com' },
    { id: 6, name: 'Emma Dubois', email: 'emma@example.com' },
    { id: 7, name: 'Thomas Petit', email: 'thomas@example.com' },
    { id: 8, name: 'Julie Roux', email: 'julie@example.com' },
  ];

  const form = useForm<CompetitionFormData>({
    resolver: zodResolver(competitionSchema),
    defaultValues: {
      title: '',
      description: '',
      sport: '',
      startDate: '',
      endDate: '',
      location: '',
      maxParticipants: 16,
      prize: '',
    },
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCoverImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const togglePlayerSelection = (playerId: number) => {
    setSelectedPlayers(prev => 
      prev.includes(playerId) 
        ? prev.filter(id => id !== playerId)
        : [...prev, playerId]
    );
  };

  const handleFormSubmit = (data: CompetitionFormData) => {
    onSubmit({
      ...data,
      selectedPlayers,
      coverImage: coverImage || undefined
    });
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Créer une Nouvelle Compétition</CardTitle>
        <CardDescription>
          Remplissez les informations pour créer une nouvelle compétition
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Informations de base */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Titre de la compétition</FormLabel>
                      <FormControl>
                        <Input placeholder="Championnat de Football" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sport"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sport</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner un sport" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="football">Football</SelectItem>
                          <SelectItem value="tennis">Tennis</SelectItem>
                          <SelectItem value="basketball">Basketball</SelectItem>
                          <SelectItem value="volleyball">Volleyball</SelectItem>
                          <SelectItem value="rugby">Rugby</SelectItem>
                          <SelectItem value="handball">Handball</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lieu</FormLabel>
                      <FormControl>
                        <Input placeholder="Stade Municipal" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date de début</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date de fin</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="maxParticipants"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre max de participants</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="prize"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prix</FormLabel>
                        <FormControl>
                          <Input placeholder="5000€" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Image et description */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Description de la compétition..."
                          className="min-h-[120px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Upload d'image */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Image de couverture</label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                    {imagePreview ? (
                      <div className="relative">
                        <img src={imagePreview} alt="Preview" className="w-full h-32 object-cover rounded-lg" />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => {
                            setCoverImage(null);
                            setImagePreview('');
                          }}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Upload className="w-8 h-8 mx-auto text-muted-foreground" />
                        <div className="text-sm text-muted-foreground">
                          Cliquez pour télécharger une image
                        </div>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Sélection des joueurs */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Joueurs participants</label>
                <Badge variant="outline">{selectedPlayers.length} sélectionné(s)</Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-60 overflow-y-auto border rounded-lg p-4">
                {availablePlayers.map((player) => (
                  <div
                    key={player.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedPlayers.includes(player.id)
                        ? 'border-primary bg-primary/10'
                        : 'border-muted hover:border-muted-foreground/50'
                    }`}
                    onClick={() => togglePlayerSelection(player.id)}
                  >
                    <div className="font-medium text-sm">{player.name}</div>
                    <div className="text-xs text-muted-foreground">{player.email}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={onCancel}>
                Annuler
              </Button>
              <Button type="submit">
                <Plus className="w-4 h-4 mr-2" />
                Créer la compétition
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AddCompetitionForm;
