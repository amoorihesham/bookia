'use client';

import { ReactNode } from 'react';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '../ui/sidebar';
import { SignedIn, SignedOut } from '@/services/clerk/components/signin-status';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Route } from 'next';

export function SidebarNavMenuGroup({
  title,
  items,
  className,
}: {
  items: {
    href: string;
    icon: ReactNode;
    label: string;
    authStatus?: 'signedOut' | 'signedIn';
  }[];
  className?: string;
  title?: string;
}) {
  const pathname = usePathname();
  const { isMobile, setOpenMobile } = useSidebar();
  return (
    <SidebarGroup className={className}>
      {title && <SidebarGroupLabel>{title}</SidebarGroupLabel>}

      <SidebarMenu>
        {items.map((item, idx) => {
          const html = (
            <SidebarMenuItem key={idx + 1}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
              >
                <Link
                  href={item.href as Route}
                  onClick={() => {
                    if (isMobile) setOpenMobile(false);
                  }}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );

          if (item.authStatus === 'signedOut') {
            return <SignedOut key={idx + 1}>{html}</SignedOut>;
          }

          if (item.authStatus === 'signedIn') {
            return <SignedIn key={idx + 1}>{html}</SignedIn>;
          }

          return html;
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
