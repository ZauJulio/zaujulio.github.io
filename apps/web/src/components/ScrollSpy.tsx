import { useEffect, useState } from 'react';

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
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const triggerOffset = 150; // Distance from top of viewport to trigger section change

      // Check if we're at the top (Hero section)
      if (window.scrollY < 100) {
        setActiveSection('');
        return;
      }

      // Check if we're near the bottom of the page
      const isNearBottom = window.scrollY + windowHeight >= documentHeight - 100;
      if (isNearBottom && sections.length > 0) {
        setActiveSection(sections[sections.length - 1].id);
        return;
      }

      // Find the active section - check which section's top is closest to the trigger offset
      let currentSection = '';
      let minDistance = Number.POSITIVE_INFINITY;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const distance = Math.abs(rect.top - triggerOffset);

          // If section top is at or above trigger offset and closer than current
          if (rect.top <= triggerOffset && distance < minDistance) {
            minDistance = distance;
            currentSection = section.id;
          }
        }
      }

      // If no section found above trigger, use the first visible one
      if (!currentSection) {
        for (const section of sections) {
          const element = document.getElementById(section.id);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top > triggerOffset && rect.top < windowHeight / 2) {
              currentSection = section.id;
              break;
            }
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
                activeSection === section.id ? 'bg-brand-500 scale-125' : 'bg-gray-600 group-hover:bg-gray-400'
              }`}
            />
            <span
              className={`text-xs transition-all duration-300 whitespace-nowrap ${
                activeSection === section.id
                  ? 'text-brand-400 opacity-100 translate-x-0'
                  : 'text-gray-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
              }`}
              style={{
                WebkitTextStroke: '1px white',
                textShadow: '0 0 2px rgba(255,255,255,0.5)',
              }}
            >
              {section.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
}
