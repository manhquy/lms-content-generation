'use client';

import { Button } from '@/components/ui/button';
import {
  Bell,
  MessageSquare,
  User,
  Settings,
  Search,
  HelpCircle
} from 'lucide-react';

export default function TopHeader() {
  return (
    <header className='bg-background flex h-12 items-center justify-between border-b px-4'>
      {/* Left side - Logo */}
      <div className='flex items-center'>
        <div className='flex items-center space-x-2'>
          <div className='bg-primary flex h-6 w-6 items-center justify-center rounded'>
            <span className='text-primary-foreground text-xs font-bold'>S</span>
          </div>
          <span className='text-sm font-semibold'>Simplify</span>
        </div>
      </div>

      {/* Right side - Actions */}
      <div className='flex items-center space-x-3'>
        <Button variant='ghost' size='sm' className='h-8 w-8 p-0'>
          <Bell className='h-4 w-4' />
        </Button>
        <Button variant='ghost' size='sm' className='h-8 w-8 p-0'>
          <MessageSquare className='h-4 w-4' />
        </Button>
        <Button variant='ghost' size='sm' className='h-8 w-8 p-0'>
          <User className='h-4 w-4' />
        </Button>
        <Button variant='ghost' size='sm' className='h-8 w-8 p-0'>
          <Settings className='h-4 w-4' />
        </Button>
        <Button variant='ghost' size='sm' className='h-8 w-8 p-0'>
          <Search className='h-4 w-4' />
        </Button>
        <Button variant='ghost' size='sm' className='h-8 w-8 p-0'>
          <HelpCircle className='h-4 w-4' />
        </Button>

        {/* Give Feedback Button */}
        <Button variant='outline' size='sm' className='h-8 text-xs'>
          <span className='mr-1'>👍</span>
          Give Feedback
        </Button>
      </div>
    </header>
  );
}
