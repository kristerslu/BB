import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'nl' | 'fr' | 'en';

interface I18nContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  // Nav
  'nav.home': { nl: 'Startpagina', fr: 'Accueil', en: 'Home' },
  'nav.about': { nl: 'Over mij', fr: 'À Propos', en: 'About' },
  'nav.gallery': { nl: 'Galerie', fr: 'Galerie', en: 'Gallery' },
  'nav.commissions': { nl: 'Bestellingen', fr: 'Commandes', en: 'Commissions' },
  'nav.interior': { nl: 'Interieurdesign', fr: 'Design d\'Intérieur', en: 'Interior Design' },
  'nav.cart': { nl: 'Winkelmandje', fr: 'Panier', en: 'Cart' },
  'nav.close': { nl: 'Sluiten', fr: 'Fermer', en: 'Close' },
  'nav.menu': { nl: 'Menu', fr: 'Menu', en: 'Menu' },

  // Hero
  'hero.title': { nl: 'BETA BEATRISE', fr: 'BETA BEATRISE', en: 'BETA BEATRISE' },
  'hero.subtitle': { nl: 'Schilder & Interieurontwerper', fr: 'Artiste Peintre & Designer d\'Intérieur', en: 'Painter & Interior Designer' },
  'hero.location': { nl: 'Riga, Letland', fr: 'Riga, Lettonie', en: 'Riga, Latvia' },
  'hero.explore': { nl: 'Ontdek de collectie', fr: 'Explorer la collection', en: 'Explore the collection' },

  // About
  'about.title': { nl: 'Het Atelier van de Ziel', fr: 'L\'Atelier de l\'Âme', en: 'The Soul\'s Atelier' },
  'about.p1': {
    nl: 'Ik ben geboren in het grijze en gouden licht van Riga. Mijn kunst is een zoektocht naar dit licht, een poging om het vergankelijke te vangen — de stilte tussen twee ademhalingen.',
    fr: 'Je suis née dans la lumière grise et dorée de Riga. Mon art est une quête de cette lumière, une tentative de capturer l\'éphémère, le silence entre deux respirations.',
    en: 'I was born in the grey and golden light of Riga. My art is a quest for this light, an attempt to capture the ephemeral, the silence between two breaths.',
  },
  'about.p2': {
    nl: 'Elk doek is een fragment van herinnering, geweven uit oude pigmenten, warm oker en diepe Baltische blauwtinten. Ik schilder niet wat ik zie — ik schilder wat ik voel.',
    fr: 'Chaque toile est un fragment de mémoire, tissé de pigments anciens, d\'ocre chaleureux et de bleus profonds de la Baltique. Je ne peins pas ce que je vois, je peins ce que je ressens.',
    en: 'Each canvas is a fragment of memory, woven from ancient pigments, warm ochre, and deep Baltic blues. I do not paint what I see, I paint what I feel.',
  },

  // Gallery
  'gallery.title': { nl: 'Huidige Collectie', fr: 'Collection Actuelle', en: 'Current Collection' },
  'gallery.addToCart': { nl: 'Kopen', fr: 'Acheter', en: 'Buy' },
  'gallery.selected': { nl: 'Geselecteerd', fr: 'Sélectionné', en: 'Selected' },
  'gallery.medium.oil': { nl: 'Olieverf op doek', fr: 'Huile sur toile', en: 'Oil on canvas' },
  'gallery.medium.acrylic': { nl: 'Acryl', fr: 'Acrylique', en: 'Acrylic' },

  // Cart
  'cart.title': { nl: 'Uw Selectie', fr: 'Votre Sélection', en: 'Your Selection' },
  'cart.empty': { nl: 'Uw selectie is leeg.', fr: 'Votre sélection est vide.', en: 'Your selection is empty.' },
  'cart.total': { nl: 'Totaal', fr: 'Total', en: 'Total' },
  'cart.checkout': { nl: 'Bestelling afronden', fr: 'Finaliser l\'Achat', en: 'Checkout' },
  'cart.remove': { nl: 'Verwijderen', fr: 'Retirer', en: 'Remove' },
  'cart.clear': { nl: 'Wissen', fr: 'Vider', en: 'Clear' },
  'cart.explore': { nl: 'Ontdekken', fr: 'Explorer', en: 'Explore' },
  'cart.artworks': { nl: 'kunstwerk(en)', fr: 'œuvre(s)', en: 'artwork(s)' },
  'cart.backToGallery': { nl: 'Terug naar galerie', fr: 'Retour à la galerie', en: 'Back to gallery' },

  // Checkout
  'checkout.title': { nl: 'Uw bestelling afronden', fr: 'Finaliser votre commande', en: 'Complete your order' },
  'checkout.message': {
    nl: 'Om uw aankoop te voltooien en de levering van deze unieke kunstwerken te regelen, kunt u mij rechtstreeks contacteren.',
    fr: 'Pour finaliser votre achat et organiser la livraison de ces œuvres uniques, veuillez me contacter directement.',
    en: 'To complete your purchase and arrange the delivery of these unique artworks, please contact me directly.',
  },
  'checkout.email': { nl: 'E-mail sturen', fr: 'Envoyer un email', en: 'Send an email' },
  'checkout.return': { nl: 'Terug naar galerie', fr: 'Retour à la galerie', en: 'Return to gallery' },
  'checkout.back': { nl: 'Terug', fr: 'Retour', en: 'Back' },
  'checkout.emailSubject': { nl: 'Aankoopverzoek', fr: 'Demande d\'achat', en: 'Purchase Enquiry' },

  // Commissions
  'commissions.title': { nl: 'Schilderijen op Maat', fr: 'Œuvres sur Mesure', en: 'Paintings on Demand' },
  'commissions.pullquote': {
    nl: 'De kunst van de maatgemaakte ruimte.',
    fr: 'L\'art de l\'espace sur mesure.',
    en: 'The art of tailored space.',
  },
  'commissions.desc': {
    nl: 'Ik maak unieke kunstwerken op maat van uw ruimte en gevoeligheid. Beschrijf uw visie, de gewenste afmetingen en de sfeer die u zoekt.',
    fr: 'Je crée des œuvres uniques adaptées à votre espace et à votre sensibilité. Décrivez-moi votre vision, les dimensions souhaitées et l\'atmosphère recherchée.',
    en: 'I create unique artworks tailored to your space and sensibility. Describe your vision, the desired dimensions, and the atmosphere you are looking for.',
  },
  'commissions.timing': {
    nl: 'Uitvoeringstermijn: 4 tot 12 weken',
    fr: 'Délai de réalisation: 4 à 12 semaines',
    en: 'Completion time: 4 to 12 weeks',
  },
  'commissions.name': { nl: 'Naam', fr: 'Nom', en: 'Name' },
  'commissions.email': { nl: 'E-mail', fr: 'Email', en: 'Email' },
  'commissions.message': { nl: 'Uw project', fr: 'Votre projet', en: 'Your project' },
  'commissions.placeholder': {
    nl: 'Beschrijf uw project',
    fr: 'Décrivez votre projet',
    en: 'Describe your project',
  },
  'commissions.send': { nl: 'Aanvraag verzenden', fr: 'Envoyer la demande', en: 'Send request' },

  // Interior Design
  'interior.title': { nl: 'Interieurdesign', fr: 'Design d\'Intérieur', en: 'Interior Design' },
  'interior.desc': { nl: 'Een nieuwe dimensie van schoonheid.', fr: 'Une nouvelle dimension de la beauté.', en: 'A new dimension of beauty.' },
  'interior.soon': { nl: 'Binnenkort beschikbaar', fr: 'Bientôt disponible', en: 'Coming soon' },

  // Footer
  'footer.contact': { nl: 'Contact', fr: 'Contact', en: 'Contact' },
  'footer.studio': { nl: 'Atelier', fr: 'Atelier', en: 'Studio' },
  'footer.rights': { nl: 'Alle rechten voorbehouden.', fr: 'Tous droits réservés.', en: 'All rights reserved.' },
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('nl');

  const t = (key: string): string => {
    if (!translations[key]) {
      return key;
    }
    return translations[key][lang] || translations[key]['nl'] || translations[key]['en'] || key;
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
