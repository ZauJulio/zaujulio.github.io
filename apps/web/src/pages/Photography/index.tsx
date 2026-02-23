import { useTranslation } from 'react-i18next';
import { ArrowLeftIcon, CameraIcon, ImageIcon } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router';

import { albums } from './data';
import type { Album, Photo } from 'content/photography/photography.json.d.ts';

export const meta = () => [{ title: 'Zaú Júlio - Photography' }];

function AlbumCard({ album }: { album: Album }) {
  const { t } = useTranslation();
  const coverPhoto = album.photos[0];
  const photoCount = album.photos.length;

  return (
    <Link
      to={`/photography/${album.id}`}
      className='group block rounded-xl overflow-hidden border border-gray-800 hover:border-brand-500 transition-all duration-300 hover:shadow-lg hover:shadow-brand-900/20'
    >
      <div className='aspect-video bg-gray-900 relative overflow-hidden'>
        {coverPhoto ? (
          <img
            src={coverPhoto.src}
            alt={coverPhoto.alt}
            className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
          />
        ) : (
          <div className='w-full h-full flex items-center justify-center'>
            <ImageIcon className='size-12 text-gray-700' />
          </div>
        )}
        <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
      </div>
      <div className='p-4'>
        <h3 className='text-lg font-semibold text-white group-hover:text-brand-300 transition-colors'>
          {album.name}
        </h3>
        <p className='text-gray-400 text-sm mt-1 line-clamp-2'>{album.description}</p>
        <div className='flex items-center gap-3 mt-3 text-xs text-gray-500'>
          {album.date && <span>{new Date(album.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</span>}
          {album.location && <span>• {album.location}</span>}
          <span>• {photoCount} {t('photography.photos')}</span>
        </div>
      </div>
    </Link>
  );
}

function PhotoGrid({ photos }: { photos: Photo[] }) {
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

      {/* Lightbox */}
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

export default function PhotographyPage() {
  const { t } = useTranslation();
  const params = useParams();
  const [selectedAlbumId, setSelectedAlbumId] = useState<string | null>(params.albumId || null);

  const sortedAlbums = useMemo(() => {
    return [...albums].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, []);

  const selectedAlbum = useMemo(() => {
    if (!selectedAlbumId) return null;
    return albums.find((a) => a.id === selectedAlbumId) || null;
  }, [selectedAlbumId]);

  useEffect(() => {
    if (params.albumId) {
      setSelectedAlbumId(params.albumId);
    }
  }, [params.albumId]);

  if (selectedAlbum) {
    return (
      <div className='min-h-screen bg-black text-white font-sans'>
        <header className='sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800/50'>
          <div className='max-w-7xl mx-auto px-6 py-4 flex items-center justify-between'>
            <button
              type='button'
              onClick={() => setSelectedAlbumId(null)}
              className='inline-flex items-center gap-2 text-gray-400 hover:text-brand-300 transition-colors no-underline text-sm cursor-pointer'
            >
              <ArrowLeftIcon className='size-4' />
              {t('common.backToAlbums')}
            </button>
            <div className='flex items-center gap-2'>
              <CameraIcon className='size-5 text-amber-400' />
              <span className='font-semibold text-white'>{selectedAlbum.name}</span>
            </div>
          </div>
        </header>

        <section className='py-12 px-6'>
          <div className='max-w-4xl mx-auto text-center'>
            <h1 className='text-3xl md:text-4xl font-bold mb-4'>{selectedAlbum.name}</h1>
            <p className='text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed'>{selectedAlbum.description}</p>
            <div className='flex items-center justify-center gap-4 mt-4 text-sm text-gray-500'>
              {selectedAlbum.date && (
                <span>{new Date(selectedAlbum.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</span>
              )}
              {selectedAlbum.location && <span>• {selectedAlbum.location}</span>}
              <span>• {selectedAlbum.photos.length} {t('photography.photos')}</span>
            </div>
          </div>
        </section>

        <section className='pb-20 px-6'>
          <div className='max-w-7xl mx-auto'>
            <PhotoGrid photos={selectedAlbum.photos} />
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-black text-white font-sans'>
      <header className='sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800/50'>
        <div className='max-w-7xl mx-auto px-6 py-4 flex items-center justify-between'>
          <Link
            to='/'
            className='inline-flex items-center gap-2 text-gray-400 hover:text-brand-300 transition-colors no-underline text-sm'
          >
            <ArrowLeftIcon className='size-4' />
            {t('common.backToPortfolio')}
          </Link>

          <div className='flex items-center gap-2'>
            <CameraIcon className='size-5 text-amber-400' />
            <span className='font-semibold text-white'>{t('photography.title')}</span>
          </div>
        </div>
      </header>

      <section className='py-20 px-6'>
        <div className='max-w-4xl mx-auto text-center'>
          <div className='inline-flex p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/5 mb-6'>
            <CameraIcon className='size-10 text-amber-400' />
          </div>

          <h1 className='text-4xl md:text-5xl font-bold mb-4'>{t('photography.title')}</h1>
          <p className='text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed'>
            {t('photography.description')}
          </p>
        </div>
      </section>

      <section className='pb-20 px-6'>
        <div className='max-w-7xl mx-auto'>
          {sortedAlbums.length > 0 ? (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {sortedAlbums.map((album) => (
                <AlbumCard key={album.id} album={album} />
              ))}
            </div>
          ) : (
            <div className='text-center py-20'>
              <div className='inline-flex p-4 rounded-2xl bg-gray-900/50 mb-4'>
                <ImageIcon className='size-8 text-gray-600' />
              </div>
              <p className='text-gray-500 text-lg mb-2'>{t('photography.noAlbums')}</p>
              <p className='text-gray-600 text-sm max-w-md mx-auto'>
                {t('photography.addAlbumsHint')}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
