'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { createUser } from '@/lib/actions/user.actions';

interface WelcomePromptProps {
  onWelcomeComplete: (name: string) => void;
}

export default function WelcomePrompt({ onWelcomeComplete }: WelcomePromptProps) {
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim() || isSubmitting) return;

    const trimmedName = name.trim();
    
    // Immediately store name and navigate
    localStorage.setItem('userName', trimmedName);
    onWelcomeComplete(trimmedName);
    
    // Create user in the background without waiting
    createUser(trimmedName).then(userId => {
      if (userId) {
        localStorage.setItem('userId', userId);
      }
    }).catch(error => {
      console.error("Failed to create user in background:", error);
      // Optional: show a non-blocking toast notification about the error
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <Card className="glassmorphism w-full max-w-md m-4 rounded-2xl shadow-[0_0_20px_rgba(0,198,255,0.3)]">
        <CardContent className="p-8 text-center">
          <h2 className="font-headline text-2xl font-bold mb-4">Welcome to StudyJEET</h2>
          <p className="text-muted-foreground mb-6">Enter your name to continue</p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              type="text"
              name="name"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="bg-transparent text-lg h-12 text-center focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:ring-offset-transparent ring-2 ring-transparent focus:ring-primary/50 transition-all"
              style={{
                boxShadow: '0 0 15px rgba(0, 198, 255, 0.2)',
              }}
            />
            <Button
              type="submit"
              disabled={!name.trim() || isSubmitting}
              className="h-12 text-lg rounded-xl font-bold text-white bg-gradient-to-r from-[#00C6FF] to-[#6E00FF] hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              Continue
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
