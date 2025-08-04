import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Book, FileText, FlaskConical, Bell, Users, AlertTriangle } from "lucide-react";

const stats = [
    { title: "Total Lectures", value: "0", icon: Book, change: "0 this month" },
    { title: "Total Notes", value: "0", icon: FileText, change: "0 this month" },
    { title: "Tests Scheduled", value: "0", icon: FlaskConical, change: "0 this month" },
    { title: "Announcements", value: "0", icon: Bell, change: "0 this month" },
]

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline">Admin Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
            <Card key={stat.title} className="glassmorphism">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    <stat.icon className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground">{stat.change}</p>
                </CardContent>
            </Card>
        ))}
      </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glassmorphism">
          <CardHeader>
            <CardTitle>Platform Analytics</CardTitle>
            <CardDescription>An overview of user engagement and content performance.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-96 bg-muted/30 rounded-lg flex items-center justify-center">
                  <BarChart className="w-16 h-16 text-muted-foreground" />
                  <p className="ml-4 text-muted-foreground">Chart Data Unavailable</p>
            </div>
          </CardContent>
        </Card>
        <Card className="glassmorphism">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>A log of recent admin actions.</CardDescription>
          </CardHeader>
          <CardContent>
             <div className="h-96 bg-muted/30 rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">No recent activity.</p>
             </div>
          </CardContent>
        </Card>
       </div>
    </div>
  );
}
