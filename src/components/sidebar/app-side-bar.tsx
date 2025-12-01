import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { SignedIn } from '@/services/clerk/components/signin-status';
import { AppSidebarClient } from './app-sidebar-client';
import { ReactNode } from 'react';
import { ContentWrapper } from '../shared';
import Image from 'next/image';
import Link from 'next/link';

export function AppSidebar({
  children,
  content,
  footerButton,
}: {
  children: ReactNode;
  content: ReactNode;
  footerButton: ReactNode;
}) {
  return (
    <SidebarProvider className="overflow-y-hidden">
      <AppSidebarClient>
        <Sidebar
          collapsible="icon"
          className="overflow-hidden"
        >
          <SidebarHeader className="flex-row justify-between">
            <Link href={'/'}>
              <Image
                src={'/logo.png'}
                alt="Venu logo"
                width={84}
                height={32}
                className="object-contain"
              />
            </Link>
            <SidebarTrigger />
          </SidebarHeader>
          <SidebarContent>{content}</SidebarContent>
          <SignedIn>
            <SidebarFooter>
              <SidebarMenu>
                <SidebarMenuItem>{footerButton}</SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>
          </SignedIn>
        </Sidebar>
        <ContentWrapper className="flex-1 py-6 lg:py-8">{children}</ContentWrapper>
      </AppSidebarClient>
    </SidebarProvider>
  );
}
