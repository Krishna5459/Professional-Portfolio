import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, Sparkles, Github, Linkedin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const image = imageRef.current;
    const content = contentRef.current;
    if (!section || !headline || !image || !content) return;

    const ctx = gsap.context(() => {
      // Headline word reveal animation
      const words = headline.querySelectorAll('.word');
      gsap.fromTo(words,
        { 
          opacity: 0, 
          y: 60,
          clipPath: 'inset(100% 0 0 0)'
        },
        { 
          opacity: 1, 
          y: 0,
          clipPath: 'inset(0% 0 0 0)',
          duration: 0.8, 
          stagger: 0.15,
          ease: 'expo.out',
          delay: 0.5
        }
      );

      // Subheadline fade in
      gsap.fromTo(content.querySelector('.subheadline'),
        { opacity: 0, filter: 'blur(10px)' },
        { 
          opacity: 1, 
          filter: 'blur(0px)',
          duration: 0.7, 
          ease: 'smooth',
          delay: 1.1
        }
      );

      // CTA buttons bounce in
      gsap.fromTo(content.querySelectorAll('.cta-btn'),
        { opacity: 0, scale: 0.5 },
        { 
          opacity: 1, 
          scale: 1,
          duration: 0.6, 
          stagger: 0.1,
          ease: 'elastic.out(1, 0.5)',
          delay: 1.3
        }
      );

      // Hero image 3D rotate in
      gsap.fromTo(image,
        { opacity: 0, rotateY: 45, transformPerspective: 1000 },
        { 
          opacity: 1, 
          rotateY: 0,
          duration: 1,
          ease: 'expo.out',
          delay: 0.8
        }
      );

      // Scroll-triggered parallax
      const scrollTriggers: ScrollTrigger[] = [];

      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
          onUpdate: (self) => {
            const progress = self.progress;
            gsap.set(words, { y: -80 * progress });
            gsap.set(image, { y: -120 * progress, scale: 1 - 0.1 * progress });
            gsap.set(content, { opacity: 1 - progress * 2 });
          }
        })
      );

      return () => {
        scrollTriggers.forEach(st => st.kill());
      };
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center gradient-mesh overflow-hidden"
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${2 + Math.random() * 6}px`,
              height: `${2 + Math.random() * 6}px`,
              opacity: 0.2 + Math.random() * 0.3,
              animation: `float ${8 + Math.random() * 8}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="w-full px-6 lg:px-12 py-32 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Content */}
        <div ref={contentRef} className="order-2 lg:order-1">
          {/* Headline */}
          <div ref={headlineRef} className="mb-8">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-medium leading-[1.05] tracking-tight">
              <span className="word block">Krishna L</span>
              <span className="word block">Developer</span>
              <span className="word block text-white/60">& Intern as Software Trainee</span>
            </h1>
          </div>

          {/* Subheadline */}
          <p className="subheadline text-lg lg:text-xl text-white/70 max-w-lg mb-10 leading-relaxed">
            MCA Student at BMSITM | Full-Stack Developer | Machine Learning Enthusiast. 
            Building intelligent solutions with Python, React, and Cloud Technologies.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button
              onClick={scrollToProjects}
              className="cta-btn group px-8 py-4 bg-white text-black rounded-full font-medium flex items-center gap-3 hover:scale-105 transition-transform duration-300"
              style={{ transitionTimingFunction: 'var(--ease-elastic)' }}
            >
              <Sparkles size={18} />
              View My Work
              <ArrowDown size={18} className="group-hover:translate-y-1 transition-transform" />
            </button>
            <button
              onClick={scrollToContact}
              className="cta-btn px-8 py-4 border border-white/20 rounded-full font-medium hover:bg-white/10 hover:border-white/40 transition-all duration-300"
            >
              Get In Touch
            </button>
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            <a
              href="https://github.com/Krishna5459"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              <Github size={18} />
              <span className="text-sm">GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/krishna-l-998183204"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              <Linkedin size={18} />
              <span className="text-sm">LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Hero Image */}
        <div 
          ref={imageRef}
          className="order-1 lg:order-2 flex justify-center lg:justify-end"
          style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
        >
          <div className="relative float">
            {/* Glow Effect */}
            <div className="absolute -inset-4 bg-gradient-to-br from-white/10 to-transparent rounded-3xl blur-2xl opacity-50" />
            
            {/* Image Container */}
            <div 
              className="relative w-72 sm:w-80 lg:w-96 aspect-[3/4] rounded-2xl overflow-hidden"
              style={{
                boxShadow: '0 25px 80px rgba(0,0,0,0.6), 0 0 40px rgba(255,255,255,0.05)'
              }}
            >
              <img
                src="/profile-photo.jpg"
                alt="Krishna L - Developer & ML Engineer"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            {/* Floating Badge */}
            <div 
              className="absolute -bottom-4 -left-4 px-5 py-3 glass rounded-xl"
              style={{ animation: 'float 5s ease-in-out infinite', animationDelay: '1s' }}
            >
              <div className="text-xs text-white/60 mb-1">MCA Student</div>
              <div className="text-sm font-medium">BMSITM Bangalore</div>
            </div>

            {/* PGCET Rank Badge */}
            <div 
              className="absolute -top-4 -right-4 px-4 py-2 glass rounded-xl"
              style={{ animation: 'float 6s ease-in-out infinite', animationDelay: '0.5s' }}
            >
              <div className="text-xs text-white/60 mb-1">PGCET Rank</div>
              <div className="text-lg font-bold text-white">455</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#010101] to-transparent pointer-events-none" />
    </section>
  );
};

export default Hero;
