import { DashboardLayout } from '@/components/faculty/DashboardLayout';
import { FacultyTimetable } from '@/components/faculty/FacultyTimetable';
import { Notifications } from '@/components/shared/Notifications';
import { RequestForm } from '@/components/faculty/RequestForm';
import { SendAdminNotification } from '@/components/faculty/SendAdminNotification';

export default function FacultyDashboardPage() {
  const facultyId = "faculty123"; // Hardcoded for now

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <h1 className="font-headline text-3xl font-bold">Faculty Dashboard</h1>
        <Notifications />
        <RequestForm />
        <SendAdminNotification facultyId={facultyId} />
        <FacultyTimetable />
      </div>
    </DashboardLayout>
  );
}
