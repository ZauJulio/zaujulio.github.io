import { TagIcon } from 'lucide-react';

export function EmptyArticlesState({ activeTag }: { activeTag: string | null }) {
  return (
    <div className='text-center py-20'>
      <div className='inline-flex p-4 rounded-2xl bg-gray-900/50 mb-4'>
        <TagIcon className='size-8 text-gray-600' />
      </div>

      <p className='text-gray-500 text-lg mb-2'>
        {activeTag ? `No articles tagged "${activeTag}"` : 'No articles yet'}
      </p>

      <p className='text-gray-600 text-sm max-w-md mx-auto'>
        Add <code className='text-gray-400 bg-gray-800 px-1.5 py-0.5 rounded text-xs'>.md</code> files to{' '}
        <code className='text-gray-400 bg-gray-800 px-1.5 py-0.5 rounded text-xs'>content/articles/</code> to see them
        here.
      </p>
    </div>
  );
}
