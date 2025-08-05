
'use client';

import Header from "@/components/layout/Header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Bookmark, History, Settings, Shield } from "lucide-react";
import { createFeedback } from "@/lib/actions/feedback.actions";

export default function ProfilePage() {
  const { toast } = useToast();

  const handleFeedbackSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const subject = formData.get('subject') as string;
    const feedback = formData.get('feedback') as string;

    if (!subject.trim() || !feedback.trim()) {
        toast({
            variant: "destructive",
            title: "Missing Fields",
            description: "Please fill out both subject and description.",
        });
        return;
    }

    try {
        await createFeedback({ subject, feedback });
        toast({
            title: "Feedback Submitted!",
            description: "Thank you for your feedback. The admin will review it soon.",
        });
        (e.target as HTMLFormElement).reset();
    } catch (error) {
         toast({
            variant: "destructive",
            title: "Submission Failed",
            description: "Could not submit your feedback. Please try again.",
        });
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center text-center mb-12">
          <Avatar className="w-24 h-24 mb-4 border-4 border-primary">
            <AvatarImage src="https://placehold.co/100x100" data-ai-hint="avatar placeholder" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <h1 className="font-headline text-4xl font-bold">User</h1>
          <p className="text-muted-foreground">user@example.com</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1 space-y-4">
                <Card className="glassmorphism">
                   <CardContent className="p-4">
                     <nav className="flex flex-col gap-1">
                        <Button variant="ghost" className="justify-start gap-3 rounded-lg"><Settings className="w-5 h-5"/> Account Settings</Button>
                        <Button variant="ghost" className="justify-start gap-3 rounded-lg"><Bookmark className="w-5 h-5"/> Saved Items</Button>
                        <Button variant="ghost" className="justify-start gap-3 rounded-lg"><History className="w-5 h-5"/> Watch History</Button>
                        <Button variant="ghost" className="justify-start gap-3 rounded-lg"><Shield className="w-5 h-5"/> Privacy & Security</Button>
                     </nav>
                   </CardContent>
                </Card>
                 <Card className="glassmorphism">
                    <CardHeader>
                        <CardTitle className="font-headline text-lg">Theme</CardTitle>
                    </CardHeader>
                   <CardContent className="flex items-center justify-between">
                     <Label htmlFor="dark-mode">Dark Mode</Label>
                     <Switch id="dark-mode" defaultChecked/>
                   </CardContent>
                </Card>
            </div>
            <div className="md:col-span-2">
                <Card className="glassmorphism">
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl">Report an Issue / Feedback</CardTitle>
                        <CardDescription>
                            We value your feedback. Let us know if you have any suggestions or encountered a problem.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="subject">Subject</Label>
                                <Input id="subject" name="subject" placeholder="e.g., Video player issue" className="bg-transparent" required />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="feedback">Description</Label>
                                <Textarea id="feedback" name="feedback" placeholder="Describe the issue or your feedback in detail." rows={5} className="bg-transparent" required/>
                            </div>
                            <Button type="submit" className="w-full rounded-xl">Submit Feedback</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
      </div>
    </>
  );
}
