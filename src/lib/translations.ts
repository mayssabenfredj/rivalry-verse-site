
export const translations = {
  fr: {
    // Navigation
    home: 'Accueil',
    about: 'À Propos',
    competitions: 'Compétitions',
    contact: 'Contact',
    login: 'Connexion',
    signup: 'Inscription',
    dashboard: 'Tableau de Bord',
    logout: 'Déconnexion',
    
    // Hero Section
    heroTitle: 'Gérez vos Compétitions Sportives',
    heroSubtitle: 'Plateforme complète pour organiser, suivre et voter dans vos compétitions préférées',
    getStarted: 'Commencer',
    learnMore: 'En Savoir Plus',
    
    // About Section
    aboutTitle: 'À Propos de Nous',
    aboutDescription: 'Nous sommes passionnés par le sport et la technologie. Notre plateforme révolutionne la gestion des compétitions sportives.',
    
    // Features
    featuresTitle: 'Nos Fonctionnalités',
    feature1Title: 'Gestion Complète',
    feature1Description: 'Créez et gérez vos compétitions facilement',
    feature2Title: 'Suivi en Temps Réel',
    feature2Description: 'Suivez les résultats en direct',
    feature3Title: 'Système de Vote',
    feature3Description: 'Permettez aux fans de voter pour leurs favoris',
    
    // Best Players
    bestPlayersTitle: 'Meilleurs Joueurs',
    bestPlayersSubtitle: 'Découvrez les talents qui marquent nos compétitions',
    
    // Competitions
    competitionsTitle: 'Nos Compétitions',
    competitionsSubtitle: 'Participez aux compétitions les plus excitantes',
    viewDetails: 'Voir Détails',
    
    // Contact
    contactTitle: 'Contactez-Nous',
    contactSubtitle: 'Nous sommes là pour vous aider',
    name: 'Nom',
    email: 'Email',
    message: 'Message',
    send: 'Envoyer',
    
    // Auth
    loginTitle: 'Connexion',
    signupTitle: 'Inscription',
    password: 'Mot de passe',
    confirmPassword: 'Confirmer le mot de passe',
    fullName: 'Nom Complet',
    rememberMe: 'Se souvenir de moi',
    forgotPassword: 'Mot de passe oublié ?',
    noAccount: "Pas de compte ?",
    hasAccount: "Déjà un compte ?",
    
    // Dashboard
    welcomeDashboard: 'Tableau de Bord Admin',
    manageCompetitions: 'Gérer les Compétitions',
    managePlayers: 'Gérer les Joueurs',
    results: 'Résultats',
    voting: 'Votes',
    
    // Common
    save: 'Sauvegarder',
    cancel: 'Annuler',
    delete: 'Supprimer',
    edit: 'Modifier',
    create: 'Créer',
    search: 'Rechercher',
    loading: 'Chargement...',
  },
  en: {
    // Navigation
    home: 'Home',
    about: 'About',
    competitions: 'Competitions',
    contact: 'Contact',
    login: 'Login',
    signup: 'Sign Up',
    dashboard: 'Dashboard',
    logout: 'Logout',
    
    // Hero Section
    heroTitle: 'Manage Your Sports Competitions',
    heroSubtitle: 'Complete platform to organize, track and vote in your favorite competitions',
    getStarted: 'Get Started',
    learnMore: 'Learn More',
    
    // About Section
    aboutTitle: 'About Us',
    aboutDescription: 'We are passionate about sports and technology. Our platform revolutionizes sports competition management.',
    
    // Features
    featuresTitle: 'Our Features',
    feature1Title: 'Complete Management',
    feature1Description: 'Create and manage your competitions easily',
    feature2Title: 'Real-time Tracking',
    feature2Description: 'Follow results in real-time',
    feature3Title: 'Voting System',
    feature3Description: 'Let fans vote for their favorites',
    
    // Best Players
    bestPlayersTitle: 'Best Players',
    bestPlayersSubtitle: 'Discover the talents that mark our competitions',
    
    // Competitions
    competitionsTitle: 'Our Competitions',
    competitionsSubtitle: 'Participate in the most exciting competitions',
    viewDetails: 'View Details',
    
    // Contact
    contactTitle: 'Contact Us',
    contactSubtitle: 'We are here to help you',
    name: 'Name',
    email: 'Email',
    message: 'Message',
    send: 'Send',
    
    // Auth
    loginTitle: 'Login',
    signupTitle: 'Sign Up',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    fullName: 'Full Name',
    rememberMe: 'Remember me',
    forgotPassword: 'Forgot password?',
    noAccount: "Don't have an account?",
    hasAccount: "Already have an account?",
    
    // Dashboard
    welcomeDashboard: 'Admin Dashboard',
    manageCompetitions: 'Manage Competitions',
    managePlayers: 'Manage Players',
    results: 'Results',
    voting: 'Voting',
    
    // Common
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    create: 'Create',
    search: 'Search',
    loading: 'Loading...',
  }
};

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.fr;
