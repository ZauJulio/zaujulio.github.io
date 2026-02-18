import { useState, useEffect } from 'react';

interface Section {
  id: string;
  label: string;
}

interface ScrollSpyProps {
  sections: Section[];
  offset?: number;
}

export function ScrollSpy({ sections, offset = 100 }: ScrollSpyProps) {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || '');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections, offset]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (sections.length === 0) return null;

  return (
    <nav className='fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden lg:block'>
      <div className='flex flex-col gap-3'>
        {sections.map((section) => (
          <button
            key={section.id}
            type='button'
            onClick={() => scrollToSection(section.id)}
            className='group flex items-center gap-3 text-left'
            title={section.label}
          >
            <span
              className={`block w-2 h-2 rounded-full transition-all duration-300 ${
                activeSection === section.id
                  ? 'bg-brand-500 scale-125'
                  : 'bg-gray-600 group-hover:bg-gray-400'
              }`}
            />
            <span
              className={`text-xs transition-all duration-300 whitespace-nowrap ${
                activeSection === section.id
                  ? 'text-brand-400 opacity-100 translate-x-0'
                  : 'text-gray-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
              }`}
            >
              {section.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
}
