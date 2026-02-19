import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  category: string;
  title: string;
  description: string;
  tech: string[];
  color: string;
  github: string;
  live?: string;
}

const projects: Project[] = [
  {
    id: 1,
    category: 'Full-Stack Web App',
    title: 'MyBooks',
    description: 'An online book reading platform with CRUD operations. Users can browse books by genre, select a book, and read it in a beautifully designed book-like interface using CSS.',
    tech: ['React.js', 'Node.js', 'Express.js', 'MySQL', 'CSS'],
    color: 'from-blue-500/20',
    github: 'https://github.com/Krishna5459/Mybooks',
    live: 'https://mybooks-chi.vercel.app'
  },
  {
    id: 2,
    category: 'Machine Learning',
    title: 'Air Quality Prediction',
    description: 'Machine learning project that predicts air quality levels based on environmental data inputs. Features a trained model with pre-processed datasets for accurate predictions.',
    tech: ['Python', 'Flask', 'SCSS', 'JavaScript', 'ML'],
    color: 'from-green-500/20',
    github: 'https://github.com/Krishna5459/Air-Quality-Prediction'
  },
  {
    id: 3,
    category: 'Machine Learning',
    title: 'GrowCast',
    description: 'Crop quality prediction system using Machine Learning and Flask. Helps farmers predict crop quality based on soil and environmental data for better agricultural decisions.',
    tech: ['Python', 'Flask', 'JavaScript', 'CSS', 'HTML'],
    color: 'from-emerald-500/20',
    github: 'https://github.com/Krishna5459/GrowCast'
  },
  {
    id: 4,
    category: 'Mobile App',
    title: 'KrishiMitra',
    description: 'Android application developed to assist farmers with price prediction and other agricultural features. Built with Java and Kotlin for a seamless mobile experience.',
    tech: ['Java', 'Kotlin', 'Android', 'ML', 'Firebase'],
    color: 'from-orange-500/20',
    github: 'https://github.com/Krishna5459/KrishiMitra'
  },
  {
    id: 5,
    category: 'Machine Learning',
    title: 'Email Sentiment Analysis',
    description: 'Sentiment analysis tool for emails using machine learning techniques. Analyzes email content to determine sentiment and emotional tone.',
    tech: ['Python', 'JavaScript', 'NLP', 'ML'],
    color: 'from-purple-500/20',
    github: 'https://github.com/Krishna5459/Email-Sentimental-Anlaysis'
  }
];

const Projects = () => {
  const showLiveDemoButton = false;
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    if (!section || !header) return;

    const ctx = gsap.context(() => {
      const scrollTriggers: ScrollTrigger[] = [];

      // Header animations
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: section,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.fromTo(header.querySelector('.section-label'),
              { x: -50, opacity: 0 },
              { x: 0, opacity: 1, duration: 0.6, ease: 'expo.out' }
            );
            
            const words = header.querySelectorAll('.headline-word');
            gsap.fromTo(words,
              { y: 50, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.7, stagger: 0.06, ease: 'expo.out', delay: 0.1 }
            );
            
            gsap.fromTo(header.querySelector('.subtext'),
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.5, ease: 'smooth', delay: 0.4 }
            );
          }
        })
      );

      // Cards animation - staggered reveal
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        scrollTriggers.push(
          ScrollTrigger.create({
            trigger: card,
            start: 'top 85%',
            once: true,
            onEnter: () => {
              gsap.fromTo(card,
                { opacity: 0, y: 80, rotateX: 15 },
                { 
                  opacity: 1, 
                  y: 0, 
                  rotateX: 0,
                  duration: 0.8, 
                  delay: i * 0.1, 
                  ease: 'expo.out' 
                }
              );
            }
          })
        );
      });

      return () => {
        scrollTriggers.forEach(st => st.kill());
      };
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative bg-[#010101] overflow-hidden py-32"
    >
      {/* Header */}
      <div ref={headerRef} className="w-full px-6 lg:px-12 mb-16">
        <span className="section-label text-xs tracking-[0.3em] text-white/50 uppercase block mb-6">
          Selected Works
        </span>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium mb-4">
          {'Projects from GitHub'.split(' ').map((word, i) => (
            <span key={i} className="headline-word inline-block mr-4">
              {word}
            </span>
          ))}
        </h2>
        <p className="subtext text-white/60 text-lg max-w-md">
          Real projects I've built and deployed
        </p>
      </div>

      {/* Projects Grid */}
      <div className="px-6 lg:px-12">
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto" style={{ perspective: '1500px' }}>
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={el => { cardsRef.current[index] = el; }}
              className="project-card group relative rounded-3xl overflow-hidden"
              style={{ 
                transformStyle: 'preserve-3d',
                boxShadow: '0 25px 80px rgba(0,0,0,0.5)'
              }}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.color} via-black/60 to-black/80`} />

              {/* Content */}
              <div className="relative p-8 lg:p-10 min-h-[380px] flex flex-col">
                {/* Top Row */}
                <div className="flex justify-between items-start mb-6">
                  {/* Category */}
                  <span className="text-sm text-white/60 tracking-wide px-3 py-1 rounded-full bg-white/5">
                    {project.category}
                  </span>
                  
                  {/* Project Number */}
                  <span className="text-5xl font-bold text-white/5">
                    0{project.id}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-3xl lg:text-4xl font-medium mb-4 group-hover:translate-x-2 transition-transform duration-500">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-white/70 text-base leading-relaxed mb-6 flex-grow">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, i) => (
                    <span 
                      key={i}
                      className="text-xs px-3 py-1.5 rounded-full bg-white/5 text-white/60 border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 hover:bg-white/10 transition-all duration-300"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Github size={16} />
                    <span className="text-sm">View Code</span>
                  </a>
                  {showLiveDemoButton && project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black hover:bg-white/90 transition-all duration-300"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink size={16} />
                      <span className="text-sm">Live Demo</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Border Glow on Hover */}
              <div className="absolute inset-0 rounded-3xl border border-white/0 group-hover:border-white/20 transition-colors duration-500 pointer-events-none" />
              
              {/* Hover Glow */}
              <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />
            </div>
          ))}
        </div>
      </div>

      {/* View All GitHub */}
      <div className="text-center mt-16">
        <a
          href="https://github.com/Krishna5459"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-8 py-4 border border-white/20 rounded-full font-medium hover:bg-white/10 hover:border-white/40 transition-all duration-300"
        >
          <Github size={20} />
          View All Projects on GitHub
          <ArrowUpRight size={18} />
        </a>
      </div>
    </section>
  );
};

export default Projects;
