
import React from 'react';
import { Trophy, BarChart3, Vote, Users, Calendar, Award } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Features = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Trophy,
      title: t('feature1Title'),
      description: t('feature1Description'),
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      icon: BarChart3,
      title: t('feature2Title'),
      description: t('feature2Description'),
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      icon: Vote,
      title: t('feature3Title'),
      description: t('feature3Description'),
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    },
    {
      icon: Users,
      title: 'Gestion des Joueurs',
      description: 'Interface complète pour gérer tous vos participants',
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      icon: Calendar,
      title: 'Planification',
      description: 'Organisez vos événements avec notre calendrier intégré',
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10'
    },
    {
      icon: Award,
      title: 'Récompenses',
      description: 'Système de récompenses et de classements automatique',
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10'
    }
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            {t('featuresTitle')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Découvrez toutes les fonctionnalités qui font de notre plateforme 
            l'outil idéal pour gérer vos compétitions sportives.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card border rounded-2xl p-8 hover-glow hover-scale group"
            >
              <div className={`inline-flex p-3 rounded-xl ${feature.bgColor} mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
