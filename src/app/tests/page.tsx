import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { upcomingTests } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { BarChart, Calendar, CheckCircle, Target, Inbox } from "lucide-react";

export default function TestZonePage() {
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
         <div className="text-center mb-12">
          <h1 className="font-headline text-4xl md:text-5xl font-bold bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">
            Test Zone
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Sharpen your skills and track your progress with our test series.
          </p>
        </div>

        <div className="mb-12">
            <h2 className="font-headline text-3xl font-bold mb-6 flex items-center gap-3"><Calendar className="text-primary"/> Upcoming Tests</h2>
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
                    <p className="text-sm text-muted-foreground mb-4">Chapters: {test.chapters.join(', ')}</p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full rounded-xl">Start Test</Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <Card className="glassmorphism col-span-1 md:col-span-2 lg:col-span-3">
                <CardContent className="p-10">
                  <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                    <Inbox className="h-12 w-12 mb-4 text-primary" />
                    <h3 className="text-xl font-headline mb-1">No Upcoming Tests</h3>
                    <p>New tests will be scheduled soon. Keep practicing!</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        <div>
           <h2 className="font-headline text-3xl font-bold mb-6 flex items-center gap-3"><BarChart className="text-primary"/> Recent Test Result</h2>
            <Card className="glassmorphism">
                <CardHeader>
                    <CardTitle className="font-headline">No Recent Test</CardTitle>
                    <CardDescription>Your performance analysis will appear here after you take a test.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    <div className="glassmorphism p-6 rounded-xl">
                        <CheckCircle className="w-12 h-12 text-muted-foreground mx-auto mb-2"/>
                        <p className="text-4xl font-bold">- / -</p>
                        <p className="text-muted-foreground">Total Marks</p>
                    </div>
                     <div className="glassmorphism p-6 rounded-xl">
                        <Target className="w-12 h-12 text-muted-foreground mx-auto mb-2"/>
                        <p className="text-4xl font-bold">- %</p>
                        <p className="text-muted-foreground">Accuracy</p>
                    </div>
                     <div className="glassmorphism p-6 rounded-xl">
                        <p className="text-4xl font-bold">- / -</p>
                        <p className="text-muted-foreground">Attempted</p>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button variant="link" disabled>View Detailed Analysis</Button>
                </CardFooter>
            </Card>
        </div>

      </div>
    </>
  );
}
