import { AppSidebar } from '@/components/sidebar/app-side-bar';
import { SidebarNavMenuGroup } from '@/components/sidebar/sidebar-nav-menu-group';
import { SidebarUserButton } from '@/features/users/componnets/sidebar-user-button';
import { Home, LogInIcon, Sparkle } from 'lucide-react';
import { ReactNode } from 'react';

export default function WebsiteLayout({ children }: { children: ReactNode }) {
  return (
    <AppSidebar
      content={
        <>
          <SidebarNavMenuGroup
            className='mt-auto'
            items={[
              { href: '/', icon: <Home />, label: 'Home' },
              {
                href: '/events',
                icon: <Sparkle />,
                label: 'events',
                authStatus: 'signedIn',
              },
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
