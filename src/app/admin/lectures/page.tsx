import LectureList from './LectureList';

export default function ManageLecturesPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold font-headline">Manage Lectures</h1>
        <p className="text-muted-foreground">
          View, edit, or delete existing lecture posts.
        </p>
      </div>
      <LectureList />
    </div>
  );
}
