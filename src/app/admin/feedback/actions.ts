'use server';

import { summarizeFeedback } from '@/ai/flows/summarize-feedback';
import { userFeedback } from '@/lib/mock-data';

export async function getFeedbackSummary() {
  if (userFeedback.length === 0) {
    return { summary: 'No feedback to summarize.', error: null };
  }
  const feedbackStrings = userFeedback.map(f => f.feedback);
  try {
    const result = await summarizeFeedback({ feedback: feedbackStrings });
    return { summary: result.summary, error: null };
  } catch (e: any) {
    console.error('Error summarizing feedback:', e);
    return { summary: null, error: 'Failed to summarize feedback. Please try again.' };
  }
}
