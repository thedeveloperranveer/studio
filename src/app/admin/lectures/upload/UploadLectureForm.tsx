'use client';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { uploadLecture } from './actions';
import { Loader2, UploadCloud, X, Youtube, Link as LinkIcon } from 'lucide-react';

const lectureSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  exam: z.enum(['JEE', 'NEET', 'BOTH']),
  subject: z.enum(['Physics', 'Chemistry', 'Maths', 'Biology']),
  chapter: z.string().optional(),
  tags: z.array(z.string()).min(1, 'At least one tag is required'),
  youtubeUrl: z.string().url('Please enter a valid YouTube URL.'),
  notes: z.string().url('Please enter a valid URL.').optional().or(z.literal('')),
  notify: z.boolean(),
});

type LectureFormValues = z.infer<typeof lectureSchema>;

const allTags = ['PYQ', 'OneShot', 'Full Chapter', 'Important', 'NCERT', '2025', '11th', '12th'];

export default function UploadLectureForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [tagInput, setTagInput] = useState('');

  const form = useForm<LectureFormValues>({
    resolver: zodResolver(lectureSchema),
    defaultValues: {
      title: '',
      description: '',
      exam: 'BOTH',
      subject: 'Physics',
      chapter: '',
      tags: [],
      youtubeUrl: '',
      notes: '',
      notify: true,
    },
  });

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (!form.getValues('tags').includes(newTag)) {
        form.setValue('tags', [...form.getValues('tags'), newTag]);
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    form.setValue('tags', form.getValues('tags').filter(tag => tag !== tagToRemove));
  };
  
  const onSubmit = async (data: LectureFormValues) => {
    setIsLoading(true);

    const result = await uploadLecture(data);
        
    setIsLoading(false);
    
    if(result.success){
        toast({ title: 'Success', description: result.message });
        form.reset();
    } else {
        toast({ variant: 'destructive', title: 'Error', description: result.message });
    }
  };

  return (
    <Card className="glassmorphism">
      <CardHeader>
        <CardTitle>Create Lecture Post</CardTitle>
        <CardDescription>
          Provide the lecture details and a YouTube link to create a new lecture post.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Lecture Title</Label>
              <Input id="title" {...form.register('title')} className="bg-transparent" />
              {form.formState.errors.title && <p className="text-destructive text-sm">{form.formState.errors.title.message}</p>}
            </div>
             <div className="space-y-2">
              <Label htmlFor="chapter">Chapter Name (optional)</Label>
              <Input id="chapter" {...form.register('chapter')} className="bg-transparent" />
              {form.formState.errors.chapter && <p className="text-destructive text-sm">{form.formState.errors.chapter.message}</p>}
            </div>
          </div>
           <div className="space-y-2">
                <Label htmlFor="description">Description (optional)</Label>
                <Textarea id="description" {...form.register('description')} rows={4} className="bg-transparent" />
                {form.formState.errors.description && <p className="text-destructive text-sm">{form.formState.errors.description.message}</p>}
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label>Exam Type</Label>
                     <Controller
                        name="exam"
                        control={form.control}
                        render={({ field }) => (
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger className="bg-transparent"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="JEE">JEE</SelectItem>
                                    <SelectItem value="NEET">NEET</SelectItem>
                                    <SelectItem value="BOTH">BOTH</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />
                </div>
                <div className="space-y-2">
                    <Label>Subject</Label>
                     <Controller
                        name="subject"
                        control={form.control}
                        render={({ field }) => (
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger className="bg-transparent"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Physics">Physics</SelectItem>
                                    <SelectItem value="Chemistry">Chemistry</SelectItem>
                                    <SelectItem value="Maths">Maths</SelectItem>
                                    <SelectItem value="Biology">Biology</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />
                </div>
           </div>
            <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <div className="flex flex-wrap gap-2 p-2 border rounded-xl bg-transparent min-h-12">
                    {form.watch('tags').map(tag => (
                        <div key={tag} className="flex items-center gap-1 bg-primary/20 text-primary-foreground px-2 py-1 rounded-md text-sm">
                            {tag}
                            <button type="button" onClick={() => removeTag(tag)}><X className="h-4 w-4"/></button>
                        </div>
                    ))}
                    <Input 
                        id="tags"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={handleTagKeyDown}
                        placeholder="Add tags and press Enter"
                        className="bg-transparent border-none flex-1 focus-visible:ring-0 focus-visible:ring-offset-0" 
                        list="tag-suggestions"
                    />
                    <datalist id="tag-suggestions">
                        {allTags.filter(t => !form.getValues('tags').includes(t)).map(t => <option key={t} value={t} />)}
                    </datalist>
                </div>
                {form.formState.errors.tags && <p className="text-destructive text-sm">{form.formState.errors.tags.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="youtubeUrl">YouTube Video URL</Label>
              <div className="flex items-center gap-2">
                <Youtube className="text-red-500"/>
                <Input id="youtubeUrl" {...form.register('youtubeUrl')} className="bg-transparent" placeholder="https://www.youtube.com/watch?v=..." />
              </div>
              {form.formState.errors.youtubeUrl && <p className="text-destructive text-sm">{form.formState.errors.youtubeUrl.message}</p>}
            </div>
            
             <div className="space-y-2">
              <Label htmlFor="notes">Notes Link (optional)</Label>
              <div className="flex items-center gap-2">
                <LinkIcon />
                <Input id="notes" {...form.register('notes')} className="bg-transparent" placeholder="https://example.com/notes.pdf" />
              </div>
              {form.formState.errors.notes && <p className="text-destructive text-sm">{form.formState.errors.notes.message}</p>}
            </div>

             <div className="flex items-center justify-between pt-6 border-t border-border">
                <div className="flex items-center space-x-2">
                     <Controller
                        name="notify"
                        control={form.control}
                        render={({ field }) => <Switch id="notify" checked={field.value} onCheckedChange={field.onChange} />}
                    />
                    <Label htmlFor="notify">Send Notification to Students</Label>
                </div>
                <Button type="submit" className="gradient-button rounded-xl" disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UploadCloud className="mr-2 h-4 w-4" />}
                    {isLoading ? 'Creating Post...' : 'Create Post'}
                </Button>
             </div>
        </form>
      </CardContent>
    </Card>
  );
}
