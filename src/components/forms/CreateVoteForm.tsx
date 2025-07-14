
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, X, Vote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const voteSchema = z.object({
  title: z.string().min(3, "Le titre doit contenir au moins 3 caractères"),
  description: z.string().min(10, "La description doit contenir au moins 10 caractères"),
  startDate: z.string().min(1, "Date de début requise"),
  endDate: z.string().min(1, "Date de fin requise"),
  maxVotesPerUser: z.number().min(1, "Minimum 1 vote par utilisateur"),
  isPublic: z.boolean().default(true),
});

type VoteFormData = z.infer<typeof voteSchema>;

interface CreateVoteFormProps {
  onSubmit: (data: VoteFormData & { options: string[] }) => void;
  onCancel: () => void;
}

const CreateVoteForm: React.FC<CreateVoteFormProps> = ({ onSubmit, onCancel }) => {
  const [options, setOptions] = useState<string[]>(['', '']);
  const [newOption, setNewOption] = useState('');

  const form = useForm<VoteFormData>({
    resolver: zodResolver(voteSchema),
    defaultValues: {
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      maxVotesPerUser: 1,
      isPublic: true,
    },
  });

  const addOption = () => {
    if (newOption.trim() && !options.includes(newOption.trim())) {
      setOptions([...options, newOption.trim()]);
      setNewOption('');
    }
  };

  const removeOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const updateOption = (index: number, value: string) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleFormSubmit = (data: VoteFormData) => {
    const validOptions = options.filter(option => option.trim() !== '');
    if (validOptions.length < 2) {
      form.setError('root', { message: 'Au moins 2 options sont requises' });
      return;
    }
    
    onSubmit({
      ...data,
      options: validOptions
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Vote className="w-5 h-5" />
          Créer un Nouveau Vote
        </CardTitle>
        <CardDescription>
          Créez un vote pour permettre à la communauté de s'exprimer
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titre du vote</FormLabel>
                  <FormControl>
                    <Input placeholder="Meilleur joueur du mois" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Décrivez l'objet du vote..."
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date de début</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
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
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="maxVotesPerUser"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre maximum de votes par utilisateur</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="1"
                      {...field} 
                      onChange={e => field.onChange(parseInt(e.target.value))} 
                    />
                  </FormControl>
                  <FormDescription>
                    Combien d'options un utilisateur peut-il sélectionner ?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Options du vote */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Options du vote</label>
                <Badge variant="outline">{options.filter(o => o.trim()).length} option(s)</Badge>
              </div>

              <div className="space-y-3">
                {options.map((option, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={option}
                      onChange={(e) => updateOption(index, e.target.value)}
                      placeholder={`Option ${index + 1}`}
                    />
                    {options.length > 2 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeOption(index)}
                      >
                        <X className="w-4 h-4 text-destructive" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <Input
                  value={newOption}
                  onChange={(e) => setNewOption(e.target.value)}
                  placeholder="Nouvelle option..."
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addOption())}
                />
                <Button type="button" onClick={addOption} disabled={!newOption.trim()}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {form.formState.errors.root && (
              <div className="text-sm text-destructive">
                {form.formState.errors.root.message}
              </div>
            )}

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={onCancel}>
                Annuler
              </Button>
              <Button type="submit">
                <Vote className="w-4 h-4 mr-2" />
                Créer le vote
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateVoteForm;
