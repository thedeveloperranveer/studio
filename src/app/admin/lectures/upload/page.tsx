
import UploadLectureForm from './UploadLectureForm';

export default function UploadLecturesPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold font-headline">Upload Lecture</h1>
        <p className="text-muted-foreground">
          Fill in the details to add a new lecture to the platform.
        </p>
      </div>
      <UploadLectureForm />
    </div>
  );
}
