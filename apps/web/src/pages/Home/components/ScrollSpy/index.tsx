import { useState, useEffect } from 'react';

interface Section {
  id: string;
  label: string;
}

interface ScrollSpyProps {
  sections: Section[];
}

export function ScrollSpy({ sections }: ScrollSpyProps) {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      // Check if we're at the top (Hero section)
      if (window.scrollY < 100) {
        setActiveSection('');
        return;
      }

      // Find the active section by checking which one is in the viewport
      let currentSection = '';
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if the section is in the upper third of the viewport
          if (rect.top <= window.innerHeight / 3 && rect.bottom >= 0) {
            currentSection = section.id;
            break;
          }
        }
      }
      
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Use scrollIntoView with block: 'start' to scroll to the top of the element
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
