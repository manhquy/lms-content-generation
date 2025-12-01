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
import Link from 'next/link';

export default function TopHeader() {
  return (
    <header className='bg-background mx-6 flex h-14 items-center justify-between border-b'>
      {/* Left side - Logo */}
      <Link href='/' className='flex items-center gap-2'>
        <Image src='/SimplifyXLogo.svg' alt='Logo' width={98} height={23} />
      </Link>

      {/* Right side - Action Icons */}
      <div className='flex items-center gap-3'>
        <Button variant='ghost' size='icon' className='h-9 w-9'>
          <Bell size={24} className='!h-5 !w-5' />
        </Button>
        <Button variant='ghost' size='icon' className='h-9 w-9'>
          <Mail size={24} className='!h-5 !w-5' />
        </Button>
        <Button variant='ghost' size='icon' className='h-9 w-9'>
          <UserCircle size={24} className='!h-5 !w-5' />
        </Button>
        <Button variant='ghost' size='icon' className='h-9 w-9'>
          <Cloud size={24} className='!h-5 !w-5' />
        </Button>
        <Button variant='ghost' size='icon' className='h-9 w-9'>
          <Search size={24} className='!h-5 !w-5' />
        </Button>
        <Button variant='ghost' size='icon' className='h-9 w-9'>
          <HelpCircle size={24} className='!h-5 !w-5' />
        </Button>
      </div>
    </header>
  );
}
