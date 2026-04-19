import React from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { useCart } from "@/lib/cart";
import Navbar from "@/components/layout/navbar";

function getTitle(item: { titleNl: string; titleFr: string; titleEn: string }, lang: string): string {
  if (lang === 'fr') return item.titleFr;
  if (lang === 'en') return item.titleEn;
  return item.titleNl;
}

export default function CartPage() {
  const { t, lang } = useI18n();
  const { items, removeFromCart, total, clearCart } = useCart();
  const [showContact, setShowContact] = React.useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 container mx-auto px-6 md:px-12 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mb-16 border-b border-border pb-8 flex flex-col md:flex-row items-baseline justify-between gap-6">
            <h1 className="font-serif text-5xl md:text-6xl text-foreground">
              {t("cart.title")}
            </h1>
            <Link href="/#gallery" className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors">
              {t("cart.backToGallery")}
            </Link>
          </div>

          {items.length === 0 ? (
            <div className="py-32 text-center flex flex-col items-center">
              <p className="font-serif italic text-2xl text-muted-foreground mb-8">
                {t("cart.empty")}
              </p>
              <Link href="/#gallery" className="border border-foreground/20 text-foreground px-8 py-3 text-[10px] uppercase tracking-[0.2em] hover:bg-foreground hover:text-background transition-colors">
                {t("cart.explore")}
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
              <div className="lg:col-span-7 space-y-12">
                <AnimatePresence>
                  {items.map((item) => {
                    const title = getTitle(item, lang);
                    return (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex gap-8"
                      >
                        <div className="w-32 aspect-[3/4] bg-card flex-shrink-0">
                          <img
                            src={item.image}
                            alt={title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = "none";
                            }}
                          />
                        </div>
                        <div className="flex flex-col py-2 flex-grow">
                          <h3 className="font-serif text-2xl text-foreground mb-2">{title}</h3>
                          <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
                            {item.dimensions}
                          </p>
                          <div className="mt-auto flex justify-between items-end">
                            <span className="font-serif text-xl text-foreground">€ {item.price}</span>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors"
                            >
                              {t("cart.remove")}
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              <div className="lg:col-span-5">
                <div className="bg-card p-10 lg:p-12 sticky top-32">
                  <div className="mb-12">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-4">
                      {t("cart.total")}
                    </p>
                    <p className="font-serif text-4xl text-foreground mb-2">
                      € {total}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {items.length} {t("cart.artworks")}
                    </p>
                  </div>

                  <AnimatePresence mode="wait">
                    {!showContact ? (
                      <motion.div
                        key="buy"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-4"
                      >
                        <button
                          onClick={() => setShowContact(true)}
                          className="w-full bg-foreground text-background py-4 text-[10px] uppercase tracking-[0.2em] hover:bg-secondary transition-colors"
                        >
                          {t("cart.checkout")}
                        </button>
                        <button
                          onClick={clearCart}
                          className="w-full border border-border py-3 text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
                        >
                          {t("cart.clear")}
                        </button>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="contact"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                      >
                        <p className="font-serif text-2xl text-foreground mb-4">
                          {t("checkout.title")}
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed font-light mb-8">
                          {t("checkout.message")}
                        </p>

                        <div className="space-y-4">
                          <a
                            href={`mailto:beta.beatrise@gmail.com?subject=${encodeURIComponent(t("checkout.emailSubject"))}&body=${encodeURIComponent(
                              items.map((i) => `${getTitle(i, lang)} — €${i.price}`).join("\n") +
                              `\n\nTotal: €${total}`
                            )}`}
                            className="block w-full bg-foreground text-background text-center py-4 text-[10px] uppercase tracking-[0.2em] hover:bg-secondary transition-colors"
                          >
                            {t("checkout.email")}
                          </a>
                          <a
                            href="tel:+37126000000"
                            className="block w-full border border-border text-center py-4 text-[10px] uppercase tracking-[0.2em] text-foreground hover:border-foreground/30 transition-colors"
                          >
                            +371 26 000 000
                          </a>
                        </div>
                        <button
                          onClick={() => setShowContact(false)}
                          className="mt-8 text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors w-full text-center"
                        >
                          {t("checkout.back")}
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </main>

      <footer className="py-8 bg-background border-t border-border mt-auto">
        <div className="container mx-auto px-6 text-center">
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            BETA BEATRISE © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}
