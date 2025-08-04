'use client';
import { useState } from 'react';
import { Bot, Inbox, Loader2, MessageSquare, User } from 'lucide-react';

import { getFeedbackSummary } from './actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { userFeedback } from '@/lib/mock-data';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function FeedbackSummarizer() {
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSummarize = async () => {
    setIsLoading(true);
    setError(null);
    setSummary(null);
    const result = await getFeedbackSummary();
    setIsLoading(false);

    if (result.error) {
      setError(result.error);
    } else {
      setSummary(result.summary);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="glassmorphism">
        <CardHeader>
          <CardTitle>Raw Feedback</CardTitle>
          <CardDescription>A list of recent feedback from users.</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
              {userFeedback.length > 0 ? (
                userFeedback.map((fb) => (
                  <div key={fb.id} className="flex items-start gap-3">
                    <Avatar>
                      <AvatarFallback><User /></AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-sm">{fb.username} <span className="text-xs text-muted-foreground font-normal ml-2">{fb.date}</span></p>
                      <p className="text-sm text-muted-foreground">{fb.feedback}</p>
                    </div>
                  </div>
                ))
              ) : (
                 <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                    <Inbox className="h-12 w-12 mb-2"/>
                    <p>No user feedback submitted yet.</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
      <Card className="glassmorphism">
        <CardHeader>
          <CardTitle>AI-Powered Summary</CardTitle>
          <CardDescription>Click the button to generate a summary of all feedback.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleSummarize} disabled={isLoading || userFeedback.length === 0} className="w-full rounded-xl mb-4">
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Bot className="mr-2 h-4 w-4" />}
            {isLoading ? 'Summarizing...' : 'Summarize with AI'}
          </Button>
          
          <div className="mt-4 p-4 bg-muted/30 rounded-lg min-h-[300px] prose prose-sm prose-invert max-w-none">
            {isLoading && (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            )}
            {error && <p className="text-destructive">{error}</p>}
            {summary && <div dangerouslySetInnerHTML={{ __html: summary.replace(/\n/g, '<br />') }} />}
            {!isLoading && !error && !summary && (
              <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                <MessageSquare className="h-12 w-12 mb-2"/>
                <p>The summary will appear here once generated.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
