import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Linkedin, Github, Mail, ArrowUpRight, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const gradientLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    const gradientLine = gradientLineRef.current;
    if (!footer || !gradientLine) return;

    const ctx = gsap.context(() => {
      const scrollTriggers: ScrollTrigger[] = [];

      // Gradient line expand
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: footer,
          start: 'top 90%',
          once: true,
          onEnter: () => {
            gsap.fromTo(gradientLine,
              { scaleX: 0 },
              { scaleX: 1, duration: 0.8, ease: 'expo.out' }
            );

            // Logo and tagline
            gsap.fromTo(footer.querySelector('.footer-logo'),
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.6, ease: 'expo.out', delay: 0.2 }
            );

            gsap.fromTo(footer.querySelector('.footer-tagline'),
              { opacity: 0 },
              { opacity: 1, duration: 0.5, ease: 'smooth', delay: 0.35 }
            );

            // Social icons
            gsap.fromTo(footer.querySelectorAll('.social-icon'),
              { scale: 0 },
              { scale: 1, duration: 0.4, stagger: 0.08, ease: 'elastic.out(1, 0.5)', delay: 0.4 }
            );

            // Quick links
            gsap.fromTo(footer.querySelectorAll('.quick-link'),
              { y: 20, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.4, stagger: 0.06, ease: 'expo.out', delay: 0.5 }
            );

            // Contact info
            gsap.fromTo(footer.querySelectorAll('.contact-item'),
              { y: 20, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: 'expo.out', delay: 0.7 }
            );

            // Bottom bar
            gsap.fromTo(footer.querySelector('.footer-bottom'),
              { opacity: 0 },
              { opacity: 1, duration: 0.5, ease: 'smooth', delay: 1 }
            );
          }
        })
      );

      return () => {
        scrollTriggers.forEach(st => st.kill());
      };
    }, footer);

    return () => ctx.revert();
  }, []);

  const socialLinks = [
    { icon: Linkedin, href: 'https://www.linkedin.com/in/krishna-l-998183204', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com/Krishna5459', label: 'GitHub' },
    { icon: Mail, href: 'mailto:krishnaloganathan222@gmail.com', label: 'Email' },
  ];

  const quickLinks = [
    { label: 'Work', href: '#projects' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#services' },
    { label: 'Contact', href: '#cta' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative bg-[#010101] pt-20 pb-8 overflow-hidden"
    >
      {/* Gradient Line */}
      <div 
        ref={gradientLineRef}
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent origin-left"
      />

      <div className="w-full px-6 lg:px-12">
        {/* Main Footer */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="footer-logo text-2xl font-semibold mb-4">Krishna L</div>
            <p className="footer-tagline text-white/60 mb-2">
              MCA Student | Full-Stack Developer
            </p>
            <p className="footer-tagline text-white/40 text-sm mb-8">
              Machine Learning Enthusiast
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="social-icon w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 hover:scale-110 transition-all duration-300"
                    style={{ transitionTimingFunction: 'var(--ease-elastic)' }}
                  >
                    <Icon size={18} className="text-white/70" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-medium mb-6 text-white/40 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-4">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="quick-link group flex items-center gap-2 text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                    <ArrowUpRight 
                      size={14} 
                      className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" 
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-medium mb-6 text-white/40 uppercase tracking-wider">
              Get In Touch
            </h4>
            <div className="space-y-4">
              <div className="contact-item">
                <div className="text-sm text-white/40 mb-1">Email</div>
                <a 
                  href="mailto:krishnaloganathan222@gmail.com" 
                  className="text-white/70 hover:text-white transition-colors underline-animate"
                >
                  krishnaloganathan222@gmail.com
                </a>
              </div>
              <div className="contact-item">
                <div className="text-sm text-white/40 mb-1">Phone</div>
                <a 
                  href="tel:+919113927440"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  +91-9113927440
                </a>
              </div>
              <div className="contact-item">
                <div className="text-sm text-white/40 mb-1">Location</div>
                <div className="flex items-center gap-2 text-white/70">
                  <MapPin size={14} className="text-white/40" />
                  Bangalore, Karnataka
                </div>
              </div>
              <div className="contact-item">
                <div className="text-sm text-white/40 mb-1">Education</div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-white/70">MCA at BMSITM</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-sm text-white/40">
            © 2026 Krishna L. All rights reserved.
          </div>
          <div className="text-sm text-white/40 flex items-center gap-1">
          
      
            
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-radial from-white/[0.02] to-transparent rounded-full blur-3xl pointer-events-none" />
    </footer>
  );
};

export default Footer;
