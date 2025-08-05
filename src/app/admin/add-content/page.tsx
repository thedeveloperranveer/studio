
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function AddContentPage() {
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <Card className="glassmorphism max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="font-headline text-3xl">Content Card Generator</CardTitle>
            <CardDescription>
              Fill out this form to generate the HTML for a new lecture, note, or resource card.
              Copy the generated HTML and provide it to the AI to add it to the site.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="content-type">Content Type</Label>
                  <Select>
                    <SelectTrigger id="content-type" className="bg-transparent">
                      <SelectValue placeholder="Select content type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lecture">Lecture</SelectItem>
                      <SelectItem value="note">Note</SelectItem>
                      <SelectItem value="resource">Resource</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="exam-type">Exam</Label>
                  <Select>
                    <SelectTrigger id="exam-type" className="bg-transparent">
                      <SelectValue placeholder="Select exam" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jee">JEE</SelectItem>
                      <SelectItem value="neet">NEET</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

               <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Select>
                  <SelectTrigger id="subject" className="bg-transparent">
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectItem value="physics">Physics</SelectItem>
                     <SelectItem value="chemistry">Chemistry</SelectItem>
                     <SelectItem value="maths">Maths</SelectItem>
                     <SelectItem value="biology">Biology</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="e.g., Vectors One Shot" className="bg-transparent"/>
              </div>

              <div className="space-y-2">
                <Label htmlFor="youtube-id">YouTube Video ID</Label>
                <Input id="youtube-id" placeholder="e.g., cS64-wAFDuI" className="bg-transparent"/>
                 <p className="text-xs text-muted-foreground">
                    Only the ID from the YouTube URL (e.g., the "cS64-wAFDuI" in "youtube.com/watch?v=cS64-wAFDuI").
                  </p>
              </div>

               <div className="space-y-2">
                <Label htmlFor="notes-link">Notes Link (Optional)</Label>
                <Input id="notes-link" placeholder="e.g., https://example.com/notes.pdf" className="bg-transparent"/>
              </div>

               <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input id="tags" placeholder="e.g., ONESHOT, PYQs, THEORY" className="bg-transparent"/>
                 <p className="text-xs text-muted-foreground">
                    Enter tags separated by commas.
                  </p>
              </div>

              <Button type="submit" className="w-full rounded-xl">Generate Card HTML</Button>

            </form>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
