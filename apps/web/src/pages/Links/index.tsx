import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Github,
  Linkedin,
  Code2,
  MessageCircle,
  Instagram,
  Youtube,
  FileText,
  ExternalLink,
} from 'lucide-react';

export const meta = () => [
  { title: '@ZauJulio — Links' },
  { name: 'description', content: 'Software Developer — All my links in one place.' },
];

// ─── Data ────────────────────────────────────────────────────

interface LinkItem {
  id: string;
  title: string;
  url: string;
  icon: React.ReactNode;
  featured?: boolean;
  thumbnail?: string;
}

interface SocialItem {
  label: string;
  url: string;
  icon: React.ReactNode;
}

// Links and socials are built inside the component to access t()



// ─── Component ───────────────────────────────────────────────

export default function LinksPage() {
  const { t } = useTranslation();

  // Track page view with Umami
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).umami) {
      (window as any).umami.track('links-page-view');
    }
  }, []);

  const links: LinkItem[] = [
    {
      id: 'resume',
      title: t('links.resume'),
      url: 'https://raw.githubusercontent.com/ZauJulio/ZauJulio/refs/heads/main/resume/resume.pdf',
      icon: <FileText className='size-5' />,
      featured: true,
    },
    {
      id: 'linkedin',
      title: t('links.linkedin'),
      url: 'https://www.linkedin.com/in/zaujulio',
      icon: <Linkedin className='size-5' />,
    },
    {
      id: 'github',
      title: t('links.github'),
      url: 'https://github.com/ZauJulio',
      icon: <Github className='size-5' />,
    },
    {
      id: 'codersrank',
      title: t('links.codersrank'),
      url: 'https://profile.codersrank.io/user/zaujulio',
      icon: <Code2 className='size-5' />,
    },
    {
      id: 'discord',
      title: t('links.discord'),
      url: 'https://discordapp.com/users/439441026021851136',
      icon: <MessageCircle className='size-5' />,
    },
  ];

  const socials: SocialItem[] = [
    { label: 'Instagram', url: 'https://instagram.com/ZauJulio', icon: <Instagram className='size-6' /> },
    { label: 'YouTube', url: 'https://www.youtube.com/@zaujulio', icon: <Youtube className='size-6' /> },
    {
      label: 'X',
      url: 'https://x.com/zaujulio_dev',
      icon: (
        <svg fill='currentColor' width='20' height='20' viewBox='0 0 24 24'>
          <path d='M17.805 2.97h3.065l-6.73 7.664 7.863 10.396h-6.171L11 14.712 5.47 21.03H2.403l7.131-8.197-7.53-9.864h6.324l4.365 5.772zm-1.073 16.26h1.7L7.434 4.703H5.609z' />
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* Umami analytics script (standalone for this page) */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        :root {
          --links-void: #080004;
          --links-900: #2D132C;
          --links-800: #521026;
          --links-700: #801336;
          --links-600: #A82033;
          --links-500: #C72C41;
          --links-400: #EE4540;
          --links-300: #F47370;
          --links-200: #FAA8A7;
          --links-100: #FDE8E8;
        }
        
        .links-page {
          font-family: 'Inter', 'Geist Sans', system-ui, sans-serif;
          min-height: 100vh;
          background: var(--links-void);
          background-image: 
            radial-gradient(ellipse at 50% 0%, rgba(45,19,44,0.4) 0%, transparent 55%),
            radial-gradient(ellipse at 50% 100%, rgba(45, 19, 44, 0.15) 0%, transparent 50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 3rem 1rem 4rem;
        }
        
        .links-container {
          width: 100%;
          max-width: 680px;
        }
        
        .links-avatar {
          width: 96px;
          height: 96px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid var(--links-700);
          box-shadow: 0 0 30px rgba(199, 44, 65, 0.2);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .links-avatar:hover {
          transform: scale(1.05);
          box-shadow: 0 0 40px rgba(199, 44, 65, 0.4);
        }
        
        .links-name {
          font-size: 1.5rem;
          font-weight: 700;
          color: #fff;
          margin: 1rem 0 0.25rem;
          letter-spacing: -0.02em;
        }
        
        .links-bio {
          font-size: 0.875rem;
          color: var(--links-200);
          font-weight: 400;
          margin: 0;
          opacity: 0.9;
        }
        
        .links-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 2rem;
          width: 100%;
        }
        
        .link-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.25rem;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #fff;
          text-decoration: none;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(8px);
        }
        
        .link-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, var(--links-500), var(--links-400));
          opacity: 0;
          transition: opacity 0.3s ease;
          border-radius: inherit;
        }
        
        .link-card:hover {
          border-color: var(--links-500);
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(199, 44, 65, 0.2);
        }
        
        .link-card:hover::before {
          opacity: 0.08;
        }
        
        .link-card:active {
          transform: scale(0.98);
        }
        
        .link-card-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.08);
          color: var(--links-300);
          flex-shrink: 0;
          position: relative;
          z-index: 1;
          transition: background 0.25s ease, color 0.25s ease;
        }
        
        .link-card:hover .link-card-icon {
          background: rgba(199, 44, 65, 0.15);
          color: var(--links-400);
        }
        
        .link-card-title {
          font-weight: 500;
          font-size: 1rem;
          position: relative;
          z-index: 1;
          flex: 1;
        }
        
        .link-card-arrow {
          color: rgba(255, 255, 255, 0.3);
          flex-shrink: 0;
          position: relative;
          z-index: 1;
          transition: color 0.25s ease, transform 0.25s ease;
        }
        
        .link-card:hover .link-card-arrow {
          color: var(--links-300);
          transform: translateX(3px);
        }
        
        /* Featured card */
        .link-card.featured {
          background: linear-gradient(135deg, rgba(199, 44, 65, 0.12), rgba(238, 69, 64, 0.06));
          border-color: rgba(199, 44, 65, 0.25);
        }
        
        .link-card.featured .link-card-icon {
          background: rgba(199, 44, 65, 0.2);
          color: var(--links-400);
        }
        
        /* Social icons */
        .socials-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin-top: 2rem;
        }
        
        .social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: none;
          background: transparent;
          color: var(--links-200);
          cursor: pointer;
          transition: all 0.25s ease;
          text-decoration: none;
        }
        
        .social-btn:hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.08);
          transform: scale(1.1);
        }
        
        /* Footer */
        .links-footer {
          margin-top: 3rem;
          text-align: center;
        }
        
        .links-footer a {
          font-size: 0.75rem;
          color: var(--links-300);
          text-decoration: none;
          opacity: 0.6;
          transition: opacity 0.2s ease;
          letter-spacing: 0.02em;
        }
        
        .links-footer a:hover {
          opacity: 1;
        }
        
        /* Animation */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-in {
          animation: fadeInUp 0.5s ease-out both;
        }
      `}</style>
      
      <div className='links-page'>
        <div className='links-container'>
          {/* Profile Header */}
          <div className='animate-in' style={{ textAlign: 'center' }}>
            <img
              src={`${import.meta.env.BASE_URL}avatar.png`}
              alt='@ZauJulio'
              className='links-avatar'
            />
            <h1 className='links-name'>@ZauJulio</h1>
            <p className='links-bio'>{t('links.bio')}</p>
          </div>

          {/* Links */}
          <div className='links-list'>
            {links.map((link, i) => (
              <a
                key={link.id}
                href={link.url}
                target='_blank'
                rel='noopener noreferrer'
                className={`link-card animate-in ${link.featured ? 'featured' : ''}`}
                style={{ animationDelay: `${(i + 1) * 80}ms` }}
                data-umami-event={`link-click-${link.id}`}
              >
                <div className='link-card-icon'>{link.icon}</div>
                <span className='link-card-title'>{link.title}</span>
                <ExternalLink className='link-card-arrow size-4' />
              </a>
            ))}
          </div>

          {/* Social Icons */}
          <div className='socials-row animate-in' style={{ animationDelay: `${(links.length + 1) * 80}ms` }}>
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target='_blank'
                rel='noopener noreferrer'
                className='social-btn'
                aria-label={s.label}
                title={s.label}
                data-umami-event={`social-click-${s.label.toLowerCase()}`}
              >
                {s.icon}
              </a>
            ))}
          </div>

          {/* Footer */}
          <div className='links-footer animate-in' style={{ animationDelay: `${(links.length + 2) * 80}ms` }}>
            <a href={`${import.meta.env.BASE_URL}`}>zaujulio.vercel.app</a>
          </div>
        </div>
      </div>
    </>
  );
}
