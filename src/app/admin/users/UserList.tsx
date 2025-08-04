'use client';
import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { User } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Loader2, ChevronDown, ChevronUp, Inbox } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Timestamp } from 'firebase/firestore';

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedUserId, setExpandedUserId] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'users'), orderBy('joinDate', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const usersData: User[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        // Firebase Timestamps might take a moment to be set by the server.
        // We will create a User object and handle potential nulls in the JSX.
        const user: User = {
          id: doc.id,
          name: data.name || "Anonymous",
          joinDate: data.joinDate || null,
          lastActive: data.lastActive || null,
          activityLog: data.activityLog || [],
        };
        usersData.push(user);
      });
      setUsers(usersData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching users:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const isValidTimestamp = (timestamp: any): timestamp is Timestamp => {
    return timestamp && typeof timestamp.toDate === 'function';
  }

  if (loading) {
    return (
      <Card className="glassmorphism">
        <CardContent className="p-10">
            <div className="flex justify-center items-center h-40">
                <Loader2 className="w-8 h-8 animate-spin" />
            </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glassmorphism">
      <CardHeader>
        <CardTitle>All Users</CardTitle>
        <CardDescription>A list of all registered users and their latest activity.</CardDescription>
      </CardHeader>
      <CardContent>
        {users.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground py-10">
                <Inbox className="h-12 w-12 mb-2"/>
                <p>No users have signed up yet.</p>
            </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <>
                  <TableRow key={user.id} className="cursor-pointer" onClick={() => setExpandedUserId(expandedUserId === user.id ? null : user.id)}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{isValidTimestamp(user.joinDate) ? `${formatDistanceToNow(user.joinDate.toDate())} ago` : 'Pending...'}</TableCell>
                    <TableCell>{isValidTimestamp(user.lastActive) ? `${formatDistanceToNow(user.lastActive.toDate())} ago` : 'Pending...'}</TableCell>
                    <TableCell className="text-right">
                      {expandedUserId === user.id ? <ChevronUp /> : <ChevronDown />}
                    </TableCell>
                  </TableRow>
                  {expandedUserId === user.id && (
                    <TableRow>
                      <TableCell colSpan={4}>
                        <div className="p-4 bg-muted/30 rounded-lg">
                          <h4 className="font-bold mb-2">Activity Log</h4>
                          {user.activityLog && user.activityLog.length > 0 ? (
                            <ul className="space-y-2">
                              {user.activityLog.slice().reverse().map((activity, index) => (
                                <li key={index} className="flex items-center gap-3 text-sm">
                                  <Badge variant={
                                    activity.type === 'lecture_view' ? 'default' :
                                    activity.type === 'note_download' ? 'secondary' :
                                    activity.type === 'test_attempt' ? 'destructive' :
                                    'outline'
                                  }>{activity.type.replace('_', ' ')}</Badge>
                                  <span className="text-muted-foreground">
                                    {isValidTimestamp(activity.timestamp) ? `${formatDistanceToNow(activity.timestamp.toDate())} ago` : 'Pending...' }
                                  </span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-muted-foreground">No activity recorded yet.</p>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
