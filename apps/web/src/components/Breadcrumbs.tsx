import { ChevronRightIcon, HomeIcon } from 'lucide-react';
import { Link } from 'react-router';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label='Breadcrumb' className='py-4'>
      <ol className='flex items-center gap-2 text-sm'>
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className='flex items-center gap-2'>
            {index > 0 && <ChevronRightIcon className='size-4 text-gray-600' />}
            {item.href ? (
              <Link
                to={item.href}
                className='text-gray-400 hover:text-brand-300 transition-colors flex items-center gap-1'
              >
                {index === 0 && <HomeIcon className='size-4' />}
                {item.label}
              </Link>
            ) : (
              <span className='text-brand-300 font-medium'>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
