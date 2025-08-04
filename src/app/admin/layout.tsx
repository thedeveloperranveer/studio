
import Link from 'next/link';
import {
  Bell,
  Book,
  FileText,
  FlaskConical,
  Home,
  MessageSquareQuote,
  PanelLeft,
  Upload,
  Users,
  AlertTriangle,
  Settings,
  Grid3x3,
} from 'lucide-react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import Logo from '@/components/shared/Logo';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import LogoutButton from './LogoutButton';

const adminNavItems = [
  { href: '/admin', label: 'Dashboard', icon: Home },
  { href: '/admin/users', label: 'Users', icon: Users },
  { href: '/admin/lectures/upload', label: 'Upload Lectures', icon: Upload },
  { href: '/admin/lectures', label: 'Manage Lectures', icon: Settings },
  { href: '/admin/card-generator', label: 'Card Generator', icon: Grid3x3 },
  { href: '#', label: 'Notes', icon: FileText },
  { href: '#', label: 'Tests', icon: FlaskConical },
  { href: '#', 'label': 'Announcements', 'icon': Bell },
  { href: '#', 'label': 'Important', 'icon': AlertTriangle },
  { href: '/admin/feedback', 'label': 'Feedback', 'icon': MessageSquareQuote },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Logo className="h-10 w-auto" />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {adminNavItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <Link href={item.href}>
                  <SidebarMenuButton>
                    <item.icon className="h-5 w-5" />
                    <span className="truncate">{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
             <SidebarMenuItem>
                <LogoutButton />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <div className="flex items-center gap-3">
             <Avatar className="h-9 w-9">
                <AvatarImage src="https://placehold.co/100x100" data-ai-hint="avatar placeholder" />
                <AvatarFallback>A</AvatarFallback>
             </Avatar>
             <div className='overflow-hidden'>
                <p className="font-semibold truncate">Admin User</p>
                <p className="text-xs text-muted-foreground truncate">admin@studyjeet.com</p>
             </div>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center justify-between p-4 border-b bg-background/50 backdrop-blur-sm sticky top-0 z-10">
          <SidebarTrigger>
            <PanelLeft />
          </SidebarTrigger>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bell />
            </Button>
            <Avatar className="h-9 w-9">
              <AvatarImage src="https://placehold.co/100x100" data-ai-hint="avatar placeholder" />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
          </div>
        </header>
        <main className="p-4 md:p-6 bg-background/80">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
