
import React from 'react';
import { ArrowRight, Play, Trophy, Users, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Trophy className="w-4 h-4 mr-2" />
                Plateforme #1 des Compétitions
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {t('heroTitle')}
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl">
                {t('heroSubtitle')}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="group" asChild>
                <Link to="/signup">
                  {t('getStarted')}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              
              <Button variant="outline" size="lg" className="group">
                <Play className="mr-2 h-4 w-4" />
                {t('learnMore')}
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">1000+</div>
                <div className="text-sm text-muted-foreground">Compétitions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">50K+</div>
                <div className="text-sm text-muted-foreground">Joueurs</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">200K+</div>
                <div className="text-sm text-muted-foreground">Votes</div>
              </div>
            </div>
          </div>

          <div className="relative lg:h-[600px]">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-3xl opacity-20 blur-3xl"></div>
            
            <div className="relative grid grid-cols-2 gap-4 h-full">
              <div className="space-y-4">
                <div className="bg-card border rounded-2xl p-6 hover-glow hover-scale">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Trophy className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold">Football League</div>
                      <div className="text-sm text-muted-foreground">16 équipes</div>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-primary">32</div>
                  <div className="text-sm text-muted-foreground">Matchs joués</div>
                </div>

                <div className="bg-card border rounded-2xl p-6 hover-glow hover-scale">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <div className="font-semibold">Basket Tournament</div>
                      <div className="text-sm text-muted-foreground">8 équipes</div>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-accent">1,240</div>
                  <div className="text-sm text-muted-foreground">Spectateurs</div>
                </div>
              </div>

              <div className="space-y-4 pt-8">
                <div className="bg-card border rounded-2xl p-6 hover-glow hover-scale">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-green-500" />
                    </div>
                    <div>
                      <div className="font-semibold">Tennis Open</div>
                      <div className="text-sm text-muted-foreground">64 joueurs</div>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-green-500">89%</div>
                  <div className="text-sm text-muted-foreground">Participation</div>
                </div>

                <div className="bg-gradient-to-br from-primary to-accent rounded-2xl p-6 text-white hover-scale">
                  <div className="text-sm opacity-90 mb-2">Prochain événement</div>
                  <div className="font-bold text-lg mb-1">Championship Final</div>
                  <div className="text-sm opacity-90">Dans 3 jours</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
