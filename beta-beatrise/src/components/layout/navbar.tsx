import React from "react";
import { Link } from "wouter";
import { useI18n, Language } from "@/lib/i18n";
import { useCart } from "@/lib/cart";
import { motion, AnimatePresence } from "framer-motion";

const langCycle: Language[] = ['nl', 'fr', 'en'];

export default function Navbar() {
  const { t, lang, setLang } = useI18n();
  const { itemCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navLinks = [
    { href: "/#about", label: "nav.about" },
    { href: "/#gallery", label: "nav.gallery" },
    { href: "/#commissions", label: "nav.commissions" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm py-6 border-b border-border/40">
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">

        {/* Desktop Left - Links */}
        <nav className="hidden md:flex flex-1 items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[10px] uppercase tracking-[0.2em] text-foreground hover:text-muted-foreground transition-colors"
            >
              {t(link.label)}
            </Link>
          ))}
        </nav>

        {/* Center - Logo */}
        <div className="flex-1 md:flex-none flex justify-start md:justify-center">
          <Link href="/" className="font-serif text-2xl tracking-widest text-foreground">
            BETA BEATRISE
          </Link>
        </div>

        {/* Desktop Right - fixed width so nothing shifts */}
        <div className="hidden md:flex flex-1 items-center justify-end gap-10">

          {/* Language dropdown on hover */}
          <div className="relative group">
            <button className="text-[10px] uppercase tracking-[0.2em] text-foreground hover:text-muted-foreground transition-colors w-6 text-left">
              {lang.toUpperCase()}
            </button>
            <div className="absolute right-0 top-full pt-4 hidden group-hover:block">
              <div className="bg-background border border-border/60 py-3 flex flex-col min-w-[3.5rem]">
                {langCycle.map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] text-left transition-colors ${
                      lang === l
                        ? 'text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Cart — fixed min-width so language changes don't cause layout shift */}
          <Link
            href="/cart"
            className="text-[10px] uppercase tracking-[0.2em] text-foreground hover:text-muted-foreground transition-colors min-w-[7rem] text-right"
          >
            {t('nav.cart')}{itemCount > 0 ? ` (${itemCount})` : ''}
          </Link>
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-6">
          <Link href="/cart" className="text-[10px] uppercase tracking-[0.2em] text-foreground">
            {t('nav.cart')}{itemCount > 0 ? ` (${itemCount})` : ''}
          </Link>
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="text-[10px] uppercase tracking-[0.2em] text-foreground"
          >
            {t('nav.menu')}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 bg-background flex flex-col pt-24 px-6 pb-6 h-screen"
          >
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-8 right-6 text-[10px] uppercase tracking-[0.2em] text-foreground"
            >
              {t('nav.close')}
            </button>

            <nav className="flex flex-col gap-10 mt-16 items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-serif text-3xl text-foreground"
                >
                  {t(link.label)}
                </Link>
              ))}

              <div className="mt-16 flex gap-6 items-center">
                {langCycle.map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`text-[10px] uppercase tracking-[0.2em] transition-colors ${
                      lang === l ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
