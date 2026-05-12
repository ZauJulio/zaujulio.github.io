import { ImageIcon } from 'lucide-react';
import { useState } from 'react';

import type { Photo } from 'content/photography/photography.json.d.ts';

export function PhotoGrid({ photos }: { photos: Photo[] }) {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  if (photos.length === 0) {
    return (
      <div className='text-center py-20'>
        <div className='inline-flex p-4 rounded-2xl bg-gray-900/50 mb-4'>
          <ImageIcon className='size-8 text-gray-600' />
        </div>
        <p className='text-gray-500 text-lg mb-2'>No photos in this album</p>
      </div>
    );
  }

  return (
    <>
      <div className='columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4'>
        {photos.map((photo) => (
          <div
            key={photo.id}
            role='button'
            tabIndex={0}
            className='break-inside-avoid rounded-xl overflow-hidden border border-gray-800 group relative cursor-pointer'
            onClick={() => setSelectedPhoto(photo)}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelectedPhoto(photo)}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              className='w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105'
            />
            <div className='absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
              {photo.title && <p className='text-white text-sm font-medium'>{photo.title}</p>}
              {photo.location && <p className='text-gray-300 text-sm'>{photo.location}</p>}
              <div className='flex items-center gap-2 mt-1'>
                {photo.date && <span className='text-gray-300 text-xs'>{photo.date}</span>}
                {photo.timeOfDay && (
                  <span className='text-xs px-1.5 py-0.5 rounded bg-white/10 text-gray-300'>{photo.timeOfDay}</span>
                )}
              </div>
              {photo.tags && photo.tags.length > 0 && (
                <div className='flex flex-wrap gap-1 mt-2'>
                  {photo.tags.map((tag) => (
                    <span key={tag} className='text-xs px-1.5 py-0.5 rounded bg-brand-500/20 text-brand-300'>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedPhoto && (
        <div
          className='fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4'
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            type='button'
            className='absolute top-4 right-4 text-white hover:text-gray-300'
            onClick={() => setSelectedPhoto(null)}
            aria-label='Close'
          >
            <svg className='size-8' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
            </svg>
          </button>
          <img
            src={selectedPhoto.src}
            alt={selectedPhoto.alt}
            className='max-w-full max-h-full object-contain rounded-lg'
            onClick={(e) => e.stopPropagation()}
          />
          <div className='absolute bottom-4 left-4 right-4 text-center'>
            {selectedPhoto.title && <p className='text-white font-medium text-lg'>{selectedPhoto.title}</p>}
            {selectedPhoto.description && <p className='text-gray-400 text-sm mt-1'>{selectedPhoto.description}</p>}
            {selectedPhoto.location && <p className='text-gray-500 text-sm mt-1'>{selectedPhoto.location}</p>}
          </div>
        </div>
      )}
    </>
  );
}
