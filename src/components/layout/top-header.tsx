'use client';

import { Button } from '@/components/ui/button';
import {
  Bell,
  Mail,
  UserCircle,
  Cloud,
  Search,
  HelpCircle
} from 'lucide-react';
import Image from 'next/image';

export default function TopHeader() {
  return (
    <header className='bg-background mx-6 flex h-14 items-center justify-between border-b'>
      {/* Left side - Logo */}
      <div className='flex items-center gap-2'>
        <Image src='/SimplifyXLogo.svg' alt='Logo' width={98} height={23} />
      </div>

      {/* Right side - Action Icons */}
      <div className='flex items-center gap-1'>
        <Button variant='ghost' size='icon' className='h-9 w-9'>
          <Bell className='h-[18px] w-[18px]' />
        </Button>
        <Button variant='ghost' size='icon' className='h-9 w-9'>
          <Mail className='h-[18px] w-[18px]' />
        </Button>
        <Button variant='ghost' size='icon' className='h-9 w-9'>
          <UserCircle className='h-[18px] w-[18px]' />
        </Button>
        <Button variant='ghost' size='icon' className='h-9 w-9'>
          <Cloud className='h-[18px] w-[18px]' />
        </Button>
        <Button variant='ghost' size='icon' className='h-9 w-9'>
          <Search className='h-[18px] w-[18px]' />
        </Button>
        <Button variant='ghost' size='icon' className='h-9 w-9'>
          <HelpCircle className='h-[18px] w-[18px]' />
        </Button>
      </div>
    </header>
  );
}
