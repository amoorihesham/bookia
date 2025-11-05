import { AppSidebar } from '@/components/sidebar/app-side-bar';
import { SidebarNavMenuGroup } from '@/components/sidebar/sidebar-nav-menu-group';
import { SidebarUserButton } from '@/features/users/componnets/sidebar-user-button';
import {
  CalendarDays,
  DraftingCompass,
  FileSignature,
  HandMetal,
  Home,
  Lightbulb,
  LogInIcon,
  Plus,
  TicketsPlane,
} from 'lucide-react';
import { ReactNode } from 'react';

export default function WebsiteLayout({ children }: { children: ReactNode }) {
  return (
    <AppSidebar
      content={
        <>
          <SidebarNavMenuGroup
            title='Events'
            // className='mt-auto'
            items={[
              { href: '/', icon: <Home />, label: 'All' },
              {
                href: '/today',
                icon: <Lightbulb />,
                label: 'Today',
              },
              {
                href: '/upcoming',
                icon: <CalendarDays />,
                label: 'Upcoming',
              },
              {
                href: '/featured',
                icon: <FileSignature />,
                label: 'Featured',
              },
              {
                href: '/expired',
                icon: <DraftingCompass />,
                label: 'Expired',
              },
              {
                href: '/sign-in',
                icon: <LogInIcon />,
                label: 'Sign In',
                authStatus: 'signedOut',
              },
            ]}
          />{' '}
          <SidebarNavMenuGroup
            title='Billing'
            // className='mt-auto'
            items={[{ href: '/plans', icon: <TicketsPlane />, label: 'Plans', authStatus: 'signedIn' }]}
          />
          <SidebarNavMenuGroup
            className='mt-auto'
            items={[
              { href: '/new-event', icon: <Plus />, label: 'New Event', authStatus: 'signedIn' },
              { href: '/my-events', icon: <HandMetal />, label: 'My Events', authStatus: 'signedIn' },
              {
                href: '/sign-in',
                icon: <LogInIcon />,
                label: 'Sign In',
                authStatus: 'signedOut',
              },
            ]}
          />
        </>
      }
      footerButton={<SidebarUserButton />}
    >
      {children}
    </AppSidebar>
  );
}
