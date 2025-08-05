
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Bell, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function AdminDashboardPage() {
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-headline text-4xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Admin. Manage your content from here.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="glassmorphism hover:border-primary/50 transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="font-headline text-lg">Add New Content</CardTitle>
                    <PlusCircle className="w-6 h-6 text-primary"/>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground mb-4">Add new lectures, notes, or resources to the website.</p>
                    <Button className="w-full rounded-xl" asChild>
                        <Link href="/admin/add-content">Go to Generator</Link>
                    </Button>
                </CardContent>
            </Card>

             <Card className="glassmorphism hover:border-primary/50 transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="font-headline text-lg">Manage Announcements</CardTitle>
                    <Bell className="w-6 h-6 text-primary"/>
                </CardHeader>
                <CardContent>
                     <p className="text-muted-foreground mb-4">Create or remove announcements for all users.</p>
                     <Button className="w-full rounded-xl" disabled>Manage</Button>
                </CardContent>
            </Card>

             <Card className="glassmorphism hover:border-primary/50 transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="font-headline text-lg">View Feedback</CardTitle>
                    <MessageSquare className="w-6 h-6 text-primary"/>
                </CardHeader>
                <CardContent>
                     <p className="text-muted-foreground mb-4">See what users are saying about the platform.</p>
                     <Button className="w-full rounded-xl" disabled>View Feedback</Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </>
  )
}
