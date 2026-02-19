import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const navRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    // Entrance animation
    gsap.fromTo(nav.querySelectorAll('.nav-item'),
      { opacity: 0, y: -20 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        stagger: 0.08,
        ease: 'expo.out',
        delay: 0.2
      }
    );

    // Scroll handler
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: 'Work', id: 'projects' },
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'services' },
    { label: 'Contact', id: 'cta' },
  ];

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        isScrolled 
          ? 'glass py-4' 
          : 'bg-transparent py-6'
      }`}
      style={{ transitionTimingFunction: 'var(--ease-smooth)' }}
    >
      <div className="w-full px-6 lg:px-12 flex items-center justify-between">
        {/* Logo */}
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="nav-item text-xl font-semibold tracking-tight hover:opacity-80 transition-opacity"
        >
          Portfolio
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="nav-item text-sm text-white/80 hover:text-white underline-animate transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* CTA Button */}
        <a
          href="mailto:krishnaloganathan222@gmail.com"
          className="nav-item hidden md:block px-6 py-2.5 border border-white/20 rounded-full text-sm hover:bg-white hover:text-black transition-all duration-300"
          style={{ transitionTimingFunction: 'var(--ease-smooth)' }}
        >
          Let's Talk
        </a>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden nav-item p-2"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 glass transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="text-left text-lg text-white/80 hover:text-white transition-colors py-2"
            >
              {link.label}
            </button>
          ))}
          <a
            href="mailto:krishnaloganathan222@gmail.com"
            className="mt-4 px-6 py-3 border border-white/20 rounded-full text-center hover:bg-white hover:text-black transition-all duration-300"
          >
            Let's Talk
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
