
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

interface ResourceData {
  title: string;
  type: 'Book' | 'PYQs' | 'Formula Sheet' | 'Other';
  subject: 'Physics' | 'Chemistry' | 'Maths' | 'Biology' | 'General';
  description: string;
  fileUrl: string;
}

function generateResourceHTML(data: ResourceData) {
    return `
<div class="resource-card">
  <div class="card-content">
    <span class="type-badge">${data.type}</span>
    <h3 class="title">${data.title}</h3>
    <p class="subject">${data.subject}</p>
    <p class="description">${data.description}</p>
    <a href="${data.fileUrl}" target="_blank" class="button">Download Resource</a>
  </div>
</div>

<style>
  .resource-card {
    background-color: #1e1e1e;
    color: white;
    font-family: sans-serif;
    border-radius: 12px;
    border-left: 4px solid #6E00FF;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    overflow: hidden;
    width: 320px;
    padding: 20px;
    transition: transform 0.2s;
  }
  .resource-card:hover {
    transform: translateY(-5px);
  }
  .type-badge {
    background-color: #6E00FF;
    color: white;
    padding: 4px 10px;
    border-radius: 16px;
    font-size: 0.8rem;
    font-weight: bold;
    display: inline-block;
    margin-bottom: 12px;
  }
  .title {
    font-size: 1.25rem;
    font-weight: bold;
    margin: 0 0 4px 0;
  }
  .subject {
    font-size: 0.9rem;
    color: #ccc;
    margin-bottom: 12px;
  }
  .description {
    font-size: 0.9rem;
    color: #aaa;
    margin-bottom: 16px;
    min-height: 40px;
  }
  .button {
    display: block;
    width: 100%;
    text-align: center;
    background-color: #333;
    color: white;
    padding: 12px;
    border-radius: 8px;
    text-decoration: none;
    font-weight: bold;
  }
</style>
`;
}


export default function ResourcesGeneratorForm() {
    const { toast } = useToast();
    const [formData, setFormData] = useState({
        title: 'Resource Title',
        type: 'Book' as 'Book' | 'PYQs' | 'Formula Sheet' | 'Other',
        subject: 'Physics' as 'Physics' | 'Chemistry' | 'Maths' | 'Biology' | 'General',
        description: 'A helpful resource for your preparation.',
        fileUrl: 'https://example.com/resource.pdf',
    });
    const [resourceHTML, setResourceHTML] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSelectChange = (id: 'type' | 'subject') => (value: string) => {
        setFormData(prev => ({ ...prev, [id]: value as any }));
    };

    const handlePreview = (e: React.FormEvent) => {
        e.preventDefault();
        const newResourceHTML = generateResourceHTML(formData);
        setResourceHTML(newResourceHTML);
    };

    const copyToClipboard = () => {
        if (!resourceHTML) return;
        navigator.clipboard.writeText(resourceHTML);
        toast({ title: 'Copied!', description: 'HTML code copied to clipboard.' });
    };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="glassmorphism">
            <CardHeader>
            <CardTitle>Resource Generator</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handlePreview} className="space-y-4">
                     <div className="space-y-2">
                        <Label htmlFor="title">Resource Title</Label>
                        <Input id="title" value={formData.title} onChange={handleInputChange} className="bg-transparent" />
                    </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Type</Label>
                            <Select value={formData.type} onValueChange={handleSelectChange('type')}>
                                <SelectTrigger className="bg-transparent"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Book">Book</SelectItem>
                                    <SelectItem value="PYQs">PYQs</SelectItem>
                                    <SelectItem value="Formula Sheet">Formula Sheet</SelectItem>
                                    <SelectItem value="Other">Other</SelectItem>
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
                                    <SelectItem value="General">General</SelectItem>
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
                        <Input id="fileUrl" value={formData.fileUrl} onChange={handleInputChange} placeholder="https://example.com/resource.pdf" className="bg-transparent" />
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
                        <Button variant="ghost" size="icon" onClick={copyToClipboard} disabled={!resourceHTML}><Copy className="w-5 h-5"/></Button>
                    </CardTitle>
                </CardHeader>
                 <CardContent>
                    {resourceHTML ? (
                        <div dangerouslySetInnerHTML={{ __html: resourceHTML.replace('<style>', '<style scoped>') }} />
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
                         <Button variant="ghost" size="icon" onClick={copyToClipboard} disabled={!resourceHTML}><Copy className="w-5 h-5"/></Button>
                    </CardTitle>
                </CardHeader>
                 <CardContent>
                    <pre className="p-4 rounded-lg bg-muted/50 overflow-x-auto text-sm">
                        <code>
                            {resourceHTML || 'Generate a preview to see the code.'}
                        </code>
                    </pre>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
