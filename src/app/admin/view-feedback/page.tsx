
'use client';
import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { summarizeFeedback } from "@/ai/flows/summarize-feedback";
import { Loader2, Trash2, Wand2 } from "lucide-react";
import { getFeedback, deleteFeedback } from "@/lib/actions/feedback.actions";
import type { Feedback } from "@/lib/types";

export default function ViewFeedbackPage() {
  const { toast } = useToast();
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    setIsFetching(true);
    try {
      const fetchedFeedback = await getFeedback();
      setFeedback(fetchedFeedback);
    } catch (error) {
      toast({ variant: "destructive", title: "Failed to fetch feedback." });
    } finally {
      setIsFetching(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
        await deleteFeedback(id);
        toast({ title: "Feedback deleted successfully."})
        fetchFeedback();
    } catch (error) {
        toast({ variant: "destructive", title: "Failed to delete feedback."})
    }
  }

  const handleSummarize = async () => {
    if (feedback.length === 0) {
        toast({
            variant: "destructive",
            title: "No feedback to summarize",
        });
        return;
    }
    
    setIsLoading(true);
    setSummary('');

    try {
        const feedbackItems = feedback.map(f => `Subject: ${f.subject}\nFeedback: ${f.feedback}`);
        const result = await summarizeFeedback({ feedback: feedbackItems });
        setSummary(result.summary);
    } catch (error) {
        console.error("Error summarizing feedback:", error);
        toast({
            variant: "destructive",
            title: "Summarization Failed",
            description: "Could not summarize the feedback. Please try again.",
        });
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <Card className="glassmorphism max-w-6xl mx-auto">
          <CardHeader>
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <CardTitle className="font-headline text-3xl">User Feedback Inbox</CardTitle>
                    <CardDescription>
                    Here is the latest feedback submitted by users.
                    </CardDescription>
                </div>
                 <Button onClick={handleSummarize} disabled={isLoading || feedback.length === 0}>
                    {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Summarizing...</> : <><Wand2 className="mr-2 h-4 w-4"/>Summarize with AI</>}
                </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {isFetching ? (
                <div className="flex items-center justify-center p-8"><Loader2 className="h-8 w-8 animate-spin"/></div>
            ) : feedback.length > 0 ? (
                <div className="space-y-4">
                    {feedback.map(item => (
                         <Card key={item.id} className="bg-muted/50">
                            <CardContent className="p-4 flex items-start justify-between">
                                <div className="space-y-1">
                                    <CardTitle className="text-base font-bold">{item.subject}</CardTitle>
                                    <p className="text-sm text-muted-foreground">{item.feedback}</p>
                                    <p className="text-xs text-muted-foreground pt-1">{new Date(item.createdAt).toLocaleString()}</p>
                                </div>
                                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => handleDelete(item.id)}>
                                    <Trash2 className="w-4 h-4"/>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                 <p className="text-center text-muted-foreground p-8">No feedback submitted yet.</p>
            )}
            
            {summary && (
                <div className="mt-8">
                    <Label htmlFor="summary-output" className="text-lg">AI Summary</Label>
                    <Card className="bg-muted mt-2">
                        <CardContent className="p-6">
                           <div className="prose prose-invert max-w-none">
                                {summary.split('\n').map((line, index) => {
                                    if (line.startsWith('###')) {
                                        return <h3 key={index} className="font-headline text-xl !mb-2 !mt-4">{line.replace('###', '')}</h3>
                                    }
                                     if (line.startsWith('**')) {
                                        return <p key={index} className="font-bold">{line.replace(/\*\*/g, '')}</p>
                                    }
                                    if (line.startsWith('- ')) {
                                        return <li key={index}>{line.substring(2)}</li>
                                    }
                                    return <p key={index}>{line}</p>
                                })}
                           </div>
                        </CardContent>
                    </Card>
                </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
