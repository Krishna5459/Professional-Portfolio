import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, BookOpen, Briefcase, type LucideIcon } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

type DetailCardItem = {
  title: string;
  subtitle: string;
  detail: string;
  icon: LucideIcon;
};

const DetailCard = ({ item }: { item: DetailCardItem }) => {
  const Icon = item.icon;

  return (
    <div className="edu-card flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
      <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
        <Icon size={20} className="text-white/60" />
      </div>
      <div>
        <div className="font-medium text-white">{item.title}</div>
        <div className="text-sm text-white/60">{item.subtitle}</div>
        <div className="text-xs text-white/40 mt-1">{item.detail}</div>
      </div>
    </div>
  );
};

const InternshipCard = ({ item }: { item: DetailCardItem }) => {
  const Icon = item.icon;

  return (
    <div className="internship-card group relative rounded-3xl bg-white/[0.02] border border-white/10 overflow-hidden h-full">
      <div className="relative p-6 lg:p-8 min-h-[220px] flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <span className="text-sm text-white/60 tracking-wide px-3 py-1 rounded-full bg-white/5">
            Experience
          </span>
          <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
            <Icon size={18} className="text-white/60" />
          </div>
        </div>

        <h3 className="text-2xl lg:text-3xl font-medium mb-2 group-hover:translate-x-1 transition-transform duration-300">
          {item.title}
        </h3>
        <p className="text-white/60 mb-4">{item.subtitle}</p>
        <p className="text-white/70 text-sm leading-relaxed">{item.detail}</p>
      </div>

      <div className="absolute inset-0 rounded-3xl border border-white/0 group-hover:border-white/20 transition-colors duration-500 pointer-events-none" />
    </div>
  );
};

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const content = contentRef.current;
    const stats = statsRef.current;
    if (!section || !image || !content || !stats) return;

    const ctx = gsap.context(() => {
      const scrollTriggers: ScrollTrigger[] = [];

      // Section label typewriter effect
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: section,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.fromTo(content.querySelector('.section-label'),
              { width: 0, opacity: 0 },
              { width: 'auto', opacity: 1, duration: 0.6, ease: 'steps(8)' }
            );
          }
        })
      );

      // Headline word reveal
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: section,
          start: 'top 75%',
          once: true,
          onEnter: () => {
            const words = content.querySelectorAll('.headline-word');
            gsap.fromTo(words,
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'expo.out', delay: 0.1 }
            );
          }
        })
      );

      // Body paragraphs fade in
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: section,
          start: 'top 70%',
          once: true,
          onEnter: () => {
            gsap.fromTo(content.querySelectorAll('.body-text'),
              { opacity: 0, y: 40 },
              { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'smooth', delay: 0.4 }
            );
          }
        })
      );

      // Education and internship cards
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: section,
          start: 'top 70%',
          once: true,
          onEnter: () => {
            gsap.fromTo(content.querySelectorAll('.edu-card, .internship-card'),
              { opacity: 0, x: -30 },
              { opacity: 1, x: 0, duration: 0.6, stagger: 0.15, ease: 'expo.out', delay: 0.6 }
            );
          }
        })
      );

      // Image slide in with reveal
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: section,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.fromTo(image,
              { x: -100, opacity: 0, clipPath: 'inset(0 100% 0 0)' },
              { x: 0, opacity: 1, clipPath: 'inset(0 0% 0 0)', duration: 1, ease: 'expo.out', delay: 0.2 }
            );
          }
        })
      );

      // Stats count up animation
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: stats,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            const statNumbers = stats.querySelectorAll('.stat-number');
            statNumbers.forEach((stat, index) => {
              const target = parseFloat(stat.getAttribute('data-target') || '0');
              const isDecimal = stat.getAttribute('data-decimal') === 'true';
              gsap.fromTo(stat,
                { opacity: 0, y: 20 },
                { 
                  opacity: 1, 
                  y: 0, 
                  duration: 0.8, 
                  delay: 0.7 + index * 0.15,
                  ease: 'expo.out',
                  onUpdate: function() {
                    const progress = this.progress();
                    const value = target * progress;
                    stat.textContent = isDecimal ? value.toFixed(2) : Math.round(value).toString();
                  }
                }
              );
            });
          }
        })
      );

      // Parallax effect on scroll
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
          onUpdate: (self) => {
            const progress = self.progress;
            gsap.set(image, { y: 50 - progress * 100 });
            gsap.set(content, { y: -progress * 30 });
          }
        })
      );

      return () => {
        scrollTriggers.forEach(st => st.kill());
      };
    }, section);

    return () => ctx.revert();
  }, []);

  const headlineWords = ['Passionate', 'About', 'Technology'];

  const stats = [
    { number: 5, label: 'GitHub Projects' },
    { number: 8.5, label: 'MCA CGPA', decimal: true },
    { number: 455, label: 'PGCET Rank' },
  ];

  const education: DetailCardItem[] = [
    {
      title: 'Master of Computer Application',
      subtitle: 'BMS Institute of Technology and Management',
      detail: 'CGPA: 8.5 | Dec 2024 - Present',
      icon: GraduationCap
    },
    {
      title: 'Bachelor of Computer Applications',
      subtitle: 'Soundarya Institute of Management and Science',
      detail: 'CGPA: 8.00 | Aug 2020 - Sept 2023',
      icon: BookOpen
    }
  ];

  const experience: DetailCardItem[] = [
    {
      title: 'Software Trainee Intern',
      subtitle: 'Probits Technology Private Ltd',
      detail: 'Contributing to MERN full-stack development, testing and deployment, collaborating with cross-functional teams, creating UI prototypes in Figma, and maintaining coding best practices.',
      icon: Briefcase
    }
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-32 lg:py-40 bg-[#010101] overflow-hidden"
    >
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/[0.02] to-transparent pointer-events-none" />

      <div className="w-full px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image */}
          <div ref={imageRef} className="relative">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              {/* Glow */}
              <div className="absolute -inset-4 bg-gradient-to-br from-white/5 to-transparent rounded-3xl blur-2xl" />
              
              <img
                src="/profile-photo.jpg"
                alt="Krishna L"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#010101]/60 via-transparent to-transparent" />
            </div>

            {/* Decorative Element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border border-white/10 rounded-2xl" />
            <div className="absolute -top-6 -left-6 w-24 h-24 border border-white/5 rounded-full" />
          </div>

          {/* Content */}
          <div ref={contentRef}>
            {/* Section Label */}
            <div className="section-label overflow-hidden mb-6">
              <span className="text-xs tracking-[0.3em] text-white/50 uppercase">
                About Me
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium leading-tight mb-8">
              {headlineWords.map((word, i) => (
                <span key={i} className="headline-word inline-block mr-4">
                  {word}
                </span>
              ))}
            </h2>

            {/* Body Text */}
            <div className="space-y-6 text-white/70 text-lg leading-relaxed mb-10">
              <p className="body-text">
                I'm Krishna L, an MCA student at BMS Institute of Technology and Management 
                with a passion for building things that actually work. With a strong foundation in 
                Computer Applications (BCA CGPA: 8.00) and current MCA studies (CGPA: 8.5), 
                I specialize in full-stack development and machine learning.
              </p>
              <p className="body-text">
                My expertise spans Python, SQL, React.js, Node.js, and Cloud Technologies 
                (AWS, Azure, GCP). I secured PGCET Rank 455 in 2024 and love creating 
                random stuff that solves real problems. I am currently working as a Software 
                Trainee Intern at Probits Technology Private Ltd.
              </p>
            </div>

            {/* Education + Internship */}
            <div className="grid lg:grid-cols-2 gap-6 mb-14">
              <div>
                <div className="text-xs tracking-[0.2em] text-white/50 uppercase mb-4">Internship</div>
                {experience.map((item, index) => (
                  <InternshipCard key={index} item={item} />
                ))}
              </div>

              <div>
                <div className="text-xs tracking-[0.2em] text-white/50 uppercase mb-4">Education</div>
                <div className="space-y-4">
                  {education.map((item, index) => (
                    <DetailCard key={index} item={item} />
                  ))}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-3 gap-8 mb-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center lg:text-left">
                  <div 
                    className="stat-number text-4xl lg:text-5xl font-medium mb-2"
                    data-target={stat.number}
                    data-decimal={stat.decimal || false}
                  >
                    0
                  </div>
                  <div className="text-sm text-white/50">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
