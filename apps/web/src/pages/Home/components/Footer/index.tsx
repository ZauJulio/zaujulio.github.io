import { GithubIcon, LinkedinIcon, MailIcon, HeartIcon } from 'lucide-react';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className='bg-black border-t border-gray-800/60 py-10'>
      <div className='container mx-auto px-6 max-w-6xl'>
        <div className='flex flex-col md:flex-row items-center justify-between gap-6'>
          {/* Left: branding */}
          <div className='flex items-center gap-2 text-gray-400 text-sm'>
            <span>Built with</span>
            <HeartIcon className='size-3.5 text-brand-500 fill-brand-500' />
            <span>by</span>
            <a
              href='https://github.com/zaujulio'
              target='_blank'
              rel='noopener noreferrer'
              className='text-brand-300 hover:text-brand-500 transition-colors no-underline font-medium'
            >
              Zau Julio
            </a>
          </div>

          {/* Center: copyright */}
          <p className='text-gray-500 text-xs'>
            &copy; {year} Zau Julio. All rights reserved.
          </p>

          {/* Right: social links */}
          <div className='flex items-center gap-4'>
            <a
              href='https://github.com/zaujulio'
              target='_blank'
              rel='noopener noreferrer'
              className='text-gray-500 hover:text-brand-300 transition-colors'
              aria-label='GitHub'
            >
              <GithubIcon className='size-5' />
            </a>
            <a
              href='https://linkedin.com/in/zaujulio'
              target='_blank'
              rel='noopener noreferrer'
              className='text-gray-500 hover:text-brand-300 transition-colors'
              aria-label='LinkedIn'
            >
              <LinkedinIcon className='size-5' />
            </a>
            <a
              href='mailto:zaujulio.dev@gmail.com'
              className='text-gray-500 hover:text-brand-300 transition-colors'
              aria-label='Email'
            >
              <MailIcon className='size-5' />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
