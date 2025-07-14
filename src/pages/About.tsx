
import React from 'react';
import { Users, Target, Award, Zap } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';

const About = () => {
  const { t } = useLanguage();

  const values = [
    {
      icon: Target,
      title: 'Notre Mission',
      description: 'Révolutionner la gestion des compétitions sportives avec des outils modernes et intuitifs.'
    },
    {
      icon: Users,
      title: 'Notre Équipe',
      description: 'Une équipe passionnée de développeurs et d\'experts en sport unis par une vision commune.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Nous nous engageons à fournir la meilleure expérience possible à nos utilisateurs.'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Nous utilisons les dernières technologies pour créer des solutions innovantes.'
    }
  ];

  const team = [
    {
      name: 'Marie Dubois',
      role: 'CEO & Fondatrice',
      description: 'Ancienne athlète professionnelle, Marie a créé SportCompet pour démocratiser l\'accès aux compétitions sportives.',
      avatar: '👩‍💼'
    },
    {
      name: 'Pierre Martin',
      role: 'CTO',
      description: 'Expert en développement logiciel avec 15 ans d\'expérience dans les plateformes sportives.',
      avatar: '👨‍💻'
    },
    {
      name: 'Sophie Bernard',
      role: 'Directrice Produit',
      description: 'Spécialisée en UX/UI, Sophie s\'assure que notre plateforme reste intuitive et accessible.',
      avatar: '👩‍🎨'
    },
    {
      name: 'Lucas Rousseau',
      role: 'Responsable Commercial',
      description: 'Lucas développe nos partenariats avec les clubs et fédérations sportives.',
      avatar: '👨‍💼'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {t('aboutTitle')}
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t('aboutDescription')}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Notre Histoire</h2>
              <p className="text-muted-foreground leading-relaxed">
                SportCompet est née en 2020 de la frustration de voir des compétitions sportives 
                mal organisées et des talents méconnus. Notre fondatrice, Marie Dubois, ancienne 
                championne de tennis, a voulu créer une plateforme qui donnerait à chaque sportif 
                les mêmes opportunités de briller.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Aujourd'hui, nous sommes fiers d'accompagner plus de 1000 compétitions et 
                50 000 athlètes dans leur quête d'excellence sportive.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <Card className="p-6 hover-glow">
                  <div className="text-3xl font-bold text-primary mb-2">1000+</div>
                  <div className="text-sm text-muted-foreground">Compétitions organisées</div>
                </Card>
                <Card className="p-6 hover-glow">
                  <div className="text-3xl font-bold text-accent mb-2">50K+</div>
                  <div className="text-sm text-muted-foreground">Athlètes inscrits</div>
                </Card>
              </div>
              <div className="space-y-4 pt-8">
                <Card className="p-6 hover-glow">
                  <div className="text-3xl font-bold text-green-500 mb-2">200K+</div>
                  <div className="text-sm text-muted-foreground">Votes enregistrés</div>
                </Card>
                <Card className="p-6 hover-glow">
                  <div className="text-3xl font-bold text-orange-500 mb-2">98%</div>
                  <div className="text-sm text-muted-foreground">Satisfaction client</div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Nos Valeurs</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Les principes qui guident notre travail au quotidien
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="p-8 text-center hover-glow hover-scale group">
                <div className="inline-flex p-4 rounded-xl bg-primary/10 mb-6 group-hover:scale-110 transition-transform">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Notre Équipe</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Rencontrez les personnes qui rendent SportCompet possible
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="p-6 text-center hover-glow hover-scale group">
                <div className="text-6xl mb-4">{member.avatar}</div>
                <h3 className="text-xl font-semibold mb-1 group-hover:text-primary transition-colors">
                  {member.name}
                </h3>
                <p className="text-primary font-medium mb-3">{member.role}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {member.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary to-accent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Rejoignez Notre Communauté
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Découvrez comment SportCompet peut transformer votre expérience des compétitions sportives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors">
              Commencer Gratuitement
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
              Nous Contacter
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
