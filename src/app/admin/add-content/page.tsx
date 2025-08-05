
'use client';
import { useState } from "react";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

export default function AddContentPage() {
  const { toast } = useToast();
  const [generatedHtml, setGeneratedHtml] = useState('');

  const handleGenerate = (e: React.FormEvent, type: 'lecture' | 'note' | 'resource') => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    let cardHtml = '';
    const tags = (data.tags as string).split(',').map(tag => `<span class="tag">${tag.trim()}</span>`).join('');

    if (type === 'lecture') {
        const youtubeId = (data.youtubeLink as string).split('v=')[1]?.split('&')[0] || '';
        const notesSection = data.notesLink 
            ? `<a href="${data.notesLink}" target="_blank" class="notes-button">View Notes</a>` 
            : `<p class="notes">NOTES WILL PROVIDED SOON</p>`;
        cardHtml = `
<div class="lecture-card">
  <img src="https://img.youtube.com/vi/${youtubeId}/0.jpg" alt="${data.title}" class="thumbnail">
  <div class="card-content">
    <h3 class="title">${data.title}</h3>
    <div class="tags">${tags}</div>
    ${notesSection}
    <a href="https://www.youtube.com/watch?v=${youtubeId}" target="_blank" class="button">Watch on YouTube</a>
  </div>
</div>`;
    } else if (type === 'note') {
        cardHtml = `
<div class="note-card">
  <div class="card-content">
    <h3 class="title">${data.title}</h3>
    <div class="tags">${tags}</div>
    <a href="${data.notesLink}" target="_blank" class="button">Download Notes</a>
  </div>
</div>`;
    } else if (type === 'resource') {
        cardHtml = `
<div class="resource-card">
  <div class="card-content">
    <h3 class="title">${data.title}</h3>
    <div class="tags">${tags}</div>
    <a href="${data.resourceLink}" target="_blank" class="button">Open Resource</a>
  </div>
</div>`;
    }

    setGeneratedHtml(cardHtml);
    toast({
        title: "HTML Generated!",
        description: "You can now copy the HTML below.",
    })
  };

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <Card className="glassmorphism max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="font-headline text-3xl">Content Card Generators</CardTitle>
            <CardDescription>
              Select a content type and fill out the form to generate the HTML for a new card.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="lecture" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="lecture">Lecture</TabsTrigger>
                <TabsTrigger value="note">Note</TabsTrigger>
                <TabsTrigger value="resource">Resource</TabsTrigger>
              </TabsList>
              
              {/* Lecture Generator */}
              <TabsContent value="lecture">
                <form className="space-y-6 mt-6" onSubmit={(e) => handleGenerate(e, 'lecture')}>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="lec-exam">Exam</Label>
                            <Select name="exam" required>
                                <SelectTrigger id="lec-exam" className="bg-transparent"><SelectValue placeholder="Select exam" /></SelectTrigger>
                                <SelectContent><SelectItem value="jee">JEE</SelectItem><SelectItem value="neet">NEET</SelectItem><SelectItem value="both">Both</SelectItem></SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lec-subject">Subject</Label>
                            <Select name="subject" required>
                                <SelectTrigger id="lec-subject" className="bg-transparent"><SelectValue placeholder="Select subject" /></SelectTrigger>
                                <SelectContent><SelectItem value="physics">Physics</SelectItem><SelectItem value="chemistry">Chemistry</SelectItem><SelectItem value="maths">Maths</SelectItem><SelectItem value="biology">Biology</SelectItem></SelectContent>
                            </Select>
                        </div>
                    </div>
                  <div className="space-y-2">
                    <Label htmlFor="lec-title">Lecture Title</Label>
                    <Input id="lec-title" name="title" placeholder="e.g., Vectors One Shot" className="bg-transparent" required/>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lec-youtube">YouTube Video Link</Label>
                    <Input id="lec-youtube" name="youtubeLink" placeholder="e.g., https://www.youtube.com/watch?v=cS64-wAFDuI" className="bg-transparent" required/>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lec-notes">Notes Link (Optional)</Label>
                    <Input id="lec-notes" name="notesLink" placeholder="e.g., https://example.com/notes.pdf" className="bg-transparent"/>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lec-tags">Tags</Label>
                    <Input id="lec-tags" name="tags" placeholder="e.g., ONESHOT, PYQs, THEORY" className="bg-transparent" required/>
                    <p className="text-xs text-muted-foreground">Enter tags separated by commas.</p>
                  </div>
                  <Button type="submit" className="w-full rounded-xl">Generate Lecture Card HTML</Button>
                </form>
              </TabsContent>

              {/* Note Generator */}
              <TabsContent value="note">
                <form className="space-y-6 mt-6" onSubmit={(e) => handleGenerate(e, 'note')}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="note-exam">Exam</Label>
                            <Select name="exam" required>
                                <SelectTrigger id="note-exam" className="bg-transparent"><SelectValue placeholder="Select exam" /></SelectTrigger>
                                <SelectContent><SelectItem value="jee">JEE</SelectItem><SelectItem value="neet">NEET</SelectItem><SelectItem value="both">Both</SelectItem></SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="note-subject">Subject</Label>
                            <Select name="subject" required>
                                <SelectTrigger id="note-subject" className="bg-transparent"><SelectValue placeholder="Select subject" /></SelectTrigger>
                                <SelectContent><SelectItem value="physics">Physics</SelectItem><SelectItem value="chemistry">Chemistry</SelectItem><SelectItem value="maths">Maths</SelectItem><SelectItem value="biology">Biology</SelectItem></SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="note-title">Notes Title</Label>
                        <Input id="note-title" name="title" placeholder="e.g., Complete Physics Formula Sheet" className="bg-transparent" required/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="note-link">Notes Link (PDF/Drive)</Label>
                        <Input id="note-link" name="notesLink" placeholder="e.g., https://example.com/notes.pdf" className="bg-transparent" required/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="note-tags">Tags</Label>
                        <Input id="note-tags" name="tags" placeholder="e.g., Formula Sheet, Handwritten" className="bg-transparent" required/>
                         <p className="text-xs text-muted-foreground">Enter tags separated by commas.</p>
                    </div>
                    <Button type="submit" className="w-full rounded-xl">Generate Note Card HTML</Button>
                </form>
              </TabsContent>

              {/* Resource Generator */}
              <TabsContent value="resource">
                <form className="space-y-6 mt-6" onSubmit={(e) => handleGenerate(e, 'resource')}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="res-exam">Exam</Label>
                            <Select name="exam" required>
                                <SelectTrigger id="res-exam" className="bg-transparent"><SelectValue placeholder="Select exam" /></SelectTrigger>
                                <SelectContent><SelectItem value="jee">JEE</SelectItem><SelectItem value="neet">NEET</SelectItem><SelectItem value="both">Both</SelectItem></SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="res-subject">Subject</Label>
                            <Select name="subject" required>
                                <SelectTrigger id="res-subject" className="bg-transparent"><SelectValue placeholder="Select subject" /></SelectTrigger>
                                <SelectContent><SelectItem value="physics">Physics</SelectItem><SelectItem value="chemistry">Chemistry</SelectItem><SelectItem value="maths">Maths</SelectItem><SelectItem value="biology">Biology</SelectItem></SelectContent>
                            </Select>
                        </div>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="res-title">Resource Title</Label>
                        <Input id="res-title" name="title" placeholder="e.g., NCERT Based Question Bank" className="bg-transparent" required/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="res-link">Resource Link</Label>
                        <Input id="res-link" name="resourceLink" placeholder="e.g., https://example.com/resource" className="bg-transparent" required/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="res-tags">Tags</Label>
                        <Input id="res-tags" name="tags" placeholder="e.g., Question Bank, Rank Booster" className="bg-transparent" required/>
                         <p className="text-xs text-muted-foreground">Enter tags separated by commas.</p>
                    </div>
                    <Button type="submit" className="w-full rounded-xl">Generate Resource Card HTML</Button>
                </form>
              </TabsContent>
            </Tabs>

            {generatedHtml && (
                <div className="mt-8">
                    <Label htmlFor="generated-html" className="text-lg">Generated HTML</Label>
                    <Textarea 
                        id="generated-html"
                        readOnly
                        value={generatedHtml}
                        className="bg-muted mt-2 min-h-[200px] font-code text-sm"
                        onClick={(e) => {
                            (e.target as HTMLTextAreaElement).select();
                            navigator.clipboard.writeText(generatedHtml);
                            toast({
                                title: "Copied to Clipboard!",
                            })
                        }}
                    />
                    <p className="text-xs text-muted-foreground mt-2">Click the text area to copy the HTML. Provide it to the AI to add it to the site.</p>
                </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
