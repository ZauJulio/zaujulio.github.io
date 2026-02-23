import { useTranslation } from 'react-i18next';
import { HomeIcon } from 'lucide-react';
import { Link } from 'react-router';

export default function NotFound() {
  const { t } = useTranslation();
  
  return (
    <div className='min-h-screen bg-black flex items-center justify-center px-4'>
      <div className='text-center max-w-md'>
        <h1 className='text-8xl font-bold text-brand-500 mb-4'>{t('notFound.title')}</h1>
        <p className='text-xl text-gray-300 mb-2'>{t('notFound.message')}</p>
        <Link
          to='/'
          className='inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-400 text-black font-semibold px-6 py-3 rounded-lg transition-colors no-underline'
        >
          <HomeIcon className='size-4' />
          {t('notFound.backHome')}
        </Link>
      </div>
    </div>
  );
}
