
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Copy, UploadCloud } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CardData {
  title: string;
  exam: 'JEE' | 'NEET' | 'BOTH';
  subject: 'Physics' | 'Chemistry' | 'Maths' | 'Biology';
  tags: string[];
  youtubeLink: string;
  notes: string;
  videoId: string | null;
}

const initialCardData: CardData = {
    title: 'Lecture Title',
    exam: 'JEE',
    subject: 'Physics',
    tags: ['Tag1', 'Tag2'],
    youtubeLink: '',
    notes: 'Lecture Notes: Will be provided soon',
    videoId: null,
};


function extractYouTubeID(url: string) {
    const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|live\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : null;
}

function generateCardHTML(data: CardData) {
    if (!data.videoId) return '';
    const thumbnail = `https://img.youtube.com/vi/${data.videoId}/0.jpg`;

    const tagsHTML = data.tags.map(tag => `<span class="tag">${tag}</span>`).join('\n          ');

    return `
<div class="lecture-card">
  <img src="${thumbnail}" alt="${data.title}" class="thumbnail">
  <div class="card-content">
    <h3 class="title">${data.title}</h3>
    <div class="tags">
          ${tagsHTML}
    </div>
    <p class="notes">${data.notes}</p>
    <a href="https://www.youtube.com/watch?v=${data.videoId}" target="_blank" class="button">Watch on YouTube</a>
  </div>
</div>

<style>
  .lecture-card {
    background-color: #1e1e1e;
    color: white;
    font-family: sans-serif;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    overflow: hidden;
    width: 320px;
    transition: transform 0.2s;
  }
  .lecture-card:hover {
    transform: translateY(-5px);
  }
  .thumbnail {
    width: 100%;
    height: 180px;
    object-fit: cover;
  }
  .card-content {
    padding: 16px;
  }
  .title {
    font-size: 1.25rem;
    font-weight: bold;
    margin: 0 0 8px 0;
  }
  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 12px;
  }
  .tag {
    background-color: #333;
    padding: 4px 10px;
    border-radius: 16px;
    font-size: 0.8rem;
  }
  .notes {
    font-size: 0.9rem;
    color: #ccc;
    margin-bottom: 16px;
  }
  .button {
    display: block;
    width: 100%;
    text-align: center;
    background: linear-gradient(to right, #00C6FF, #6E00FF);
    color: white;
    padding: 12px;
    border-radius: 8px;
    text-decoration: none;
    font-weight: bold;
  }
</style>
`;
}


export default function CardGeneratorForm() {
    const { toast } = useToast();
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: 'Quantum Physics Demystified',
        exam: 'JEE' as 'JEE' | 'NEET' | 'BOTH',
        subject: 'Physics' as 'Physics' | 'Chemistry' | 'Maths' | 'Biology',
        tags: 'PYQ, OneShot, Advanced',
        youtubeLink: 'https://www.youtube.com/watch?v=WDjcpSCI-uU',
        notes: 'Full chapter notes available in the description.',
    });
    const [cardData, setCardData] = useState<CardData | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSelectChange = (id: 'exam' | 'subject') => (value: string) => {
        setFormData(prev => ({ ...prev, [id]: value as any }));
    };

    const handlePreview = (e: React.FormEvent) => {
        e.preventDefault();
        const videoId = extractYouTubeID(formData.youtubeLink);
        if (!videoId) {
            toast({ variant: 'destructive', title: 'Invalid URL', description: 'Please enter a valid YouTube link.' });
            return;
        }
        const newCardData = {
            ...formData,
            tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
            videoId
        };
        setCardData(newCardData);
    };

    const copyToClipboard = () => {
        if (!cardData) return;
        const code = generateCardHTML(cardData);
        navigator.clipboard.writeText(code);
        toast({ title: 'Copied!', description: 'HTML code copied to clipboard.' });
    };
    
    const cardHTML = cardData ? generateCardHTML(cardData) : '';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="glassmorphism">
            <CardHeader>
            <CardTitle>Card Generator</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handlePreview} className="space-y-4">
                     <div className="space-y-2">
                        <Label htmlFor="title">Lecture Title</Label>
                        <Input id="title" value={formData.title} onChange={handleInputChange} placeholder="e.g. Modern Physics in One Shot" className="bg-transparent" />
                    </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Exam</Label>
                            <Select value={formData.exam} onValueChange={handleSelectChange('exam')}>
                                <SelectTrigger className="bg-transparent"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="JEE">JEE</SelectItem>
                                    <SelectItem value="NEET">NEET</SelectItem>
                                    <SelectItem value="BOTH">BOTH</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                         <div className="space-y-2">
                            <Label>Subject</Label>
                             <Select value={formData.subject} onValueChange={handleSelectChange('subject')}>
                                <SelectTrigger className="bg-transparent"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Physics">Physics</SelectItem>
                                    <SelectItem value="Chemistry">Chemistry</SelectItem>
                                    <SelectItem value="Maths">Maths</SelectItem>
                                    <SelectItem value="Biology">Biology</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="tags">Tags (comma-separated)</Label>
                        <Input id="tags" value={formData.tags} onChange={handleInputChange} placeholder="e.g. PYQ, OneShot, Advanced" className="bg-transparent" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="youtubeLink">YouTube Link</Label>
                        <Input id="youtubeLink" value={formData.youtubeLink} onChange={handleInputChange} placeholder="e.g. https://www.youtube.com/watch?v=..." className="bg-transparent" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="notes">Notes Text</Label>
                        <Textarea id="notes" value={formData.notes} onChange={handleInputChange} placeholder="e.g. Full chapter notes available in description." className="bg-transparent" />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <Button type="submit" className="w-full">Generate Preview</Button>
                    </div>
                </form>
            </CardContent>
        </Card>

        <div className="space-y-6">
            <Card className="glassmorphism">
                <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                        <span>Live Preview</span>
                        <Button variant="ghost" size="icon" onClick={copyToClipboard} disabled={!cardData}><Copy className="w-5 h-5"/></Button>
                    </CardTitle>
                </CardHeader>
                 <CardContent>
                    {cardData?.videoId ? (
                        <div dangerouslySetInnerHTML={{ __html: cardHTML.replace('<style>', '<style scoped>') }} />
                    ) : (
                         <div className="flex items-center justify-center h-48 text-muted-foreground">
                            Generate a preview to see it here.
                         </div>
                    )}
                </CardContent>
            </Card>
             <Card className="glassmorphism">
                <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                        <span>HTML Code</span>
                         <Button variant="ghost" size="icon" onClick={copyToClipboard} disabled={!cardData}><Copy className="w-5 h-5"/></Button>
                    </CardTitle>
                </CardHeader>
                 <CardContent>
                    <pre className="p-4 rounded-lg bg-muted/50 overflow-x-auto text-sm">
                        <code>
                            {cardHTML || 'Generate a preview to see the code.'}
                        </code>
                    </pre>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
