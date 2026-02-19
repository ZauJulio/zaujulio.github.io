import {
  CodeIcon,
  FileTextIcon,
  GithubIcon,
  HeartIcon,
  LinkedinIcon,
  MailIcon,
  SendIcon,
  UserIcon,
} from 'lucide-react';
import { Link } from 'react-router';

import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui/components/avatar';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@repo/ui/components/navigation-menu';

function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export function NavigationBar() {
  return (
    <nav className='flex flex-col items-center gap-6 mb-8'>
      <Avatar className='size-24 ring-2 ring-brand-500/50 ring-offset-2 ring-offset-transparent transition-transform duration-300 hover:scale-110 cursor-pointer'>
        <AvatarImage src='/avatar.png' alt='@zaujulio' width={96} height={96} />
        <AvatarFallback className='bg-brand-900 text-brand-300 text-2xl'>ZJ</AvatarFallback>
      </Avatar>

      {/* Internal Navigation */}
      <NavigationMenu>
        <NavigationMenuList className='gap-1 flex-wrap justify-center'>
          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <button
                type='button'
                onClick={() => scrollToSection('about')}
                className='bg-transparent border-none cursor-pointer'
              >
                <UserIcon className='size-4 mr-2' />
                About
              </button>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <button
                type='button'
                onClick={() => scrollToSection('projects')}
                className='bg-transparent border-none cursor-pointer'
              >
                <CodeIcon className='size-4 mr-2' />
                Projects/Skills
              </button>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <button
                type='button'
                onClick={() => scrollToSection('hobbies')}
                className='bg-transparent border-none cursor-pointer'
              >
                <HeartIcon className='size-4 mr-2' />
                Hobbies
              </button>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <button
                type='button'
                onClick={() => scrollToSection('hire')}
                className='bg-transparent border-none cursor-pointer'
              >
                <SendIcon className='size-4 mr-2' />
                Hire Me
              </button>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link to='/articles'>
                <FileTextIcon className='size-4 mr-2' />
                Articles
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* External Links */}
      <div className='flex items-center gap-2'>
        <a
          href='https://github.com/zaujulio'
          target='_blank'
          rel='noopener noreferrer'
          className='inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-md transition-colors'
        >
          <GithubIcon className='size-4' />
          GitHub
        </a>
        <a
          href='https://linkedin.com/in/zaujulio'
          target='_blank'
          rel='noopener noreferrer'
          className='inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-md transition-colors'
        >
          <LinkedinIcon className='size-4' />
          LinkedIn
        </a>
        <a
          href='mailto:zaujulio.dev@gmail.com'
          className='inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-md transition-colors'
        >
          <MailIcon className='size-4' />
          Contact
        </a>
      </div>
    </nav>
  );
}
