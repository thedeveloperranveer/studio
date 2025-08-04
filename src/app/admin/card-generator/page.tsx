import CardGeneratorForm from './CardGeneratorForm';

export default function CardGeneratorPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold font-headline">Lecture Card Generator</h1>
        <p className="text-muted-foreground">
          Quickly generate HTML for a lecture card. Fill the form to see a preview and copy the code.
        </p>
      </div>
      <CardGeneratorForm />
    </div>
  );
}
