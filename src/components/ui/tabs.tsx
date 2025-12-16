'use client';

import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '@/lib/utils';

const Tabs: React.FC<
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>
> = ({ className, ...props }) => (
  <TabsPrimitive.Root
    data-slot='tabs'
    className={cn('flex flex-col gap-2', className)}
    {...props}
  />
);

const TabsList: React.FC<
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
> = ({ className, ...props }) => (
  <TabsPrimitive.List
    data-slot='tabs-list'
    className={cn(
      'bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]',
      className
    )}
    {...props}
  />
);

const TabsTrigger: React.FC<
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
> = ({ className, ...props }) => (
  <TabsPrimitive.Trigger
    data-slot='tabs-trigger'
    className={cn(
      'data-[state=active]:bg-background inline-flex flex-1 items-center justify-center rounded-md px-2 py-1 text-sm font-medium transition',
      className
    )}
    {...props}
  />
);

const TabsContent: React.FC<
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
> = ({ className, ...props }) => (
  <TabsPrimitive.Content
    data-slot='tabs-content'
    className={cn('flex-1 outline-none', className)}
    {...props}
  />
);

export { Tabs, TabsList, TabsTrigger, TabsContent };
