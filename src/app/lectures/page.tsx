'use client';
import { useState, useEffect } from 'react';
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { List, LayoutGrid, Inbox, Loader2 } from "lucide-react";
import Image from "next/image";
import type { Post } from '@/lib/types';
import { getLectures } from './actions';
import Link from 'next/link';

export default function LecturesPage() {
  const [lectures, setLectures] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLectures = async () => {
      setLoading(true);
      const fetchedLectures = await getLectures();
      setLectures(fetchedLectures);
      setLoading(false);
    };
    fetchLectures();
  }, []);

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="font-headline text-4xl md:text-5xl font-bold bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">
            Video Lectures
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Learn from the best educators, anytime, anywhere.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <Input placeholder="Search lectures..." className="bg-transparent" />
          <Select>
            <SelectTrigger className="w-full md:w-[180px] bg-transparent">
              <SelectValue placeholder="Filter by subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="physics">Physics</SelectItem>
              <SelectItem value="chemistry">Chemistry</SelectItem>
              <SelectItem value="maths">Maths</SelectItem>
              <SelectItem value="biology">Biology</SelectItem>
            </SelectContent>
          </Select>
           <Select>
            <SelectTrigger className="w-full md:w-[180px] bg-transparent">
              <SelectValue placeholder="Filter by chapter" />
            </SelectTrigger>
            <SelectContent>
              {/* This should be dynamically populated */}
            </SelectContent>
          </Select>
          <div className="flex items-center gap-2 ml-auto">
             <Button variant="outline" size="icon" className="bg-transparent"><List className="w-5 h-5"/></Button>
             <Button variant="outline" size="icon" className="bg-transparent"><LayoutGrid className="w-5 h-5"/></Button>
          </div>
        </div>
        
        {loading ? (
            <div className="flex justify-center items-center h-40">
                <Loader2 className="w-8 h-8 animate-spin" />
            </div>
        ) : lectures.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lectures.map((lecture) => (
              <Card key={lecture.id} className="glassmorphism overflow-hidden hover:border-primary/50 transition-all duration-300">
                  <CardContent className="p-0">
                    <Link href={`/lectures/${lecture.id}`} className="block h-48 overflow-hidden">
                        <Image
                          src={lecture.thumbnailUrl || "https://placehold.co/600x400.png"}
                          alt={lecture.title}
                          width={600}
                          height={400}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          data-ai-hint="lecture thumbnail"
                        />
                    </Link>
                    <div className="p-6">
                      <Badge variant="secondary" className="mb-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white">{lecture.subject}</Badge>
                      <h3 className="font-headline text-lg font-semibold h-12 overflow-hidden">{lecture.title}</h3>
                      <p className="text-muted-foreground text-sm mt-1 h-5 overflow-hidden">{lecture.chapter}</p>
                       <Button className="w-full mt-4 rounded-xl" asChild>
                        <Link href={`/lectures/${lecture.id}`}>Watch Now</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
            ))}
          </div>
        ) : (
          <Card className="glassmorphism col-span-1 md:col-span-2 lg:col-span-3">
            <CardContent className="p-10">
              <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                <Inbox className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-headline mb-1">No Lectures Available</h3>
                <p>New lectures will be added soon. Please check back later.</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
}
