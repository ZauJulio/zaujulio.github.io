import { SendIcon, MailIcon, LinkedinIcon, GithubIcon } from 'lucide-react';

export function HireMeSection() {
  return (
    <section id='hire' className='bg-gray-950 py-24 scroll-mt-8'>
      <div className='container mx-auto px-6 max-w-3xl text-center'>
        <div className='flex justify-center mb-6'>
          <div className='p-3 bg-brand-900/40 rounded-xl'>
            <SendIcon className='size-8 text-brand-300' />
          </div>
        </div>

        <h2 className='text-4xl font-bold text-white mb-4'>
          Let's Work Together
        </h2>

        <p className='text-gray-400 text-lg leading-relaxed mb-10 max-w-xl mx-auto'>
          I'm open to new opportunities, freelance projects, and technical collaborations.
          If you're looking for a full-stack developer with experience in system design,
          cloud architecture, and AI — let's connect.
        </p>

        {/* CTA Buttons */}
        <div className='flex flex-col sm:flex-row items-center justify-center gap-4 mb-12'>
          <a
            href='mailto:zaujulio.dev@gmail.com'
            className='inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-300 text-black font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-brand-500/25 no-underline'
          >
            <MailIcon className='size-5' />
            Send me an Email
          </a>

          <a
            href='https://linkedin.com/in/zaujulio'
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white font-semibold px-8 py-3 rounded-lg border border-gray-700 hover:border-brand-500/50 transition-all duration-300 no-underline'
          >
            <LinkedinIcon className='size-5' />
            Connect on LinkedIn
          </a>
        </div>

        {/* Quick info */}
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
          <div className='bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700/60 p-5'>
            <p className='text-brand-300 font-semibold text-sm mb-1'>Location</p>
            <p className='text-gray-400 text-sm'>Brazil (UTC-3)</p>
            <p className='text-gray-500 text-xs mt-1'>Available for remote work</p>
          </div>

          <div className='bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700/60 p-5'>
            <p className='text-brand-300 font-semibold text-sm mb-1'>Experience</p>
            <p className='text-gray-400 text-sm'>5+ years</p>
            <p className='text-gray-500 text-xs mt-1'>Full Stack & Tech Lead</p>
          </div>

          <div className='bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700/60 p-5'>
            <p className='text-brand-300 font-semibold text-sm mb-1'>Open Source</p>
            <a
              href='https://github.com/zaujulio'
              target='_blank'
              rel='noopener noreferrer'
              className='text-gray-400 text-sm hover:text-brand-300 transition-colors no-underline inline-flex items-center gap-1.5'
            >
              <GithubIcon className='size-3.5' />
              github.com/zaujulio
            </a>
            <p className='text-gray-500 text-xs mt-1'>115+ repositories</p>
          </div>
        </div>
      </div>
    </section>
  );
}
