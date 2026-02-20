import { ArrowRightIcon, CameraIcon, CookingPotIcon, Music2Icon } from 'lucide-react';
import { Link } from 'react-router';

interface HobbyCard {
  title: string;
  description: string;
  icon: React.ElementType;
  to: string;
  gradient: string;
  iconColor: string;
}

const hobbies: HobbyCard[] = [
  {
    title: 'Photography',
    description:
      'Capturing moments and landscapes through the lens. From street photography to nature shots, exploring light, composition, and storytelling.',
    icon: CameraIcon,
    to: '/photography',
    gradient: 'from-amber-500/10 to-orange-500/5',
    iconColor: 'text-amber-400',
  },
  {
    title: 'Cooking',
    description:
      'Experimenting with flavors, techniques, and cuisines from around the world. Turning simple ingredients into memorable meals.',
    icon: CookingPotIcon,
    to: '/cooking',
    gradient: 'from-red-500/10 to-rose-500/5',
    iconColor: 'text-red-400',
  },
  {
    title: 'Music',
    description:
      'Listening, discovering, and curating playlists across genres. From ambient and electronic to rock and Brazilian MPB.',
    icon: Music2Icon,
    to: '/music',
    gradient: 'from-violet-500/10 to-purple-500/5',
    iconColor: 'text-violet-400',
  },
];

function HobbyCardComponent({ hobby }: { hobby: HobbyCard }) {
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
        {hobby.title}
      </h3>

      <p className='text-sm text-gray-400 leading-relaxed mb-4'>{hobby.description}</p>

      <span className='inline-flex items-center gap-1.5 text-sm text-brand-400 group-hover:text-brand-300 transition-colors'>
        Explore
        <ArrowRightIcon className='size-4 transition-transform group-hover:translate-x-1' />
      </span>
    </Link>
  );
}

export function HobbiesSection() {
  return (
    <section id='hobbies' className='py-20 px-4 bg-gray-900'>
      <div className='max-w-6xl mx-auto'>
        <h2 className='text-3xl md:text-4xl font-bold text-center mb-4 text-white'>Hobbies</h2>
        <div className='text-center mb-12 max-w-3xl mx-auto space-y-4'>
          <p className='text-gray-300 text-lg leading-relaxed'>
            Beyond code — the things that inspire creativity and keep the balance.
          </p>
          <p className='text-gray-400 leading-relaxed'>
            Hobbies aren't just pastimes; they're essential for mental health, creativity, and preventing burnout. When
            we step away from the screen and engage in different activities, we give our brains the space to process,
            innovate, and recharge. Photography teaches me to see beauty in details, cooking connects me with culture
            and mindfulness, and music provides the rhythm that fuels my focus.
          </p>
          <p className='text-gray-500 text-sm italic'>
            "To be creative, you must give yourself permission to explore."
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {hobbies.map((hobby) => (
            <HobbyCardComponent key={hobby.title} hobby={hobby} />
          ))}
        </div>
      </div>
    </section>
  );
}
