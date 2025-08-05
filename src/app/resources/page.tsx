
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Download, Eye, Inbox } from "lucide-react";

// This will eventually hold the combined list of the latest resources.
// For now, it's an empty placeholder.
const latestResources: { id: number; title: string; subject: string; type: string }[] = [];

export default function LatestResourcesPage() {
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="font-headline text-4xl md:text-5xl font-bold bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">
            Latest Resources
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Your central hub for all recently added resources.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <Input placeholder="Search all resources..." className="bg-transparent" />
          <Select>
            <SelectTrigger className="w-full md:w-[180px] bg-transparent">
              <SelectValue placeholder="Filter by exam" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="jee">JEE</SelectItem>
              <SelectItem value="neet">NEET</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full md:w-[180px] bg-transparent">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="notes">Notes</SelectItem>
              <SelectItem value="books">Books</SelectItem>
              <SelectItem value="pyqs">PYQs</SelectItem>
            </SelectContent>
          </Select>
           <Select>
            <SelectTrigger className="w-full md:w-[180px] bg-transparent">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">Latest</SelectItem>
              <SelectItem value="popular">Popular</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {latestResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* The resource cards will be rendered here */}
          </div>
        ) : (
          <Card className="glassmorphism col-span-1 md:col-span-2 lg:col-span-3">
            <CardContent className="p-10">
              <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                <Inbox className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-headline mb-1">No Resources Available Yet</h3>
                <p>Add your first resource card, and it will appear here.</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
}
