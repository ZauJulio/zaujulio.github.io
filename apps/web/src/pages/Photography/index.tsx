import { ArrowLeftIcon, CameraIcon, ImageIcon } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router';

import { AlbumCard } from './components/AlbumCard';
import { PhotoGrid } from './components/PhotoGrid';
import { useAlbums } from './data';

export const meta = () => [{ title: 'Zaú Júlio - Photography' }];

export default function PhotographyPage() {
  const { t } = useTranslation();
  const params = useParams();
  const [selectedAlbumId, setSelectedAlbumId] = useState<string | null>(params.albumId || null);
  const albums = useAlbums();

  const sortedAlbums = useMemo(() => {
    return [...albums].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [albums]);

  const selectedAlbum = useMemo(() => {
    if (!selectedAlbumId) return null;
    return albums.find((a) => a.id === selectedAlbumId) || null;
  }, [albums, selectedAlbumId]);

  useEffect(() => {
    if (params.albumId) {
      setSelectedAlbumId(params.albumId);
    }
  }, [params.albumId]);

  if (selectedAlbum) {
    return (
      <div className='min-h-screen bg-black text-white font-sans'>
        <header className='sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-gray-800/50'>
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
                <span>
                  {new Date(selectedAlbum.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                </span>
              )}
              {selectedAlbum.location && <span>• {selectedAlbum.location}</span>}
              <span>
                • {selectedAlbum.photos.length} {t('photography.photos')}
              </span>
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
      <header className='sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-gray-800/50'>
        <div className='max-w-7xl mx-auto px-6 py-4 flex items-center flex-start'>
          <Link
            to='/'
            className='inline-flex items-center gap-2 text-gray-400 hover:text-brand-300 transition-colors no-underline text-sm'
          >
            <ArrowLeftIcon className='size-4' />
            {t('common.backToPortfolio')}
          </Link>
        </div>
      </header>

      <section className='py-20 px-6'>
        <div className='max-w-4xl mx-auto text-center'>
          <div className='inline-flex p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/5 mb-6'>
            <CameraIcon className='size-10 text-amber-400' />
          </div>

          <h1 className='text-4xl md:text-5xl font-bold mb-4'>{t('photography.title')}</h1>
          <p className='text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed'>{t('photography.description')}</p>
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
              <p className='text-gray-600 text-sm max-w-md mx-auto'>{/* {t('photography.addAlbumsHint')} */}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
