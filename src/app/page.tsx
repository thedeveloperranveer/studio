
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
  Clock,
} from 'lucide-react';
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
  announcements,
  freeResources,
  importantUpdates,
  upcomingTests,
} from '@/lib/mock-data';
import Header from '@/components/layout/Header';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Home() {
  return (
    <>
      <Header />
      <div className="space-y-16 md:space-y-24 px-4 py-8 md:py-16">
        <HeroSection />
        <LatestLecturesSection />
        <AnnouncementsSection />
        <FreeResourcesSection />
        <UpcomingTestsSection />
        <ImportantUpdatesSection />
      </div>
    </>
  );
}

function HeroSection() {
  return (
    <section className="text-center container mx-auto">
      <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">
        Master Your JEE and NEET Preparation
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

function LatestLecturesSection() {
    const lectureCardsHTML = `
    <div class="lecture-card">
      <img src="https://img.youtube.com/vi/hJi3S1haN3Y/0.jpg" alt="CELL BEST ONESHOT FOR NEET" class="thumbnail">
      <div class="card-content">
        <h3 class="title">CELL BEST ONESHOT FOR NEET</h3>
        <div class="tags">
              <span class="tag">THEORY</span>
              <span class="tag">NEET</span>
              <span class="tag">SUMMARY</span>
              <span class="tag">ONESHOT</span>
              <span class="tag">SOME PYQ</span>
        </div>
        <p class="notes">NOTES WILL PROVIDED SOON</p>
        <a href="https://www.youtube.com/watch?v=hJi3S1haN3Y" target="_blank" class="button">Watch on YouTube</a>
      </div>
    </div>
    <div class="lecture-card">
      <img src="https://img.youtube.com/vi/cS64-wAFDuI/0.jpg" alt="VECTORS MATHS BEST ONESHOT " class="thumbnail">
      <div class="card-content">
        <h3 class="title">VECTORS MATHS BEST ONESHOT </h3>
        <div class="tags">
              <span class="tag">THEORY</span>
              <span class="tag">ONESHOT</span>
              <span class="tag">JEE</span>
              <span class="tag">PYQs</span>
        </div>
        <p class="notes">NOTES WILL PROVIDED SOON</p>
        <a href="https://www.youtube.com/watch?v=cS64-wAFDuI" target="_blank" class="button">Watch on YouTube</a>
      </div>
    </div>
    <div class="lecture-card">
      <img src="https://img.youtube.com/vi/zT0fKF4q7n4/0.jpg" alt="BEST ONESHOT FOR IUPAC" class="thumbnail">
      <div class="card-content">
        <h3 class="title">BEST ONESHOT FOR IUPAC</h3>
        <div class="tags">
              <span class="tag">THEORY</span>
              <span class="tag">ONESHOT</span>
              <span class="tag">NEET</span>
        </div>
        <p class="notes">NOTES WILL PROVIDED SOON</p>
        <a href="https://www.youtube.com/watch?v=zT0fKF4q7n4" target="_blank" class="button">Watch on YouTube</a>
      </div>
    </div>
    <div class="lecture-card">
      <img src="https://img.youtube.com/vi/WDjcpSCI-uU/0.jpg" alt="Quantum Physics Demystified" class="thumbnail">
      <div class="card-content">
        <h3 class="title">Quantum Physics Demystified</h3>
        <div class="tags">
              <span class="tag">PYQ</span>
              <span class="tag">OneShot</span>
              <span class="tag">Advanced</span>
        </div>
        <p class="notes">Full chapter notes available in the description.</p>
        <a href="https://www.youtube.com/watch?v=WDjcpSCI-uU" target="_blank" class="button">Watch on YouTube</a>
      </div>
    </div>
  `;

  const lectureCardStyles = `
    .lecture-card {
      background-color: #1e1e1e;
      color: white;
      font-family: sans-serif;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      overflow: hidden;
      width: 320px;
      transition: transform 0.2s;
    }
    .lecture-card:hover {
      transform: translateY(-5px);
    }
    .thumbnail {
      width: 100%;
      height: 180px;
      object-fit: cover;
    }
    .card-content {
      padding: 16px;
    }
    .title {
      font-size: 1.25rem;
      font-weight: bold;
      margin: 0 0 8px 0;
    }
    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 12px;
    }
    .tag {
      background-color: #333;
      padding: 4px 10px;
      border-radius: 16px;
      font-size: 0.8rem;
    }
    .notes {
      font-size: 0.9rem;
      color: #ccc;
      margin-bottom: 16px;
    }
    .notes-button {
      display: block;
      width: 100%;
      text-align: center;
      background-color: #333;
      color: white;
      padding: 10px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: bold;
      margin-bottom: 10px;
      transition: background-color 0.2s;
    }
    .notes-button:hover {
        background-color: #444;
    }
    .button {
      display: block;
      width: 100%;
      text-align: center;
      background: linear-gradient(to right, #00C6FF, #6E00FF);
      color: white;
      padding: 12px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: bold;
    }
  `;

  return (
    <section className="container mx-auto">
      <style>{lectureCardStyles}</style>
      <h2 className="font-headline text-3xl font-bold mb-6 flex items-center gap-3">
        <Clock className="text-primary" /> Latest Lectures
      </h2>
      <Carousel
        opts={{
          align: "start",
          loop: false,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-1">
          {/* This is a bit of a hack, but it's the only way to render the static HTML strings into separate carousel items */}
          {lectureCardsHTML.split('<div class="lecture-card">').slice(1).map((cardHtml, index) => (
             <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                   <div
                    className="lecture-card-wrapper"
                    dangerouslySetInnerHTML={{ __html: '<div class="lecture-card">' + cardHtml }}
                  />
                </div>
              </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-12 bg-background/50 backdrop-blur-sm border-primary/50 hover:bg-primary/20"/>
        <CarouselNext className="mr-12 bg-background/50 backdrop-blur-sm border-primary/50 hover:bg-primary/20" />
      </Carousel>
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
