import UserList from "./UserList";

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
       <h1 className="text-3xl font-bold font-headline">User Management</h1>
       <p className="text-muted-foreground">
        View and monitor user activity across the platform.
      </p>
       <UserList />
    </div>
  );
}
