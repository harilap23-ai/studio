import { DashboardLayout } from '@/components/faculty/DashboardLayout';
import { StudentProfiles } from '@/components/faculty/StudentProfiles';

export default function StudentProfilesPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <h1 className="font-headline text-3xl font-bold">Student Profiles</h1>
        <p className="text-muted-foreground">
            List of students in your assigned classes.
        </p>
        <StudentProfiles />
      </div>
    </DashboardLayout>
  );
}
