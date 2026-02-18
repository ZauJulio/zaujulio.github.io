import { useEffect, useState } from 'react';
import { useGlitch } from 'react-powerglitch';

import { NavigationBar, AboutMeSection, ProjectsSection, HobbiesSection, HireMeSection, Footer, ScrollReveal, ScrollSpy } from './components';

export default function Home() {
  const [triggered, setTriggered] = useState(false);

  const glitch = useGlitch({
    playMode: 'always',
    createContainers: true,
    hideOverflow: true,
    timing: { duration: 450, iterations: 1 },
    glitchTimeSpan: { start: 0, end: 1 },
    shake: {
      velocity: 15,
      amplitudeX: 0.1,
      amplitudeY: 0,
    },
    slice: {
      count: 6,
      velocity: 15,
      minHeight: 0.02,
      maxHeight: 0.15,
      hueRotate: true,
    },
  });

  // Trigger when scrolled down a bit (e.g. 10px)
  useEffect(() => {
    const handleScroll = () => {
      if (!triggered && window.scrollY > 10) setTriggered(true);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [triggered]);

  const sections = [
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'hobbies', label: 'Hobbies' },
    { id: 'hire', label: 'Hire Me' },
  ];

  return (
    <div className='min-h-screen w-full bg-black text-white font-sans selection:bg-brand-500 selection:text-white'>
      <ScrollSpy sections={sections} />
      {/* Hero */}
      <section
        ref={triggered ? glitch.ref : null}
        className='relative h-screen w-full flex flex-col items-center justify-center overflow-hidden'
      >
        <div className='absolute inset-0 z-0'>
          <img
            src={`${import.meta.env.BASE_URL}glitch-effect-black-background.jpg`}
            alt='Glitch Background'
            className='w-full h-full object-cover opacity-50'
          />
          <div className='absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-black' />
        </div>

        <div className='relative z-10 flex flex-col items-center text-center px-4'>
          <NavigationBar />

          <h1 className='text-5xl md:text-7xl font-bold mb-4 tracking-tight text-white drop-shadow-lg'>
            Zaú Júlio
          </h1>

          <p className='text-xl md:text-2xl text-brand-300 font-light tracking-wide'>
            Full Stack Developer <span className='text-brand-500'>|</span> Tech Lead <span className='text-brand-500'>|</span> Systems Engineer
          </p>
        </div>

        <div className='absolute bottom-8 z-10 animate-bounce'>
          <div className='w-6 h-10 border-2 border-brand-500/50 rounded-full flex justify-center'>
            <div className='w-1.5 h-3 bg-brand-500/70 rounded-full mt-2 animate-pulse' />
          </div>
        </div>
      </section>

      {/* About Me (Experience + Education + Languages + Thesis + Skills) */}
      <ScrollReveal>
        <AboutMeSection />
      </ScrollReveal>

      {/* Projects */}
      <ScrollReveal delay={100}>
        <ProjectsSection />
      </ScrollReveal>

      {/* Hobbies */}
      <ScrollReveal delay={100}>
        <HobbiesSection />
      </ScrollReveal>

      {/* Hire Me */}
      <ScrollReveal delay={150}>
        <HireMeSection />
      </ScrollReveal>

      {/* Footer */}
      <ScrollReveal delay={100} distance={20}>
        <Footer />
      </ScrollReveal>
    </div>
  );
}
