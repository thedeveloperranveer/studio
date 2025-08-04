'use client';
import {
  Bell,
  Book,
  FileText,
  Video,
  AlertTriangle,
  Calendar,
  ChevronRight,
  Inbox,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  announcements,
  freeResources,
  importantUpdates,
  latestLectures,
  upcomingTests,
} from '@/lib/mock-data';
import Header from '@/components/layout/Header';
import { useEffect, useState } from 'react';
import WelcomePrompt from '@/components/shared/WelcomePrompt';

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user name exists in localStorage
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setUserName(storedName);
      setShowWelcome(false);
    } else {
      setShowWelcome(true);
    }
    setIsLoading(false);
  }, []);

  const handleWelcomeComplete = (name: string) => {
    setUserName(name);
    setShowWelcome(false);
  };

  if (isLoading) {
    // You can return a loading spinner here if you want
    return null;
  }

  if (showWelcome) {
    return <WelcomePrompt onWelcomeComplete={handleWelcomeComplete} />;
  }

  return (
    <>
      <Header />
      <div className="space-y-16 md:space-y-24 px-4 py-8 md:py-16">
        <HeroSection name={userName} />
        <AnnouncementsSection />
        <FreeResourcesSection />
        <UpcomingTestsSection />
        <LatestLecturesSection />
        <ImportantUpdatesSection />
      </div>
    </>
  );
}

function HeroSection({ name }: { name: string | null }) {
  return (
    <section className="text-center container mx-auto">
      <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">
        Welcome, {name || 'Guest'}! Master Your JEE and NEET Preparation
      </h1>
      <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
        StudyJEET provides you with the best resources, lectures, and test series to ace the JEE and NEET. Your journey to an IIT or Medical College starts here.
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <Button size="lg" className="font-bold rounded-xl" asChild>
          <Link href="/tests">Start a Test</Link>
        </Button>
        <Button size="lg" variant="outline" className="font-bold rounded-xl bg-transparent" asChild>
          <Link href="/resources">Browse Resources</Link>
        </Button>
      </div>
    </section>
  );
}

function EmptyState({ title, description, icon: Icon }: { title: string, description: string, icon: React.ElementType }) {
    return (
        <Card className="glassmorphism col-span-1 sm:col-span-2 lg:col-span-3">
            <CardContent className="p-10 text-center">
                <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                    <Icon className="h-12 w-12 mb-4 text-primary"/>
                    <h3 className="text-xl font-headline mb-1">{title}</h3>
                    <p>{description}</p>
                </div>
            </CardContent>
        </Card>
    )
}

function AnnouncementsSection() {
  return (
    <section className="container mx-auto">
      <h2 className="font-headline text-3xl font-bold mb-6 flex items-center gap-3">
        <Bell className="text-primary" /> Latest Announcements
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {announcements.length > 0 ? (
          announcements.map((item) => (
            <Card key={item.id} className="glassmorphism hover:border-primary/50 transition-all duration-300">
              <CardHeader>
                <CardTitle className="font-headline text-lg">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{item.description}</p>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-muted-foreground">{item.date}</p>
              </CardFooter>
            </Card>
          ))
        ) : (
          <EmptyState title="No Announcements Yet" description="Check back later for the latest news." icon={Inbox} />
        )}
      </div>
    </section>
  );
}

function FreeResourcesSection() {
  return (
    <section className="container mx-auto">
      <h2 className="font-headline text-3xl font-bold mb-6 flex items-center gap-3">
        <Book className="text-primary" /> Free Resources
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
         {freeResources.length > 0 ? (
          freeResources.map((item) => (
            <Card key={item.id} className="glassmorphism text-center flex flex-col items-center justify-center p-6 hover:border-primary/50 transition-all duration-300">
              <FileText className="w-12 h-12 mb-4 text-primary" />
              <h3 className="font-headline text-xl font-semibold">{item.subject}</h3>
              <p className="text-muted-foreground">{item.type}</p>
              <Button variant="link" asChild className="mt-2">
                <Link href="/resources">View All <ChevronRight className="w-4 h-4 ml-1"/></Link>
              </Button>
            </Card>
          ))
        ) : (
            <div className="col-span-2 md:col-span-4">
                <EmptyState title="No Free Resources" description="Resources will be available soon." icon={Inbox} />
            </div>
        )}
      </div>
    </section>
  );
}

function UpcomingTestsSection() {
  return (
    <section className="container mx-auto">
      <h2 className="font-headline text-3xl font-bold mb-6 flex items-center gap-3">
        <Calendar className="text-primary" /> Upcoming Tests
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {upcomingTests.length > 0 ? (
            upcomingTests.map((test) => (
            <Card key={test.id} className="glassmorphism hover:border-primary/50 transition-all duration-300 flex flex-col">
              <CardHeader>
                <Badge variant="secondary" className="absolute top-4 right-4 bg-gradient-to-r from-pink-500 to-orange-400 text-white">{test.subject}</Badge>
                <CardTitle className="font-headline text-xl">{test.title}</CardTitle>
                <CardDescription>{test.date}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                 <p className="text-sm text-muted-foreground mb-4">Starts in:</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full rounded-xl" asChild>
                  <Link href="/tests">View Details</Link>
                </Button>
              </CardFooter>
            </Card>
          ))
         ) : (
            <EmptyState title="No Upcoming Tests" description="Tests will be scheduled soon. Keep an eye out!" icon={Inbox} />
         )}
      </div>
    </section>
  );
}

function LatestLecturesSection() {
  return (
    <section className="container mx-auto">
      <h2 className="font-headline text-3xl font-bold mb-6 flex items-center gap-3">
        <Video className="text-primary" /> Latest Lectures
      </h2>
      {latestLectures.length > 0 ? (
       <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {latestLectures.map((lecture) => (
            <CarouselItem key={lecture.id} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card className="glassmorphism overflow-hidden hover:border-primary/50 transition-all duration-300">
                  <CardContent className="p-0">
                    <Link href={`/lectures/${lecture.id}`} className="block h-48 overflow-hidden">
                      <Image
                        src={lecture.thumbnailUrl}
                        alt={lecture.title}
                        width={600}
                        height={400}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        data-ai-hint="lecture thumbnail"
                      />
                    </Link>
                    <div className="p-6">
                      <div className="flex flex-wrap gap-2 mb-2">
                          {lecture.tags.map(tag => <Badge key={tag} variant="outline">{tag}</Badge>)}
                      </div>
                      <h3 className="font-headline text-lg font-semibold">{lecture.title}</h3>
                      <p className="text-muted-foreground text-sm mt-1">{lecture.notes}</p>
                      <Button className="w-full mt-4 rounded-xl" asChild>
                        <Link href={`/lectures/${lecture.id}`}>Watch Lecture</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-12" />
        <CarouselNext className="mr-12"/>
      </Carousel>
      ) : (
        <Card className="glassmorphism">
            <CardContent className="p-10">
                 <EmptyState title="No Lectures Available" description="New lectures will be uploaded soon." icon={Inbox} />
            </CardContent>
        </Card>
      )}
    </section>
  );
}

function ImportantUpdatesSection() {
  return (
    <section className="container mx-auto">
      <h2 className="font-headline text-3xl font-bold mb-6 flex items-center gap-3">
        <AlertTriangle className="text-secondary" /> Important
      </h2>
      <div className="space-y-4">
        {importantUpdates.length > 0 ? (
            importantUpdates.map((item) => (
            <Card key={item.id} className="glassmorphism hover:border-secondary/50 transition-all duration-300">
                <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="bg-secondary/20 p-2 rounded-full">
                    <AlertTriangle className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                </div>
                {item.link && (
                    <Button variant="link" asChild>
                    <Link href={item.link}>Learn More</Link>
                    </Button>
                )}
                </CardContent>
            </Card>
            ))
        ) : (
            <Card className="glassmorphism">
                <CardContent className="p-10 text-center">
                    <EmptyState title="No Important Updates" description="All clear for now. Check back later." icon={Inbox} />
                </CardContent>
            </Card>
        )}
      </div>
    </section>
  );
}
