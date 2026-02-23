import { useTranslation } from 'react-i18next';
import { ArrowRightIcon, CameraIcon, CookingPotIcon, Music2Icon } from 'lucide-react';
import { Link } from 'react-router';

interface HobbyCard {
  key: string;
  titleKey: string;
  descriptionKey: string;
  icon: React.ElementType;
  to: string;
  gradient: string;
  iconColor: string;
}

const hobbies: HobbyCard[] = [
  {
    key: 'photography',
    titleKey: 'hobbies.photography.title',
    descriptionKey: 'hobbies.photography.description',
    icon: CameraIcon,
    to: '/photography',
    gradient: 'from-amber-500/10 to-orange-500/5',
    iconColor: 'text-amber-400',
  },
  {
    key: 'cooking',
    titleKey: 'hobbies.cooking.title',
    descriptionKey: 'hobbies.cooking.description',
    icon: CookingPotIcon,
    to: '/cooking',
    gradient: 'from-red-500/10 to-rose-500/5',
    iconColor: 'text-red-400',
  },
  {
    key: 'music',
    titleKey: 'hobbies.music.title',
    descriptionKey: 'hobbies.music.description',
    icon: Music2Icon,
    to: '/music',
    gradient: 'from-violet-500/10 to-purple-500/5',
    iconColor: 'text-violet-400',
  },
];

function HobbyCardComponent({ hobby }: { hobby: HobbyCard }) {
  const { t } = useTranslation();
  const Icon = hobby.icon;

  return (
    <Link
      to={hobby.to}
      className='group block rounded-xl border border-gray-800 bg-gray-900/50 p-6 transition-all duration-300 hover:border-brand-500/50 hover:bg-gray-800/50 hover:shadow-lg hover:shadow-brand-500/5 no-underline'
    >
      <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${hobby.gradient} mb-4`}>
        <Icon className={`size-6 ${hobby.iconColor}`} />
      </div>

      <h3 className='text-lg font-semibold text-white mb-2 group-hover:text-brand-300 transition-colors'>
        {t(hobby.titleKey)}
      </h3>

      <p className='text-sm text-gray-400 leading-relaxed mb-4'>{t(hobby.descriptionKey)}</p>

      <span className='inline-flex items-center gap-1.5 text-sm text-brand-400 group-hover:text-brand-300 transition-colors'>
        {t('articles.readMore')}
        <ArrowRightIcon className='size-4 transition-transform group-hover:translate-x-1' />
      </span>
    </Link>
  );
}

export function HobbiesSection() {
  const { t } = useTranslation();

  return (
    <section id='hobbies' className='py-20 px-4 bg-gray-900'>
      <div className='max-w-6xl mx-auto'>
        <h2 className='text-3xl md:text-4xl font-bold text-center mb-4 text-white'>{t('hobbies.title')}</h2>
        <div className='text-center mb-12 max-w-3xl mx-auto space-y-4'>
          <p className='text-gray-300 text-lg leading-relaxed'>{t('hobbies.subtitle')}</p>
          <p className='text-gray-500 text-sm italic'>{t('hobbies.quote')}</p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {hobbies.map((hobby) => (
            <HobbyCardComponent key={hobby.key} hobby={hobby} />
          ))}
        </div>
      </div>
    </section>
  );
}
