import { HomeIcon } from 'lucide-react';
import { Link } from 'react-router';

export default function NotFound() {
  return (
    <div className='min-h-screen bg-black flex items-center justify-center px-4'>
      <div className='text-center max-w-md'>
        <h1 className='text-8xl font-bold text-brand-500 mb-4'>404</h1>
        <p className='text-xl text-gray-300 mb-2'>Page not found</p>
        <p className='text-gray-500 mb-8'>The page you're looking for doesn't exist or has been moved.</p>
        <Link
          to='/'
          className='inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-400 text-black font-semibold px-6 py-3 rounded-lg transition-colors no-underline'
        >
          <HomeIcon className='size-4' />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
