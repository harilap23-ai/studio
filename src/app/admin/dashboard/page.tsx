'use client';
import dynamic from 'next/dynamic';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Bot, Calendar, Send, Users, BookOpen, Building, FileUp, ShieldQuestion } from 'lucide-react';
import { TimetableManagement } from '@/components/admin/TimetableManagement';
import { GenerateTimetable } from '@/components/admin/GenerateTimetable';
import { SendNotification } from '@/components/admin/SendNotification';
import { UploadedMaterials } from '@/components/admin/UploadedMaterials';
import { FacultyRequests } from '@/components/admin/FacultyRequests';
import { faculties, subjects, classrooms, batches } from '@/lib/data';
import { SendFacultyNotification } from '@/components/admin/SendFacultyNotification';

const DashboardLayout = dynamic(() => import('@/components/admin/DashboardLayout').then(mod => mod.DashboardLayout), { ssr: false });

export default function AdminDashboardPage() {
  const overviewStats = [
    { title: 'Total Faculty', value: faculties.length, icon: Users },
    { title: 'Total Subjects', value: subjects.length, icon: BookOpen },
    { title: 'Total Classrooms', value: classrooms.length, icon: Building },
    { title: 'Total Batches', value: batches.length, icon: Users },
  ];

  const adminId = "admin123"; // Hardcoded for now

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <h1 className="font-headline text-3xl font-bold">Admin Dashboard</h1>
        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 h-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="timetable"><Calendar className="sm:mr-2" /> <span className="hidden sm:inline">Timetable</span></TabsTrigger>
            <TabsTrigger value="generate"><Bot className="sm:mr-2" /> <span className="hidden sm:inline">AI Generator</span></TabsTrigger>
            <TabsTrigger value="notify"><Send className="sm:mr-2" /> <span className="hidden sm:inline">Notify</span></TabsTrigger>
            <TabsTrigger value="materials"><FileUp className="sm:mr-2" /> <span className="hidden sm:inline">Materials</span></TabsTrigger>
            <TabsTrigger value="requests"><ShieldQuestion className="sm:mr-2" /> <span className="hidden sm:inline">Requests</span></TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6">
             <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {overviewStats.map((stat, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {stat.title}
                    </CardTitle>
                    <stat.icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="timetable" className="mt-6">
            <TimetableManagement />
          </TabsContent>

          <TabsContent value="generate" className="mt-6">
            <GenerateTimetable />
          </TabsContent>

          <TabsContent value="notify" className="mt-6">
            <SendNotification />
            <div className="mt-4">
              <SendFacultyNotification adminId={adminId} />
            </div>
          </TabsContent>

          <TabsContent value="materials" className="mt-6">
            <UploadedMaterials />
          </TabsContent>

          <TabsContent value="requests" className="mt-6">
            <FacultyRequests />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
