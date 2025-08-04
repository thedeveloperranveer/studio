import FeedbackSummarizer from './FeedbackSummarizer';

export default function AdminFeedbackPage() {
  return (
    <div className="space-y-6">
       <h1 className="text-3xl font-bold font-headline">User Feedback</h1>
       <p className="text-muted-foreground">
        View and analyze feedback submitted by users. Use the AI summarizer to get key insights.
      </p>
       <FeedbackSummarizer />
    </div>
  );
}
