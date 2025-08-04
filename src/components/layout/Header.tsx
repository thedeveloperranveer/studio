
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell, BookOpen, Film, FlaskConical, LayoutGrid, LogIn, User, Beaker, Stethoscope } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Logo from '../shared/Logo';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';

const navLinks = [
  { href: '/', label: 'Home', icon: LayoutGrid },
  { href: '/resources', label: 'Resources', icon: BookOpen },
  { href: '/lectures', label: 'Lectures', icon: Film },
  { href: '/tests', label: 'Test Zone', icon: FlaskConical },
];

export default function Header() {
  const pathname = usePathname();
  
  // Do not render header on admin pages
  if (pathname.startsWith('/admin') || pathname.startsWith('/login')) {
    return null;
  }

  return (
    <header className="sticky top-4 z-50 mx-auto max-w-6xl w-[95%]">
      <div className="glassmorphism flex items-center justify-between rounded-2xl p-3 px-4 shadow-lg">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="h-8 w-auto" />
        </Link>
        <nav className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => (
            <Button
              key={link.href}
              variant="ghost"
              asChild
              className={cn(
                'rounded-lg',
                pathname === link.href && 'bg-primary/10 text-primary'
              )}
            >
              <Link href={link.href}>{link.label}</Link>
            </Button>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5" />
          </Button>
          <Button asChild className='rounded-xl'>
            <Link href="/login"><LogIn className='mr-2'/>Login</Link>
          </Button>
        </div>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-lg">
                <LayoutGrid className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] glassmorphism border-none">
              <nav className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                  <Button
                    key={link.href}
                    variant="ghost"
                    asChild
                    className={cn(
                      'justify-start text-lg p-6 rounded-lg',
                      pathname === link.href && 'bg-primary/10 text-primary'
                    )}
                  >
                    <Link href={link.href} className='flex items-center gap-4'>
                      <link.icon className="h-5 w-5" />
                      {link.label}
                    </Link>
                  </Button>
                ))}
              </nav>
              <div className="mt-8 border-t border-border pt-4 flex flex-col gap-4">
                 <Button
                    variant="ghost"
                    asChild
                    className="justify-start text-lg p-6 rounded-lg"
                  >
                    <Link href="/profile" className='flex items-center gap-4'>
                      <User className="h-5 w-5" />
                      Profile
                    </Link>
                  </Button>
                   <Button asChild className='rounded-xl'>
                     <Link href="/login"><LogIn className='mr-2'/>Login</Link>
                   </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
