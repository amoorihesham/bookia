import { AppSidebar } from '@/components/sidebar/app-side-bar';
import { SidebarNavMenuGroup } from '@/components/sidebar/sidebar-nav-menu-group';
import { SidebarUserButton } from '@/features/users/componnets/sidebar-user-button';
import { Book, Calendar, ChartBarStacked, Subscript, Users } from 'lucide-react';
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
            { href: '/admin/subscriptions', icon: <Subscript />, label: 'Subscriptions' },
            { href: '/admin/bookings', icon: <Book />, label: 'Bookings' },
          ]}
        />
      }
      footerButton={<SidebarUserButton />}
    >
      {children}
    </AppSidebar>
  );
}
