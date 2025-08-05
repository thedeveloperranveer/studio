
'use client';
import { useState } from "react";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { summarizeFeedback } from "@/ai/flows/summarize-feedback";
import { Loader2 } from "lucide-react";

export default function ViewFeedbackPage() {
  const { toast } = useToast();
  const [feedbackInput, setFeedbackInput] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSummarize = async () => {
    if (!feedbackInput.trim()) {
        toast({
            variant: "destructive",
            title: "Input is empty",
            description: "Please paste the feedback you want to summarize.",
        });
        return;
    }
    
    setIsLoading(true);
    setSummary('');

    try {
        const feedbackItems = feedbackInput.split('\n').filter(line => line.trim() !== '');
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
        <Card className="glassmorphism max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="font-headline text-3xl">Feedback Summarizer</CardTitle>
            <CardDescription>
              Paste user feedback entries below (one per line) and the AI will categorize and summarize them for you.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
             <div>
                <Label htmlFor="feedback-input" className="text-lg">User Feedback</Label>
                <Textarea 
                    id="feedback-input"
                    value={feedbackInput}
                    onChange={(e) => setFeedbackInput(e.target.value)}
                    placeholder="Paste feedback here, one entry per line..."
                    className="bg-muted mt-2 min-h-[250px] font-code text-sm"
                />
             </div>

            <Button onClick={handleSummarize} disabled={isLoading} className="w-full rounded-xl">
                {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Summarizing...</> : 'Summarize Feedback'}
            </Button>
            
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
