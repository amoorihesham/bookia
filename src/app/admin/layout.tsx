import { AppSidebar } from '@/components/sidebar/app-side-bar';
import { SidebarNavMenuGroup } from '@/components/sidebar/sidebar-nav-menu-group';
import { SidebarUserButton } from '@/features/users/componnets/sidebar-user-button';
import { Calendar, ChartBarStacked, Users } from 'lucide-react';
import { ReactNode } from 'react';

export default function AdminDashboardLayout({ children }: { children: ReactNode }) {
  return (
    <AppSidebar
      content={
        <SidebarNavMenuGroup
          className="mt-auto"
          items={[
            { href: '/admin/plans', icon: <Calendar />, label: 'Plans' },
            { href: '/admin/events', icon: <ChartBarStacked />, label: 'Events' },
            { href: '/admin/users', icon: <Users />, label: 'Users' },
          ]}
        />
      }
      footerButton={<SidebarUserButton />}
    >
      {children}
    </AppSidebar>
  );
}
