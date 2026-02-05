import { getCurrentUser } from '@/shared/lib/auth';
import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar';
import Link from 'next/link';
import { LayoutDashboard } from 'lucide-react';

export const DashboardButton = async () => {
  const user = await getCurrentUser();
  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <SidebarMenuItem className="mx-auto w-[95%]">
      <SidebarMenuButton asChild>
        <Link href="/admin">
          <LayoutDashboard />
          Dashboard
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
