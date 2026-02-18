import { GithubIcon, LinkedinIcon, MailIcon, CodeIcon, HeartIcon, SendIcon, UserIcon, FileTextIcon } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui/components/avatar';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@repo/ui/components/navigation-menu';

export function NavigationBar() {
  return (
    <nav className='flex flex-col items-center gap-6 mb-8'>
      <Avatar className='size-24 ring-2 ring-brand-500/50 ring-offset-2 ring-offset-transparent transition-transform duration-300 hover:scale-110 cursor-pointer'>
        <AvatarImage src='https://github.com/zaujulio.png' alt='@zaujulio' />
        <AvatarFallback className='bg-brand-900 text-brand-300 text-2xl'>ZJ</AvatarFallback>
      </Avatar>

      <NavigationMenu>
        <NavigationMenuList className='gap-1 flex-wrap justify-center'>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <a href='#about'>
                <UserIcon className='size-4 mr-2' />
                About
              </a>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <a href='#projects'>
                <CodeIcon className='size-4 mr-2' />
                Projects
              </a>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <a href='#hobbies'>
                <HeartIcon className='size-4 mr-2' />
                Hobbies
              </a>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <a href='#hire'>
                <SendIcon className='size-4 mr-2' />
                Hire Me
              </a>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <a href='/articles'>
                <FileTextIcon className='size-4 mr-2' />
                Articles
              </a>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <a href='https://github.com/zaujulio' target='_blank' rel='noopener noreferrer'>
                <GithubIcon className='size-4 mr-2' />
                GitHub
              </a>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <a href='https://linkedin.com/in/zaujulio' target='_blank' rel='noopener noreferrer'>
                <LinkedinIcon className='size-4 mr-2' />
                LinkedIn
              </a>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <a href='mailto:zaujulio.dev@gmail.com'>
                <MailIcon className='size-4 mr-2' />
                Contact
              </a>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}
