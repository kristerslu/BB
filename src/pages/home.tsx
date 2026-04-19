import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { useCart, Product } from "@/lib/cart";
import Navbar from "@/components/layout/navbar";
import { Link } from "wouter";

const paintings: Product[] = [
  {
    id: "p1",
    titleNl: "Baltisch Licht",
    titleFr: "Lumière Baltique",
    titleEn: "Baltic Light",
    mediumKey: "gallery.medium.oil",
    dimensions: "80 × 100 cm",
    price: 1850,
    image: "/paintings/p1.png",
  },
  {
    id: "p2",
    titleNl: "Gouden Profiel",
    titleFr: "Profil Doré",
    titleEn: "Golden Profile",
    mediumKey: "gallery.medium.oil",
    dimensions: "60 × 80 cm",
    price: 1200,
    image: "/paintings/p2.png",
  },
  {
    id: "p3",
    titleNl: "Winterwoud",
    titleFr: "Forêt d'Hiver",
    titleEn: "Winter Forest",
    mediumKey: "gallery.medium.acrylic",
    dimensions: "70 × 90 cm",
    price: 980,
    image: "/paintings/p3.png",
  },
  {
    id: "p4",
    titleNl: "Wilde Bloemen",
    titleFr: "Fleurs Sauvages",
    titleEn: "Wild Flowers",
    mediumKey: "gallery.medium.oil",
    dimensions: "50 × 70 cm",
    price: 650,
    image: "/paintings/p4.png",
  },
  {
    id: "p5",
    titleNl: "Zee bij Schemering",
    titleFr: "Mer au Crépuscule",
    titleEn: "Sea at Dusk",
    mediumKey: "gallery.medium.oil",
    dimensions: "100 × 80 cm",
    price: 2100,
    image: "/paintings/p5.png",
  },
  {
    id: "p6",
    titleNl: "Riga Interieur",
    titleFr: "Intérieur Riga",
    titleEn: "Riga Interior",
    mediumKey: "gallery.medium.oil",
    dimensions: "90 × 70 cm",
    price: 1650,
    image: "/paintings/p6.png",
  },
  {
    id: "p7",
    titleNl: "Rode Aarde",
    titleFr: "Terre Rouge",
    titleEn: "Red Earth",
    mediumKey: "gallery.medium.acrylic",
    dimensions: "60 × 80 cm",
    price: 750,
    image: "/paintings/p7.png",
  },
  {
    id: "p8",
    titleNl: "Baltisch Herbarium",
    titleFr: "Herbier Balte",
    titleEn: "Baltic Herbarium",
    mediumKey: "gallery.medium.acrylic",
    dimensions: "50 × 70 cm",
    price: 580,
    image: "/paintings/p8.png",
  },
  {
    id: "p9",
    titleNl: "Herfstreflecties",
    titleFr: "Reflets d'Automne",
    titleEn: "Autumn Reflections",
    mediumKey: "gallery.medium.oil",
    dimensions: "100 × 80 cm",
    price: 2400,
    image: "/paintings/p9.png",
  },
  {
    id: "p10",
    titleNl: "Herinnering aan Pagina's",
    titleFr: "Mémoire des Pages",
    titleEn: "Memory of Pages",
    mediumKey: "gallery.medium.oil",
    dimensions: "60 × 80 cm",
    price: 1100,
    image: "/paintings/p10.png",
  },
];

function getTitle(painting: Product, lang: string): string {
  if (lang === 'fr') return painting.titleFr;
  if (lang === 'en') return painting.titleEn;
  return painting.titleNl;
}

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function HeroSection() {
  const { t } = useI18n();
  return (
    <section className="min-h-screen pt-32 pb-20 flex flex-col justify-center">
      <div className="container mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="order-2 lg:order-1">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-8"
          >
            Riga — Belgique
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-7xl md:text-8xl lg:text-[9rem] leading-[0.85] text-foreground"
          >
            Beta<br />
            <span style={{ color: '#c2b5a3' }}>Beatrise</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-12 max-w-sm"
          >
            <p className="text-base text-muted-foreground leading-relaxed font-light">
              {t("hero.subtitle")}
            </p>
          </motion.div>
        </div>
        <div className="order-1 lg:order-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="aspect-[3/4] overflow-hidden"
          >
            <img
              src="/paintings/p5.png"
              alt="Artwork"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=800&q=80";
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  const { t } = useI18n();
  return (
    <section id="about" className="py-24 md:py-40 bg-card">
      <div className="container mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-16 lg:gap-32 items-center">
        <FadeIn>
          <div className="aspect-[4/5] overflow-hidden">
            <img
              src="/paintings/p2.png"
              alt="The Artist"
              className="w-full h-full object-cover grayscale-[30%] opacity-90"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80";
              }}
            />
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="space-y-10">
            <h2 className="font-serif italic text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight">
              "{t("about.title")}"
            </h2>
            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed font-light max-w-lg">
              <p>{t("about.p1")}</p>
              <p>{t("about.p2")}</p>
            </div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-foreground">
              — Beta Beatrise
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function PaintingCard({ painting }: { painting: Product }) {
  const { t, lang } = useI18n();
  const { addToCart, items } = useCart();
  const inCart = items.some((i) => i.id === painting.id);
  const title = getTitle(painting, lang);

  return (
    <div className="group flex flex-col h-full">
      <div className="aspect-[3/4] overflow-hidden bg-card mb-6">
        <img
          src={painting.image}
          alt={title}
          className="w-full h-full object-cover shadow-sm transition-opacity duration-500 group-hover:opacity-90"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      </div>
      <div className="flex-grow flex flex-col">
        <h3 className="font-serif italic text-2xl text-foreground mb-2">{title}</h3>
        <p className="text-[11px] tracking-widest uppercase text-muted-foreground mb-4">
          {t(painting.mediumKey)} · {painting.dimensions}
        </p>
        <div className="mt-auto flex items-center justify-between pt-6 border-t border-border">
          <span className="font-serif text-xl text-foreground">€ {painting.price}</span>
          <button
            onClick={() => addToCart(painting)}
            disabled={inCart}
            className="text-[10px] uppercase tracking-[0.2em] text-foreground border border-foreground/20 px-6 py-2 hover:bg-foreground hover:text-background transition-colors disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-foreground"
          >
            {inCart ? t("gallery.selected") : t("gallery.addToCart")}
          </button>
        </div>
      </div>
    </div>
  );
}

function GallerySection() {
  const { t } = useI18n();
  return (
    <section id="gallery" className="py-24 md:py-40 bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <FadeIn>
          <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-8 border-b border-border pb-12">
            <h2 className="font-serif text-5xl md:text-6xl text-foreground">
              {t("gallery.title")}
            </h2>
            <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
              Collection 2024–2025
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-x-16 md:gap-y-24">
          {paintings.map((p, i) => (
            <FadeIn key={p.id} delay={(i % 3) * 0.1}>
              <PaintingCard painting={p} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function CommissionsSection() {
  const { t } = useI18n();
  return (
    <section id="commissions" className="py-24 md:py-40 bg-card border-y border-border">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl">
        <FadeIn>
          <div className="text-center mb-20">
            <h2 className="font-serif italic text-4xl md:text-5xl lg:text-6xl text-foreground mb-8">
              "{t("commissions.pullquote")}"
            </h2>
            <p className="text-muted-foreground text-lg font-light max-w-2xl mx-auto">
              {t("commissions.desc")}
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="grid md:grid-cols-2 gap-16">
            <div className="space-y-8">
              <h3 className="font-serif text-3xl text-foreground">{t("commissions.title")}</h3>
              <p className="text-[11px] uppercase tracking-widest text-muted-foreground leading-relaxed">
                {t("commissions.timing")}
              </p>
              <div className="pt-8 space-y-4">
                <a href="mailto:beta.beatrise@gmail.com" className="block text-sm text-foreground hover:text-muted-foreground transition-colors">
                  beta.beatrise@gmail.com
                </a>
                <a href="tel:+37126000000" className="block text-sm text-foreground hover:text-muted-foreground transition-colors">
                  +371 26 000 000
                </a>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3">
                  {t("commissions.name")}
                </label>
                <input
                  type="text"
                  className="w-full bg-transparent border-b border-border pb-2 text-foreground focus:outline-none focus:border-foreground transition-colors font-serif text-xl"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3 mt-8">
                  {t("commissions.email")}
                </label>
                <input
                  type="email"
                  className="w-full bg-transparent border-b border-border pb-2 text-foreground focus:outline-none focus:border-foreground transition-colors font-serif text-xl"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3 mt-8">
                  {t("commissions.message")}
                </label>
                <textarea
                  rows={4}
                  placeholder={t("commissions.placeholder")}
                  className="w-full bg-transparent border-b border-border pb-2 text-foreground focus:outline-none focus:border-foreground transition-colors font-serif text-xl resize-none placeholder:text-muted-foreground/40"
                />
              </div>
              <div className="pt-8">
                <a
                  href="mailto:beta.beatrise@gmail.com"
                  className="inline-block bg-foreground text-background px-10 py-4 text-[10px] uppercase tracking-[0.2em] hover:bg-secondary transition-colors"
                >
                  {t("commissions.send")}
                </a>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function InteriorSection() {
  const { t } = useI18n();
  return (
    <section id="interior" className="py-32 md:py-48 bg-[hsl(20,25%,18%)] text-background flex flex-col items-center justify-center text-center px-6">
      <FadeIn>
        <p className="text-[10px] tracking-[0.2em] uppercase text-[hsl(35,20%,70%)] mb-8">
          {t("interior.title")}
        </p>
        <h2 className="font-serif italic text-4xl md:text-5xl lg:text-6xl mb-12 max-w-3xl leading-tight text-background">
          {t("interior.desc")}
        </h2>
        <span className="inline-block border border-[hsl(35,20%,70%)]/30 text-[hsl(35,20%,70%)] px-8 py-3 text-[10px] uppercase tracking-[0.2em]">
          {t("interior.soon")}
        </span>
      </FadeIn>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 bg-background border-t border-border">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="font-serif text-xl text-foreground">BETA BEATRISE</p>
        <div className="flex gap-8 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          <a href="mailto:beta.beatrise@gmail.com" className="hover:text-foreground transition-colors">Email</a>
          <a href="tel:+37126000000" className="hover:text-foreground transition-colors">Tel</a>
          <a href="#" className="hover:text-foreground transition-colors">Instagram</a>
        </div>
        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <GallerySection />
      <CommissionsSection />
      <InteriorSection />
      <Footer />
    </div>
  );
}
