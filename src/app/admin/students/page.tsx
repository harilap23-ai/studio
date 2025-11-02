import { DashboardLayout } from '@/components/admin/DashboardLayout';
import { StudentProfiles } from '@/components/faculty/StudentProfiles';

export default function StudentProfilesPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <h1 className="font-headline text-3xl font-bold">Student Profiles</h1>
        <p className="text-muted-foreground">
            List of all students in the institution.
        </p>
        <StudentProfiles />
      </div>
    </DashboardLayout>
  );
}