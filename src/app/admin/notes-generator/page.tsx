
import NotesGeneratorForm from './NotesGeneratorForm';

export default function NotesGeneratorPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold font-headline">Notes Card Generator</h1>
        <p className="text-muted-foreground">
          Quickly generate HTML for a notes card. Fill the form to see a preview and copy the code.
        </p>
      </div>
      <NotesGeneratorForm />
    </div>
  );
}
