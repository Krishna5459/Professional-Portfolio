import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CTA = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const particles = particlesRef.current;
    if (!section || !content || !particles) return;

    const ctx = gsap.context(() => {
      const scrollTriggers: ScrollTrigger[] = [];

      // Background fade in
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: section,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.fromTo(section.querySelector('.bg-gradient'),
              { opacity: 0 },
              { opacity: 1, duration: 1.2, ease: 'smooth' }
            );
          }
        })
      );

      // Content entrance
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: section,
          start: 'top 70%',
          once: true,
          onEnter: () => {
            const words = content.querySelectorAll('.headline-word');
            gsap.fromTo(words,
              { y: 60, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'expo.out', delay: 0.4 }
            );
            
            gsap.fromTo(content.querySelector('.subtext'),
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.6, ease: 'smooth', delay: 0.9 }
            );
            
            gsap.fromTo(content.querySelector('.cta-button'),
              { scale: 0.3, opacity: 0 },
              { scale: 1, opacity: 1, duration: 0.7, ease: 'elastic.out(1, 0.5)', delay: 1.1 }
            );
            
            gsap.fromTo(content.querySelectorAll('.contact-item'),
              { y: 20, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 1.3, ease: 'expo.out' }
            );
            
            gsap.fromTo(particles.children,
              { opacity: 0 },
              { opacity: 0.6, duration: 1, stagger: 0.05, delay: 1.3, ease: 'smooth' }
            );
          }
        })
      );

      return () => {
        scrollTriggers.forEach(st => st.kill());
      };
    }, section);

    return () => ctx.revert();
  }, []);

  const headlineWords = ["Let's", 'Connect', 'and', 'Collaborate'];

  return (
    <section
      ref={sectionRef}
      id="cta"
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-32"
    >
      {/* Background Gradient */}
      <div className="bg-gradient absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-white/[0.02]" />

      {/* Floating Particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: '-10px',
              width: `${2 + Math.random() * 6}px`,
              height: `${2 + Math.random() * 6}px`,
              animation: `float-up ${12 + Math.random() * 10}s linear infinite`,
              animationDelay: `${Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div 
        ref={contentRef}
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
      >
        {/* Headline */}
        <h2 className="text-4xl sm:text-5xl lg:text-7xl font-medium leading-tight mb-8">
          {headlineWords.map((word, i) => (
            <span key={i} className="headline-word inline-block mr-3 lg:mr-5">
              {word}
            </span>
          ))}
        </h2>

        {/* Subtext */}
        <p className="subtext text-lg lg:text-xl text-white/70 max-w-2xl mx-auto mb-12 leading-relaxed">
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
        </p>

        {/* CTA Button */}
        <a
          href="mailto:krishnaloganathan222@gmail.com"
          className="cta-button group inline-flex items-center gap-4 px-10 py-5 bg-white text-black rounded-full font-medium text-lg hover:scale-105 transition-transform duration-300 pulse-glow mb-16"
          style={{ transitionTimingFunction: 'var(--ease-elastic)' }}
        >
          <Mail size={20} />
          Get In Touch
          <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-300" />
        </a>

        {/* Contact Info Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-3xl mx-auto">
          {/* Email */}
          <a 
            href="mailto:krishnaloganathan222@gmail.com"
            className="contact-item group flex flex-col items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/20 hover:bg-white/[0.05] transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
              <Mail size={20} className="text-white/70" />
            </div>
            <div className="text-center">
              <div className="text-xs text-white/40 mb-1">Email</div>
              <div className="text-sm text-white/70 group-hover:text-white transition-colors break-all">krishnaloganathan222@gmail.com</div>
            </div>
          </a>

          {/* Phone */}
          <a 
            href="tel:+919113927440"
            className="contact-item group flex flex-col items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/20 hover:bg-white/[0.05] transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
              <Phone size={20} className="text-white/70" />
            </div>
            <div className="text-center">
              <div className="text-xs text-white/40 mb-1">Phone</div>
              <div className="text-sm text-white/70 group-hover:text-white transition-colors">+91-9113927440</div>
            </div>
          </a>

          {/* Location */}
          <div className="contact-item flex flex-col items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
              <MapPin size={20} className="text-white/70" />
            </div>
            <div className="text-center">
              <div className="text-xs text-white/40 mb-1">Location</div>
              <div className="text-sm text-white/70">Bangalore, India</div>
            </div>
          </div>

          {/* Availability */}
          <div className="contact-item flex flex-col items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
            </div>
            <div className="text-center">
              <div className="text-xs text-white/40 mb-1">Status</div>
              <div className="text-sm text-green-400">Open for Work</div>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-4 mt-10">
          <a
            href="https://www.linkedin.com/in/krishna-l-998183204"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-item w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all duration-300"
          >
            <Linkedin size={20} className="text-white/70" />
          </a>
          <a
            href="https://github.com/Krishna5459"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-item w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all duration-300"
          >
            <Github size={20} className="text-white/70" />
          </a>
        </div>
      </div>

      {/* Custom Animation Keyframes */}
      <style>{`
        @keyframes float-up {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.4;
          }
          90% {
            opacity: 0.4;
          }
          100% {
            transform: translateY(-110vh) translateX(${Math.random() * 100 - 50}px);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
};

export default CTA;
