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
          <SidebarHeader className="flex-row">
            <SidebarTrigger />
            <span className="text-xl text-nowrap">Bookia</span>
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
