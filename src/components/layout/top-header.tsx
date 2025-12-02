'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useGetMe, useLogout } from '@/features/auth/hooks/useAuth';
import {
  Bell,
  Mail,
  UserCircle,
  Cloud,
  Search,
  HelpCircle,
  LogOut,
  User,
  Settings
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function TopHeader() {
  const { data: user, isLoading } = useGetMe();
  const logout = useLogout();

  // Get user initials for avatar
  const getUserInitials = (fullName: string) => {
    const names = fullName.split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return fullName.substring(0, 2).toUpperCase();
  };

  return (
    <header className='bg-background mx-6 flex h-14 items-center justify-between border-b'>
      {/* Left side - Logo */}
      <Link href='/' className='flex items-center gap-2'>
        <Image src='/SimplifyXLogo.svg' alt='Logo' width={98} height={23} />
      </Link>

      {/* Right side - Action Icons */}
      <div className='flex items-center gap-3'>
        <Button variant='ghost' size='icon' className='h-9 w-9'>
          <Bell size={24} className='h-5! w-5!' />
        </Button>
        <Button variant='ghost' size='icon' className='h-9 w-9'>
          <Mail size={24} className='h-5! w-5!' />
        </Button>
        <Button variant='ghost' size='icon' className='h-9 w-9'>
          <Cloud size={24} className='h-5! w-5!' />
        </Button>
        <Button variant='ghost' size='icon' className='h-9 w-9'>
          <Search size={24} className='h-5! w-5!' />
        </Button>
        <Button variant='ghost' size='icon' className='h-9 w-9'>
          <HelpCircle size={24} className='h-5! w-5!' />
        </Button>

        {/* User Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='ghost'
              className='relative h-9 w-9 rounded-full p-0'
            >
              <Avatar className='h-9 w-9'>
                <AvatarImage src='' alt={user?.full_name || 'User'} />
                <AvatarFallback>
                  {user ? getUserInitials(user.full_name) : 'U'}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-56' align='end' forceMount>
            <DropdownMenuLabel className='font-normal'>
              <div className='flex flex-col space-y-1'>
                <p className='text-sm leading-none font-medium'>
                  {user?.full_name || 'Loading...'}
                </p>
                <p className='text-muted-foreground text-xs leading-none'>
                  {user?.email || ''}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className='cursor-pointer text-red-600 focus:text-red-600'
              onClick={logout}
            >
              <LogOut className='mr-2 h-4 w-4' />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
