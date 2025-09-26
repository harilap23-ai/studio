import { DashboardLayout } from '@/components/faculty/DashboardLayout';
import { FacultyTimetable } from '@/components/faculty/FacultyTimetable';

export default function FacultyDashboardPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <h1 className="font-headline text-3xl font-bold">Faculty Dashboard</h1>
        <FacultyTimetable />
      </div>
    </DashboardLayout>
  );
}
