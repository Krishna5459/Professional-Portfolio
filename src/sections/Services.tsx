import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Cloud, Database, Brain, Server, Globe, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  id: number;
  icon: React.ElementType;
  title: string;
  description: string;
  items: string[];
}

const skills: Skill[] = [
  {
    id: 1,
    icon: Code,
    title: 'Programming',
    description: 'Strong foundation in programming languages and software development',
    items: ['Python', 'SQL', 'JavaScript', 'Java', 'React.js', 'Node.js']
  },
  {
    id: 2,
    icon: Cloud,
    title: 'Cloud Technologies',
    description: 'Cloud computing knowledge with hands-on experience in major platforms',
    items: ['AWS EC2', 'AWS S3', 'AWS IAM', 'Azure Basics', 'Google Cloud', 'Virtualization']
  },
  {
    id: 3,
    icon: Database,
    title: 'Databases',
    description: 'Database design, management, and query optimization',
    items: ['MySQL', 'SQL Workbench', 'Database Design', 'RESTful APIs', 'Express.js']
  },
  {
    id: 4,
    icon: Brain,
    title: 'Machine Learning',
    description: 'ML model development and data analysis for predictive solutions',
    items: ['Python ML Libraries', 'Data Preprocessing', 'Feature Engineering', 'Classification', 'Prediction Models']
  },
  {
    id: 5,
    icon: Server,
    title: 'Networking & OS',
    description: 'Networking fundamentals and Linux system administration',
    items: ['TCP/IP', 'DNS', 'Subnets', 'Routing', 'Linux Commands', 'System Admin']
  },
  {
    id: 6,
    icon: Globe,
    title: 'Web Development',
    description: 'Full-stack web development with modern frameworks',
    items: ['React', 'HTML/CSS', 'Responsive Design', 'REST APIs', 'Frontend', 'Backend']
  }
];

const certifications = [
  { name: 'VMware vSphere', provider: 'Udemy' },
  { name: 'Soft Skills Training', provider: 'Tantalum Academy (Score: 8/10)' },
  { name: 'Cloud Foundations', provider: 'Great Learning Academy' },
  { name: 'Communication with Impact', provider: 'ATOS Prayas Foundation & ICT Academy' },
];

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const certsRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const certs = certsRef.current;
    if (!section || !header) return;

    const ctx = gsap.context(() => {
      const scrollTriggers: ScrollTrigger[] = [];

      // Header animation
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: section,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.fromTo(header.children,
              { y: 40, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'expo.out' }
            );
          }
        })
      );

      // Cards animation
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        scrollTriggers.push(
          ScrollTrigger.create({
            trigger: card,
            start: 'top 85%',
            once: true,
            onEnter: () => {
              gsap.fromTo(card,
                { scale: 0.8, opacity: 0, rotate: -10 },
                { 
                  scale: 1, 
                  opacity: 1, 
                  rotate: 0,
                  duration: 0.7, 
                  delay: 0.2 + i * 0.1,
                  ease: 'elastic.out(1, 0.7)'
                }
              );
            }
          })
        );
      });

      // Certifications animation
      if (certs) {
        scrollTriggers.push(
          ScrollTrigger.create({
            trigger: certs,
            start: 'top 85%',
            once: true,
            onEnter: () => {
              gsap.fromTo(certs.querySelectorAll('.cert-item'),
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'expo.out' }
              );
            }
          })
        );
      }

      return () => {
        scrollTriggers.forEach(st => st.kill());
      };
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-32 lg:py-40 bg-[#010101] overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="w-full px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <span className="text-xs tracking-[0.3em] text-white/50 uppercase block mb-6">
            Skills & Expertise
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium mb-4">
            What I Bring to the Table
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            A diverse skill set spanning development, cloud, and machine learning
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto mb-20">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            const isHovered = hoveredCard === skill.id;
            
            return (
              <div
                key={skill.id}
                ref={el => { cardsRef.current[index] = el; }}
                className={`group relative p-8 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm cursor-pointer transition-all duration-400 ${
                  isHovered ? 'border-white/30 bg-white/[0.05] -translate-y-4' : ''
                }`}
                style={{ 
                  transitionTimingFunction: 'var(--ease-expo-out)',
                  boxShadow: isHovered ? '0 30px 60px rgba(0,0,0,0.4)' : 'none'
                }}
                onMouseEnter={() => setHoveredCard(skill.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Animated Border */}
                <div 
                  className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden`}
                >
                  <div 
                    className="absolute inset-[-100%] animate-spin"
                    style={{
                      background: 'conic-gradient(from 0deg, transparent, rgba(255,255,255,0.1), transparent 30%)',
                      animationDuration: '3s'
                    }}
                  />
                </div>

                {/* Icon */}
                <div className={`relative w-14 h-14 rounded-xl border border-white/10 flex items-center justify-center mb-6 transition-all duration-300 ${
                  isHovered ? 'bg-white/10 border-white/20' : ''
                }`}>
                  <Icon size={24} className="text-white/80" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-medium mb-3">{skill.title}</h3>

                {/* Description */}
                <p className="text-white/60 text-sm leading-relaxed mb-6">
                  {skill.description}
                </p>

                {/* Skill Items */}
                <ul className={`space-y-2 transition-all duration-500 ${
                  isHovered ? 'opacity-100' : 'opacity-70'
                }`}>
                  {skill.items.map((item, i) => (
                    <li 
                      key={i}
                      className="flex items-center gap-2 text-sm text-white/70"
                      style={{
                        transitionDelay: `${i * 50}ms`,
                        opacity: isHovered ? 1 : 0.7,
                        transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
                        transition: 'all 0.3s var(--ease-expo-out)'
                      }}
                    >
                      <Check size={14} className="text-white/40" />
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Hover Glow */}
                <div 
                  className={`absolute -inset-px rounded-2xl bg-gradient-to-br from-white/5 to-transparent blur-xl transition-opacity duration-500 -z-10 ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* Certifications */}
        <div ref={certsRef} className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-medium text-center mb-8">Certifications & Achievements</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {certifications.map((cert, index) => (
              <div 
                key={index}
                className="cert-item flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                  <Award size={18} className="text-white/60" />
                </div>
                <div>
                  <div className="font-medium text-white text-sm">{cert.name}</div>
                  <div className="text-xs text-white/50">{cert.provider}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Import Award icon
import { Award } from 'lucide-react';

export default Services;
