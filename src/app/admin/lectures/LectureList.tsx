'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getLectures } from '@/app/lectures/actions';
import type { Post } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2, Inbox, Pencil, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function LectureList() {
  const [lectures, setLectures] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLectures = async () => {
      setLoading(true);
      const fetchedLectures = await getLectures(100); // Fetch more for admin view
      setLectures(fetchedLectures);
      setLoading(false);
    };
    fetchLectures();
  }, []);

  const handleDelete = (id: string) => {
    // Implement delete functionality here
    console.log(`Delete lecture with id: ${id}`);
    // You would typically call a server action to delete from Firestore
    // and then filter the local state:
    // setLectures(lectures.filter(l => l.id !== id));
  };

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      ) : lectures.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {lectures.map((lecture) => (
            <Card key={lecture.id} className="glassmorphism overflow-hidden group">
              <CardContent className="p-0">
                <a href={lecture.youtubeUrl} target="_blank" rel="noopener noreferrer" className="block h-48 overflow-hidden relative">
                  <Image
                    src={lecture.thumbnailUrl || "https://placehold.co/600x400.png"}
                    alt={lecture.title}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    data-ai-hint="lecture thumbnail"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all"></div>
                </a>
                <div className="p-4">
                  <div className="flex flex-wrap gap-1 mb-2">
                    <Badge variant="secondary" className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">{lecture.subject}</Badge>
                    <Badge variant="outline">{lecture.exam}</Badge>
                  </div>
                  <h3 className="font-headline text-md font-semibold h-12 overflow-hidden">{lecture.title}</h3>
                  <div className="flex gap-2 mt-4">
                     <Button variant="outline" size="sm" className="w-full bg-transparent">
                        <Pencil className="mr-2 h-4 w-4"/> Edit
                     </Button>
                     <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm" className="w-full">
                            <Trash2 className="mr-2 h-4 w-4"/> Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete this lecture post.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(lecture.id)}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="glassmorphism col-span-full">
          <CardContent className="p-10">
            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
              <Inbox className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-xl font-headline mb-1">No Lectures Found</h3>
              <p>You haven't uploaded any lectures yet. Go to "Upload Lectures" to get started.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
