import { useRef, useState } from 'react';
import {
  Mail,
  ArrowUpRight,
  Music2,
} from 'lucide-react';
import ProjectModal from '../components/ProjectModal';

interface HomeProps {
  onLogoClick: () => void;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  tags: string[];
}

export const PROJECTS: Project[] = [
  { id: 1, title: 'of Dream, Death, and Singing', description: 'AI work of AI film festival.', image: '/images/nebula-dreams.png', link: '/project/1', tags: ['AIGC'] },
  { id: 2, title: 'Mr. Inspiration', description: 'Inspiration lies at the heart of all creation. Every spark of inspiration lights up the path to building wonderful dreams.', image: '/images/mr-inspiration.png', link: '/project/2', tags: ['AIGC'] },
  { id: 3, title: 'Coming Soon', description: '', image: '/images/placeholder-1.png', link: '', tags: [] },
  { id: 4, title: 'Coming Soon', description: '', image: '/images/placeholder-2.png', link: '', tags: [] },
  { id: 5, title: 'Coming Soon', description: '', image: '/images/placeholder-3.png', link: '', tags: [] },
  { id: 6, title: 'Coming Soon', description: '', image: '/images/placeholder-4.png', link: '', tags: [] },
];

const ALL_TAGS = ['All', 'AIGC', 'React', 'Game', 'Creative Coding'];

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const setRef = (el: HTMLDivElement | null) => {
    if (!el || observerRef.current) return;
    ref.current = el;
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observerRef.current?.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observerRef.current.observe(el);
  };

  return { ref: setRef, visible };
}

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className} ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function Home({ onLogoClick }: HomeProps) {
  const [activeTag, setActiveTag] = useState('All');
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [emailCopied, setEmailCopied] = useState(false);

  const filteredProjects = activeTag === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.tags.includes(activeTag));

  return (
    <div className="relative min-h-screen">
      {/* Logo */}
      <div className="fixed top-0 left-0 z-50 px-8 py-6 md:px-12">
        <button
          onClick={onLogoClick}
          className="text-white/40 hover:text-white/70 transition-colors duration-500 uppercase bg-transparent border-0 cursor-pointer"
          style={{ fontSize: '0.65rem', letterSpacing: '0.3em', fontWeight: 400, padding: 0 }}
        >
          Coti Lab
        </button>
      </div>

      <main className="relative z-10 px-6 md:px-12 pt-28 pb-24">
        {/* Profile Card */}
        <section className="max-w-2xl mx-auto mb-24">
          <Reveal>
            <div className="card-glass rounded-xl p-7 md:p-10">
              <div className="flex flex-col sm:flex-row gap-7 items-start">
                {/* Avatar */}
                <div className="flex-shrink-0 self-center sm:self-start">
                  <img
                    src="/images/avatar.jpg"
                    alt="Coti Lab"
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover"
                    style={{
                      border: '2px solid rgba(255,255,255,0.08)',
                    }}
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 text-center sm:text-left">
                  <h1 className="font-serif-display text-white text-2xl md:text-3xl mb-1" style={{ fontWeight: 400, letterSpacing: '0.02em' }}>
                    Coti
                  </h1>
                  <p className="text-white/30 text-xs mb-5" style={{ letterSpacing: '0.08em' }}>
                    AIGC Creator &amp; Digital Alchemist
                  </p>

                  <p className="text-white/40 text-sm leading-relaxed mb-6 max-w-md" style={{ fontWeight: 300, lineHeight: 1.7 }}>
                    A creator at the intersection of imagination and computation.
                    Exploring generative art, interactive spaces, and the visual aesthetics of the cosmos.
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6 justify-center sm:justify-start">
                    {['AIGC', 'React', 'Game', 'Creative Coding'].map((skill) => (
                      <span key={skill} className="pill-tag">{skill}</span>
                    ))}
                  </div>

                  {/* Contact row */}
                  <div className="flex flex-wrap gap-5 items-center justify-center sm:justify-start text-white/25 text-xs" style={{ letterSpacing: '0.04em' }}>
                    <button
                      onClick={async () => {
                        await navigator.clipboard.writeText('1835036863@qq.com');
                        setEmailCopied(true);
                        setTimeout(() => setEmailCopied(false), 1500);
                      }}
                      className="relative flex items-center gap-1.5 hover:text-white/60 transition-colors duration-400 bg-transparent border-0 cursor-pointer"
                      style={{ fontSize: 'inherit', letterSpacing: 'inherit', color: 'inherit', padding: 0 }}
                    >
                      <Mail size={12} strokeWidth={1.5} />
                      1835036863@qq.com
                      {emailCopied && (
                        <span className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded text-[10px] bg-white/15 text-white/80 backdrop-blur-sm">
                          Copied!
                        </span>
                      )}
                    </button>
                    <a
                      href="https://v.douyin.com/iSaAEjrT4Wg/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 hover:text-white/60 transition-colors duration-400"
                    >
                      <Music2 size={12} strokeWidth={1.5} />
                      Coti
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Projects */}
        <section className="max-w-5xl mx-auto">
          {/* Section header */}
          <Reveal>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-white/20 text-xs uppercase" style={{ letterSpacing: '0.2em' }}>Ideas</span>
              <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
            </div>
          </Reveal>

          {/* Filters */}
          <Reveal delay={80}>
            <div className="flex flex-wrap gap-2 mb-10">
              {ALL_TAGS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={`pill-tag cursor-pointer ${activeTag === tag ? 'pill-tag-active' : ''}`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Masonry Grid */}
          <div className="masonry-grid">
            {filteredProjects.map((project, index) => (
              <MasonryCard
                key={project.id}
                project={project}
                index={index}
                onOpen={() => setSelectedProject(project.id)}
              />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.04] py-6">
        <div className="max-w-5xl mx-auto px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/15 text-xs" style={{ letterSpacing: '0.05em' }}>
            &copy; {new Date().getFullYear()} Coti Lab
          </p>
          <p className="text-white/15 text-xs" style={{ letterSpacing: '0.05em' }}>
            Crafted with cosmic curiosity
          </p>
        </div>
      </footer>

      {/* Project Detail Modal */}
      <ProjectModal
        projectId={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}

function MasonryCard({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  const { ref, visible } = useScrollReveal();
  const [hovered, setHovered] = useState(false);
  const isPlaceholder = !project.link;

  return (
    <div
      ref={ref}
      className={`masonry-item transition-all duration-500 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      style={{ transitionDelay: `${(index % 3) * 60 + Math.floor(index / 3) * 100}ms` }}
    >
      <button
        onClick={isPlaceholder ? undefined : onOpen}
        className={`group flex flex-col relative rounded-lg overflow-hidden w-full h-full text-left ${isPlaceholder ? 'cursor-default' : 'cursor-pointer'}`}
        style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.04)' }}
        onMouseEnter={() => !isPlaceholder && setHovered(true)}
        onMouseLeave={() => !isPlaceholder && setHovered(false)}
      >
        {/* Image */}
        <div className="relative overflow-hidden aspect-[4/3]">
          <img
            src={project.image}
            alt={project.title}
            className={`w-full h-full object-cover transition-transform duration-700 ease-out ${hovered ? 'scale-[1.03]' : 'scale-100'}`}
          />
          {isPlaceholder ? (
            <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.35)' }}>
              <span className="text-white/15 text-xs" style={{ letterSpacing: '0.1em' }}>COMING SOON</span>
            </div>
          ) : (
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-500 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-all duration-400 transform translate-y-2 group-hover:translate-y-0">
                <div className="flex items-center gap-1.5 text-white/60 text-xs" style={{ letterSpacing: '0.08em' }}>
                  open <ArrowUpRight size={11} strokeWidth={1.5} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-3.5">
          <h3 className={`font-medium text-sm mb-1 transition-colors duration-300 ${isPlaceholder ? 'text-white/20' : 'text-white/80 group-hover:text-white'}`} style={{ fontWeight: 400, letterSpacing: '0.02em' }}>
            {project.title}
          </h3>
          {project.description && (
            <p className="text-white/25 text-xs mb-3 line-clamp-2" style={{ lineHeight: 1.6, fontWeight: 300 }}>
              {project.description}
            </p>
          )}
          {project.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span key={tag} className="px-2 py-0.5 rounded-full text-[10px] text-white/30 bg-white/[0.04] border border-white/[0.05]" style={{ letterSpacing: '0.02em' }}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </button>
    </div>
  );
}
