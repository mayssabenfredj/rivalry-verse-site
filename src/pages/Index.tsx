
import React from 'react';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import BestPlayers from '@/components/BestPlayers';
import Competitions from '@/components/Competitions';
import Contact from '@/components/Contact';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <BestPlayers />
      <Competitions />
      <Contact />
    </div>
  );
};

export default Index;
