
'use client';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import type { Post } from '@/lib/types';
import Header from '@/components/layout/Header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ExternalLink, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function LectureDetailPage() {
  const [lecture, setLecture] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const lectureId = params.id as string;

  useEffect(() => {
    if (!lectureId) return;

    const fetchLecture = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const docRef = doc(db, 'lectures', lectureId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setLecture({ id: docSnap.id, ...docSnap.data() } as Post);
        } else {
          setError('Lecture not found.');
        }

      } catch (err) {
        console.error("Error fetching document:", err);
        setError('Failed to fetch lecture data.');
      } finally {
        setLoading(false);
      }
    };

    fetchLecture();
  }, [lectureId]);

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
            <Button variant="outline" className="bg-transparent" asChild>
                <Link href="/lectures"><ArrowLeft className="mr-2 h-4 w-4"/> Back to Lectures</Link>
            </Button>
        </div>

        {loading && (
           <div className="flex justify-center items-center h-96">
                <Loader2 className="w-12 h-12 animate-spin text-primary"/>
           </div>
        )}
        
        {error && (
            <Card className="glassmorphism text-center">
                <CardContent className="p-8">
                    <h2 className="text-xl font-bold text-destructive">{error}</h2>
                    <p className="text-muted-foreground mt-2">The lecture you are looking for might have been moved or deleted.</p>
                </CardContent>
            </Card>
        )}

        {lecture && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                <div className="aspect-video w-full mb-6 rounded-2xl overflow-hidden glassmorphism">
                     {lecture.type === 'youtube' && lecture.videoUrl ? (
                        <iframe
                            className="w-full h-full"
                            src={lecture.videoUrl}
                            title={lecture.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                     ) : (
                        <div className="w-full h-full flex items-center justify-center bg-muted">
                            <p>Video player is not available.</p>
                        </div>
                     )}
                </div>
                <Button asChild>
                    <a href={lecture.youtubeUrl} target="_blank" rel="noopener noreferrer">
                        Watch on YouTube <ExternalLink className="ml-2 h-4 w-4"/>
                    </a>
                </Button>
            </div>
            <div className="lg:col-span-1">
                 <Card className="glassmorphism sticky top-24">
                    <CardHeader>
                        <Badge variant="secondary" className="w-fit mb-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white">{lecture.subject}</Badge>
                        <CardTitle className="font-headline text-2xl">{lecture.title}</CardTitle>
                        <CardDescription>{lecture.chapter}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground text-sm mb-4">{lecture.description}</p>
                         <div className="flex flex-wrap gap-2 mb-6">
                            {lecture.tags.map(tag => <Badge key={tag} variant="outline">{tag}</Badge>)}
                        </div>

                         {lecture.notes && (
                            <Button className="w-full gradient-button rounded-xl" asChild>
                                <a href={lecture.notes} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="mr-2 h-4 w-4"/>
                                Open Notes
                                </a>
                            </Button>
                         )}
                    </CardContent>
                 </Card>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
