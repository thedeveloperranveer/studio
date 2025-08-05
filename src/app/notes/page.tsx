
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Download, Eye, Inbox } from "lucide-react";

const notes: { id: number; title: string; subject: string; type: string }[] = [];

export default function NotesPage() {
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="font-headline text-4xl md:text-5xl font-bold bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">
            Notes
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Download notes for all your subjects.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <Input placeholder="Search notes..." className="bg-transparent" />
          <Select>
            <SelectTrigger className="w-full md:w-[180px] bg-transparent">
              <SelectValue placeholder="Filter by subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="physics">Physics</SelectItem>
              <SelectItem value="chemistry">Chemistry</SelectItem>
              <SelectItem value="math">Maths</SelectItem>
              <SelectItem value="biology">Biology</SelectItem>
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

        {notes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <Card key={note.id} className="glassmorphism hover:border-primary/50 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <FileText className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-headline text-lg font-semibold">{note.title}</h3>
                        <div className="flex gap-2 mt-1">
                          <span className="text-sm text-muted-foreground">{note.subject}</span>
                          <span className="text-sm text-muted-foreground">&bull;</span>
                          <span className="text-sm text-muted-foreground">{note.type}</span>
                        </div>
                      </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                      <Button className="w-full rounded-xl" size="sm">
                          <Download className="w-4 h-4 mr-2"/> Download
                      </Button>
                      <Button variant="outline" className="w-full rounded-xl bg-transparent" size="sm">
                          <Eye className="w-4 h-4 mr-2"/> Preview
                      </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="glassmorphism col-span-1 md:col-span-2 lg:col-span-3">
            <CardContent className="p-10">
              <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                <Inbox className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-headline mb-1">No Notes Available</h3>
                <p>Notes will be added soon. Please check back later.</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
}
