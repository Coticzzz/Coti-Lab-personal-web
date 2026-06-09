import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, FileText, ExternalLink } from 'lucide-react';

interface ProjectDetailData {
  id: number;
  title: string;
  shortDesc: string;
  fullDescription: string[];
  image: string;
  video?: string;
  projectUrl: string;
  docUrl: string;
  tags: string[];
  tools: string[];
  year: string;
}

const PROJECT_DETAILS: Record<number, ProjectDetailData> = {
  1: {
    id: 1, title: 'of  Dream, Death, and Singing', shortDesc: 'AI work of AI film festival.',
    fullDescription: [
      'This philosophical short film explores how a dying individual reconciles with themselves, their roots, and mortality through dreamlike memory retrospection. My core motivation is to examine a profound truth: at life\'s final moment, the greatest fear is not death itself, but the forgotten love and blessings from one\'s origins. Protagonist Chen Yisheng fled his rural hometown to chase urban "success," only to confront this painful realization at 82 on his deathbed.',
      'Rejecting linear narrative, the film strictly follows the psychological logic of a deathbed life review. Through surreal imagery—hospital doors opening to fog-shrouded grasslands, Death incarnated as a silent white horse, childhood flames igniting an elderly man\'s oil lamp—it completely dissolves the boundary between reality and dreams, immersing audiences in an "ongoing dream" where intuition and subconscious replace causal relationships.',
      'Visually, it merges Tarkovsky\'s poetic long takes with David Lynch\'s surrealist aesthetics, using color as a narrative device: dim yellow for fading life, warm red for the Chaoshan "Chu Huayuan" coming-of-age ritual (the emotional core), cool blue-gray for urban alienation, and purple for psychedelic suspense about the line between life and death.',
      'Rooted in Chaoshan folk culture, the grandmother\'s oil lamp and her exhortation "Where there is light, there is no fear" serve as both the protagonist\'s spiritual talisman and key to liberation. Inspired by Zhuangzi\'s "life is but a dream" and Borges\' meditation on time, this is no elegy for death. Instead, it reveals that what we spend our lives searching for has always been waiting at the place we started.',
    ],
    image: '/images/nebula-dreams.png', projectUrl: 'mailto:1835036863@qq.com', docUrl: '/files/technical-whitepaper.pdf',
    tags: ['AIGC'], tools: ['Kimi2.6', 'Nano Banana Pro', 'Seedance 2.0', 'Kling 3.0', 'DaVinci Resolve 20'], year: '2026',
  },
  3: {
    id: 3, title: 'AI LUT Factory', shortDesc: 'AI-powered professional cinematic LUT color grading factory.',
    fullDescription: [
      'Using artificial intelligence, rapidly generate multiple cinematic color grading LUT styles to fuel endless inspiration for film production and visual design.',
      'Features AI-driven generation, diverse professional film-grade styles, 3D LUT export (.cube format), and highly customizable parameters — built on deep learning for flexible creative workflows.',
    ],
    image: '/images/ai-lut-factory.png', projectUrl: 'https://github.com/Coticzzz/-ai-lut-factory', docUrl: 'https://github.com/Coticzzz/-ai-lut-factory',
    tags: ['Code'], tools: ['Claude Code', 'AI'], year: '2026',
  },
  2: {
    id: 2, title: 'Mr. Inspiration', shortDesc: 'Inspiration lies at the heart of all creation.',
    fullDescription: [
      'Inspiration lies at the heart of all creation. Every spark of inspiration lights up the path to building wonderful dreams. Daily trivial moments often hide unexpected creativity. Luckin Coffee accompanies you to capture fleeting thoughts, awaken inner passion and turn vague ideas into real works.',
      'Every sip refreshes your mind and fuels imagination. Choose Luckin, embrace inspiration, and let us pursue dreams and create possibilities side by side.',
    ],
    image: '/images/mr-inspiration.png', video: '/videos/mr-inspiration.webm', projectUrl: 'mailto:1835036863@qq.com', docUrl: '/videos/mr-inspiration.webm',
    tags: ['AIGC'], tools: ['Dreamina', 'CapCut'], year: '2025',
  },
};

interface ProjectModalProps {
  projectId: number | null;
  onClose: () => void;
}

export default function ProjectModal({ projectId, onClose }: ProjectModalProps) {
  const project = projectId ? PROJECT_DETAILS[projectId] : null;
  const [docFeedback, setDocFeedback] = useState(false);
  const [projectFeedback, setProjectFeedback] = useState(false);

  // ESC to close
  useEffect(() => {
    if (!project) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  if (!project) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[101] bg-black/70 backdrop-blur-sm animate-modal-fade-in"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div
        className="relative z-[102] w-full max-w-3xl mx-4 md:mx-auto rounded-lg overflow-hidden animate-modal-slide-up flex flex-col"
        style={{
          background: 'rgba(15, 15, 18, 0.92)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          maxHeight: '94vh',
        }}
      >
        {/* Image / Video */}
        <div className="relative overflow-hidden aspect-video flex-shrink-0">
          {project.video ? (
            <video
              src={project.video}
              poster={project.image}
              className="w-full h-full object-cover"
              controls
              playsInline
            />
          ) : (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Fixed header: meta + title + shortDesc */}
        <div className="flex-shrink-0 px-7 md:px-10 pt-7 md:pt-10">
          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="text-white/15 text-xs" style={{ letterSpacing: '0.1em' }}>
              {project.year}
            </span>
            <span className="text-white/10">/</span>
            {project.tags.map((tag) => (
              <span key={tag} className="pill-tag">{tag}</span>
            ))}
          </div>

          {/* Title */}
          <h2
            className="font-serif-display text-white mb-2"
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              fontWeight: 300,
              letterSpacing: '-0.01em',
              lineHeight: 1.15,
            }}
          >
            {project.title}
          </h2>

          <p className="text-white/30 text-sm pb-6" style={{ fontWeight: 300, letterSpacing: '0.02em' }}>
            {project.shortDesc}
          </p>

          {/* Divider */}
          <div className="h-px" style={{ background: 'rgba(255,255,255,0.05)' }} />
        </div>

        {/* Scrollable area: description + tools */}
        <div className="flex-1 overflow-y-auto px-7 md:px-10 pt-6">
          {/* Description paragraphs */}
          <div className="space-y-4 mb-10 max-w-xl">
            {project.fullDescription.map((para, i) => (
              <p
                key={i}
                className="text-white/40 text-sm"
                style={{ fontWeight: 300, lineHeight: 1.8, letterSpacing: '0.01em' }}
              >
                {para}
              </p>
            ))}
          </div>

          {/* Tools */}
          <div className="pb-6">
            <h3 className="text-white/20 text-xs uppercase mb-3" style={{ letterSpacing: '0.15em' }}>
              Tools
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((tool) => (
                <span
                  key={tool}
                  className="px-3 py-1 text-xs text-white/30 border border-white/[0.06] rounded-sm"
                  style={{ letterSpacing: '0.02em' }}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons - always visible at bottom */}
        <div className="flex-shrink-0 px-7 md:px-10 pb-7 md:pb-10">
          <div className="h-px mb-6" style={{ background: 'rgba(255,255,255,0.06)' }} />
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={project.docUrl}
              download
              className={`btn-minimal inline-flex items-center justify-center gap-2 transition-all duration-300 ${docFeedback ? '!bg-white/15 !border-white/35 !text-white shadow-[0_0_20px_rgba(255,255,255,0.08)]' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                setDocFeedback(true);
                setTimeout(() => setDocFeedback(false), 1500);
              }}
            >
              <FileText size={13} strokeWidth={1.5} />
              {docFeedback ? 'Downloading...' : 'View Documentation'}
            </a>
            <button
              className={`btn-minimal inline-flex items-center justify-center gap-2 transition-all duration-300 ${projectFeedback ? '!bg-white/15 !border-white/35 !text-white shadow-[0_0_20px_rgba(255,255,255,0.08)]' : ''}`}
              onClick={async (e) => {
                e.stopPropagation();
                await navigator.clipboard.writeText('1835036863@qq.com');
                setProjectFeedback(true);
                setTimeout(() => setProjectFeedback(false), 1500);
              }}
            >
              <ExternalLink size={13} strokeWidth={1.5} />
              {projectFeedback ? 'Mail Copied!' : 'View Project'}
            </button>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-sm text-white/40 hover:text-white/80 hover:bg-white/5 transition-all duration-300"
          aria-label="Close"
        >
          <X size={16} strokeWidth={1.5} />
        </button>
      </div>
    </div>,
    document.body
  );
}
