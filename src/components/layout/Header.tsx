
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
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu"


const mainNavLinks = [
  { href: '/', label: 'Home', icon: LayoutGrid },
  { href: '/tests', label: 'Test Zone', icon: FlaskConical },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-4 z-50 mx-auto max-w-6xl w-[95%]">
      <div className="glassmorphism flex items-center justify-between rounded-2xl p-3 px-4 shadow-lg">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="h-8 w-auto" />
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {mainNavLinks.map((link) => (
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
          
          {/* Lectures Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className={cn('rounded-lg', pathname.startsWith('/lectures') && 'bg-primary/10 text-primary')}>Lectures</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                    <DropdownMenuLabel>JEE</DropdownMenuLabel>
                    <DropdownMenuItem asChild><Link href="/lectures/jee/physics">Physics</Link></DropdownMenuItem>
                    <DropdownMenuItem asChild><Link href="/lectures/jee/chemistry">Chemistry</Link></DropdownMenuItem>
                    <DropdownMenuItem asChild><Link href="/lectures/jee/maths">Maths</Link></DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuLabel>NEET</DropdownMenuLabel>
                    <DropdownMenuItem asChild><Link href="/lectures/neet/physics">Physics</Link></DropdownMenuItem>
                    <DropdownMenuItem asChild><Link href="/lectures/neet/chemistry">Chemistry</Link></DropdownMenuItem>
                    <DropdownMenuItem asChild><Link href="/lectures/neet/biology">Biology</Link></DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notes Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className={cn('rounded-lg', pathname.startsWith('/notes') && 'bg-primary/10 text-primary')}>Notes</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuItem asChild><Link href="/notes">Latest Notes</Link></DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuLabel>JEE</DropdownMenuLabel>
                    <DropdownMenuItem asChild><Link href="/notes/jee/physics">Physics</Link></DropdownMenuItem>
                    <DropdownMenuItem asChild><Link href="/notes/jee/chemistry">Chemistry</Link></DropdownMenuItem>
                    <DropdownMenuItem asChild><Link href="/notes/jee/maths">Maths</Link></DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuLabel>NEET</DropdownMenuLabel>
                    <DropdownMenuItem asChild><Link href="/notes/neet/physics">Physics</Link></DropdownMenuItem>
                    <DropdownMenuItem asChild><Link href="/notes/neet/chemistry">Chemistry</Link></DropdownMenuItem>
                    <DropdownMenuItem asChild><Link href="/notes/neet/biology">Biology</Link></DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Resources Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className={cn('rounded-lg', pathname.startsWith('/resources') && 'bg-primary/10 text-primary')}>Resources</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuItem asChild><Link href="/resources">Latest Resources</Link></DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuLabel>JEE</DropdownMenuLabel>
                    <DropdownMenuItem asChild><Link href="/resources/jee/physics">Physics</Link></DropdownMenuItem>
                    <DropdownMenuItem asChild><Link href="/resources/jee/chemistry">Chemistry</Link></DropdownMenuItem>
                    <DropdownMenuItem asChild><Link href="/resources/jee/maths">Maths</Link></DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuLabel>NEET</DropdownMenuLabel>
                    <DropdownMenuItem asChild><Link href="/resources/neet/physics">Physics</Link></DropdownMenuItem>
                    <DropdownMenuItem asChild><Link href="/resources/neet/chemistry">Chemistry</Link></DropdownMenuItem>
                    <DropdownMenuItem asChild><Link href="/resources/neet/biology">Biology</Link></DropdownMenuItem>
                </DropdownMenuGroup>
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
                {mainNavLinks.map((link) => (
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
                 <Button variant="ghost" asChild className="justify-start text-lg p-6 rounded-lg"><Link href="/lectures/jee/physics" className='flex items-center gap-4'><Film className="h-5 w-5" />Lectures</Link></Button>
                 <Button variant="ghost" asChild className="justify-start text-lg p-6 rounded-lg"><Link href="/notes" className='flex items-center gap-4'><FileText className="h-5 w-5" />Notes</Link></Button>
                 <Button variant="ghost" asChild className="justify-start text-lg p-6 rounded-lg"><Link href="/resources" className='flex items-center gap-4'><BookOpen className="h-5 w-5" />Resources</Link></Button>
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
