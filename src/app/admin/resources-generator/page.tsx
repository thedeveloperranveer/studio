
import ResourcesGeneratorForm from './ResourcesGeneratorForm';

export default function ResourcesGeneratorPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold font-headline">Resources Card Generator</h1>
        <p className="text-muted-foreground">
          Quickly generate HTML for a resource card. Fill the form to see a preview and copy the code.
        </p>
      </div>
      <ResourcesGeneratorForm />
    </div>
  );
}
