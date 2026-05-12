import type { ElementType } from 'react';

export function SubSectionHeader({ icon: Icon, title }: { icon: ElementType; title: string }) {
  return (
    <div className='flex items-center gap-3 mb-10'>
      <div className='p-2 bg-brand-900/40 rounded-lg'>
        <Icon className='size-5 text-brand-300' />
      </div>
      <h3 className='text-2xl font-bold text-white'>{title}</h3>
    </div>
  );
}
