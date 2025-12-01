'use client';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail
} from '@/components/ui/sidebar';
import { UserAvatarProfile } from '@/components/user-avatar-profile';
import { navItems } from '@/constants/data';
import { useMediaQuery } from '@/hooks/use-media-query';
import {
  IconBell,
  IconChevronRight,
  IconChevronsDown,
  IconCreditCard,
  IconLogout,
  IconPhotoUp,
  IconUserCircle,
  IconSearch,
  IconSparkles,
  IconPlus
} from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import * as React from 'react';
import { Icons } from '../icons';
import { OrgSwitcher } from '../org-switcher';
export const company = {
  name: 'Prior Auth',
  logo: IconPhotoUp,
  plan: 'Enterprise'
};

const tenants = [
  { id: '1', name: 'Prior Auth' },
  { id: '2', name: 'Beta Corp' },
  { id: '3', name: 'Gamma Ltd' }
];

export default function AppSidebar() {
  const pathname = usePathname();
  const { isOpen } = useMediaQuery();
  const { user } = {} as any;
  const router = useRouter();
  const handleSwitchTenant = (_tenantId: string) => {
    // Tenant switching functionality would be implemented here
  };

  const activeTenant = tenants[0];

  React.useEffect(() => {
    // Side effects based on sidebar state changes
  }, [isOpen]);

  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader>
        <OrgSwitcher
          tenants={tenants}
          defaultTenant={activeTenant}
          onTenantSwitch={handleSwitchTenant}
        />
        <div className='mb-6'>
          <div className='relative'>
            <IconSearch className='text-muted-foreground absolute top-1/2 left-2 h-5 w-5 -translate-y-1/2' />
            <Input placeholder='Search...' className='h-10 pl-8' />
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className='overflow-x-hidden'>
        <SidebarGroup>
          <SidebarMenu>
            {navItems.map((item) => {
              const Icon = item.icon ? Icons[item.icon] : Icons.logo;
              return item?.items && item?.items?.length > 0 ? (
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={item.isActive}
                  className='group/collapsible'
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        tooltip={item.title}
                        isActive={pathname === item.url}
                      >
                        {item.icon && <Icon />}
                        <span>{item.title}</span>
                        <IconChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items?.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={pathname === subItem.url}
                            >
                              <Link href={subItem.url}>
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ) : (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    isActive={pathname === item.url}
                  >
                    <Link href={item.url}>
                      <Icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <div className='mt-6 flex items-center justify-between rounded-md border p-2'>
            <SidebarGroupLabel className='h-auto pl-1 text-sm font-medium'>
              Add Items
            </SidebarGroupLabel>
            <button className='bg-primary text-primary-foreground hover:bg-primary/90 flex h-6 w-6 items-center justify-center rounded-sm'>
              <IconPlus className='h-4 w-4' />
            </button>
          </div>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className='mb-20'>
        <div
          className='rounded-md'
          style={{
            background:
              'linear-gradient(0deg, #FFFFFF, #FFFFFF), linear-gradient(360deg, rgba(91, 81, 213, 0.05) 0%, rgba(255, 255, 255, 0) 100%)'
          }}
        >
          <div className='mb-3.5 flex items-start justify-between'>
            <h3 className='text-sm font-semibold'>AI Assist</h3>
          </div>
          <p className='text-muted-foreground mb-3 text-xs'>
            AI Assist simplifies content creation with fast AI-powered
            suggestions and improvements.
          </p>
          <div className='bg-muted mb-3 h-1 w-full overflow-hidden rounded-full'>
            <div className='bg-primary h-full w-3/4'></div>
          </div>
          <button className='bg-primary text-primary-foreground hover:bg-primary/90 flex w-full items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium'>
            <IconSparkles className='h-4 w-4' />
            AI Assist
          </button>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
