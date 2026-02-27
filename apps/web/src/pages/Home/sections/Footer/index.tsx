import { CopyIcon, DownloadIcon, HeartIcon, MailIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import profileDataJson from '@content/profile/profile.json';

import { GithubIcon, LinkedinIcon } from '../../../../../../../packages/ui/components/Icons';
import { useToast } from '../../../../components';

const profileData = {
  ...profileDataJson,
  $schema: 'https://zaujulio.github.io/schemas/profile.json',
};

function exportProfileJSON() {
  const dataStr = JSON.stringify(profileData, null, 2);
  return dataStr;
}

export function Footer() {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const year = new Date().getFullYear();

  const handleExport = async () => {
    try {
      const data = exportProfileJSON();
      await navigator.clipboard.writeText(data);
      showToast('Profile copied to clipboard!', 'success');
    } catch {
      showToast('Failed to copy profile', 'error');
    }
  };

  return (
    <footer className='bg-black border-t border-gray-800/60 py-10'>
      <div className='container mx-auto px-6 max-w-6xl'>
        <div className='flex flex-col md:flex-row items-center justify-between gap-6'>
          {/* Left: branding */}
          <div className='flex items-center gap-2 text-gray-400 text-sm'>
            <span>{t('footer.builtWith')}</span>
            <HeartIcon className='size-3.5 text-brand-500 fill-brand-500' />
            <span>{t('footer.and')}</span>
            <a
              href='https://github.com/zaujulio'
              target='_blank'
              rel='noopener noreferrer'
              className='text-brand-300 hover:text-brand-500 transition-colors no-underline font-medium'
            >
              Zau Julio
            </a>
          </div>

          {/* Center: export buttons */}
          <div className='flex items-center gap-3'>
            <a
              href='/resume.pdf'
              download
              className='inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-brand-300 border border-gray-700 hover:border-brand-500/50 rounded-lg transition-colors'
            >
              <DownloadIcon className='size-4' />
              {t('nav.resume')}
            </a>
            <button
              type='button'
              onClick={handleExport}
              className='inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-brand-300 border border-gray-700 hover:border-brand-500/50 rounded-lg transition-colors'
            >
              <CopyIcon className='size-4' />
              Export Profile (JSON)
            </button>
          </div>

          {/* Right: copyright */}
          <p className='text-gray-500 text-xs'>
            &copy; {year} Zau Julio. {t('footer.copyright')}
          </p>
        </div>

        {/* Social links row */}
        <div className='flex items-center justify-center gap-6 mt-6 pt-6 border-t border-gray-800/60'>
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
            href='/resume.pdf'
            download
            className='text-gray-500 hover:text-brand-300 transition-colors'
            aria-label={t('nav.resume')}
            title={t('nav.resume')}
          >
            <DownloadIcon className='size-5' />
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
    </footer>
  );
}
