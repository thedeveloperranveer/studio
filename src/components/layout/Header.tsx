
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell, BookOpen, Film, FlaskConical, LayoutGrid, User, Clock, FileText } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Logo from '../shared/Logo';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


const navLinks = [
  { href: '/', label: 'Home', icon: LayoutGrid },
  { href: '/resources', label: 'Resources', icon: BookOpen },
  { href: '/tests', label: 'Test Zone', icon: FlaskConical },
  { href: '/notes', label: 'Notes', icon: FileText },
];

export default function Header() {
  const pathname = usePathname();

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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className='rounded-lg'>Lectures</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>JEE</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild><Link href="/lectures/jee/physics">Physics</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href="/lectures/jee/chemistry">Chemistry</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href="/lectures/jee/maths">Maths</Link></DropdownMenuItem>
                <DropdownMenuSeparator />
                 <DropdownMenuLabel>NEET</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild><Link href="/lectures/neet/physics">Physics</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href="/lectures/neet/chemistry">Chemistry</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href="/lectures/neet/biology">Biology</Link></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        </nav>
        <div className="hidden md:flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5" />
          </Button>
          <Button asChild className='rounded-xl'>
            <Link href="/profile"><User className='mr-2'/>Profile</Link>
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
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

    