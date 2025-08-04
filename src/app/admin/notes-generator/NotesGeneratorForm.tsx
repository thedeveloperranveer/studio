
'use client';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface NoteData {
  title: string;
  exam: 'JEE' | 'NEET' | 'BOTH';
  subject: 'Physics' | 'Chemistry' | 'Maths' | 'Biology';
  description: string;
  fileUrl: string;
}

function generateNoteHTML(data: NoteData) {
    return `
<div class="note-card">
  <div class="card-content">
    <h3 class="title">${data.title}</h3>
    <p class="subject">${data.exam} - ${data.subject}</p>
    <p class="description">${data.description}</p>
    <a href="${data.fileUrl}" target="_blank" class="button">Download Notes</a>
  </div>
</div>

<style>
  .note-card {
    background-color: #1a1a1a;
    color: white;
    font-family: sans-serif;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    width: 320px;
    padding: 20px;
    transition: transform 0.2s;
  }
  .note-card:hover {
    transform: translateY(-5px);
  }
  .title {
    font-size: 1.15rem;
    font-weight: bold;
    margin: 0 0 8px 0;
  }
  .subject {
    font-size: 0.9rem;
    color: #00c6ff;
    margin-bottom: 12px;
    font-weight: 500;
  }
  .description {
    font-size: 0.9rem;
    color: #ccc;
    margin-bottom: 16px;
    min-height: 40px;
  }
  .button {
    display: block;
    width: 100%;
    text-align: center;
    background: linear-gradient(to right, #00C6FF, #6E00FF);
    color: white;
    padding: 10px;
    border-radius: 8px;
    text-decoration: none;
    font-weight: bold;
  }
</style>
`;
}


export default function NotesGeneratorForm() {
    const { toast } = useToast();
    const [formData, setFormData] = useState({
        title: 'Chapter Notes Title',
        exam: 'JEE' as 'JEE' | 'NEET' | 'BOTH',
        subject: 'Physics' as 'Physics' | 'Chemistry' | 'Maths' | 'Biology',
        description: 'Comprehensive notes for the full chapter.',
        fileUrl: 'https://example.com/notes.pdf',
    });
    const [noteHTML, setNoteHTML] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSelectChange = (id: 'exam' | 'subject') => (value: string) => {
        setFormData(prev => ({ ...prev, [id]: value as any }));
    };

    const handlePreview = (e: React.FormEvent) => {
        e.preventDefault();
        const newNoteHTML = generateNoteHTML(formData);
        setNoteHTML(newNoteHTML);
    };

    const copyToClipboard = () => {
        if (!noteHTML) return;
        navigator.clipboard.writeText(noteHTML);
        toast({ title: 'Copied!', description: 'HTML code copied to clipboard.' });
    };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="glassmorphism">
            <CardHeader>
            <CardTitle>Notes Generator</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handlePreview} className="space-y-4">
                     <div className="space-y-2">
                        <Label htmlFor="title">Note Title</Label>
                        <Input id="title" value={formData.title} onChange={handleInputChange} className="bg-transparent" />
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
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" value={formData.description} onChange={handleInputChange} className="bg-transparent" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="fileUrl">File URL</Label>
                        <Input id="fileUrl" value={formData.fileUrl} onChange={handleInputChange} placeholder="https://example.com/notes.pdf" className="bg-transparent" />
                    </div>
                    <Button type="submit" className="w-full">Generate Preview</Button>
                </form>
            </CardContent>
        </Card>

        <div className="space-y-6">
            <Card className="glassmorphism">
                <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                        <span>Live Preview</span>
                        <Button variant="ghost" size="icon" onClick={copyToClipboard} disabled={!noteHTML}><Copy className="w-5 h-5"/></Button>
                    </CardTitle>
                </CardHeader>
                 <CardContent>
                    {noteHTML ? (
                        <div dangerouslySetInnerHTML={{ __html: noteHTML.replace('<style>', '<style scoped>') }} />
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
                         <Button variant="ghost" size="icon" onClick={copyToClipboard} disabled={!noteHTML}><Copy className="w-5 h-5"/></Button>
                    </CardTitle>
                </CardHeader>
                 <CardContent>
                    <pre className="p-4 rounded-lg bg-muted/50 overflow-x-auto text-sm">
                        <code>
                            {noteHTML || 'Generate a preview to see the code.'}
                        </code>
                    </pre>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
