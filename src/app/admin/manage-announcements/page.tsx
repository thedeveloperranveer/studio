
'use client';
import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { createAnnouncement, getAnnouncements, deleteAnnouncement } from "@/lib/actions/announcement.actions";
import { Loader2, Trash2 } from "lucide-react";
import type { Announcement } from "@/lib/types";

export default function ManageAnnouncementsPage() {
  const { toast } = useToast();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    setIsFetching(true);
    try {
      const fetchedAnnouncements = await getAnnouncements();
      setAnnouncements(fetchedAnnouncements);
    } catch (error) {
      toast({ variant: "destructive", title: "Failed to fetch announcements." });
    } finally {
      setIsFetching(false);
    }
  };
  
  const handleDelete = async (id: string) => {
    try {
        await deleteAnnouncement(id);
        toast({ title: "Announcement deleted successfully."})
        fetchAnnouncements();
    } catch (error) {
        toast({ variant: "destructive", title: "Failed to delete announcement."})
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    try {
      await createAnnouncement({
        title: data.title as string,
        description: data.description as string,
        audience: data.audience as 'All' | 'JEE' | 'NEET',
        tag: data.tag as 'Important' | 'Update' | 'Info',
      });
      toast({ title: "Announcement created successfully!" });
      (e.target as HTMLFormElement).reset();
      fetchAnnouncements();
    } catch (error) {
      toast({ variant: "destructive", title: "Failed to create announcement." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
             <Card className="glassmorphism">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Create Announcement</CardTitle>
                <CardDescription>
                  This will be pushed to users in real-time.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" name="title" placeholder="e.g., Exam Schedule Update" className="bg-transparent" required />
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="description">Message</Label>
                    <Textarea id="description" name="description" placeholder="Describe the announcement..." rows={3} className="bg-transparent" required/>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <Label htmlFor="audience">Audience</Label>
                        <Select name="audience" required defaultValue="All">
                            <SelectTrigger id="audience" className="bg-transparent"><SelectValue /></SelectTrigger>
                            <SelectContent><SelectItem value="All">All Users</SelectItem><SelectItem value="JEE">JEE</SelectItem><SelectItem value="NEET">NEET</SelectItem></SelectContent>
                        </Select>
                     </div>
                     <div className="space-y-2">
                        <Label htmlFor="tag">Tag</Label>
                        <Select name="tag" required defaultValue="Info">
                            <SelectTrigger id="tag" className="bg-transparent"><SelectValue/></SelectTrigger>
                            <SelectContent><SelectItem value="Important">Important</SelectItem><SelectItem value="Update">Update</SelectItem><SelectItem value="Info">Info</SelectItem></SelectContent>
                        </Select>
                     </div>
                  </div>
                  <Button type="submit" className="w-full rounded-xl" disabled={isLoading}>
                    {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Sending...</> : 'Send Announcement'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-2">
            <h2 className="font-headline text-2xl font-bold mb-4">Live Announcements</h2>
             <Card className="glassmorphism">
                <CardContent className="p-4">
                    {isFetching ? (
                        <div className="flex items-center justify-center p-8"><Loader2 className="h-8 w-8 animate-spin"/></div>
                    ) : announcements.length > 0 ? (
                       <div className="space-y-4">
                        {announcements.map(ann => (
                            <Card key={ann.id} className="bg-muted/50">
                                <CardContent className="p-4 flex items-start justify-between">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${ann.tag === 'Important' ? 'bg-red-500/80' : ann.tag === 'Update' ? 'bg-blue-500/80' : 'bg-gray-500/80'}`}>{ann.tag}</span>
                                            <p className="text-xs text-muted-foreground">To: {ann.audience}</p>
                                        </div>
                                        <CardTitle className="text-base font-bold">{ann.title}</CardTitle>
                                        <p className="text-sm text-muted-foreground">{ann.description}</p>
                                        <p className="text-xs text-muted-foreground pt-1">{new Date(ann.createdAt).toLocaleString()}</p>
                                    </div>
                                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => handleDelete(ann.id)}>
                                        <Trash2 className="w-4 h-4"/>
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                       </div>
                    ) : (
                        <p className="text-center text-muted-foreground p-8">No live announcements.</p>
                    )}
                </CardContent>
             </Card>
          </div>
        </div>
      </div>
    </>
  );
}
