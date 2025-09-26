import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { students } from '@/lib/data';
import { Badge } from '@/components/ui/badge';

export function StudentProfiles() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {students.map((student) => (
        <Card key={student.id} className="text-center">
          <CardHeader>
            <div className="relative mx-auto h-24 w-24">
              <Image
                src={student.avatar}
                alt={student.name}
                layout="fill"
                className="rounded-full object-cover"
                data-ai-hint="student portrait"
              />
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <CardTitle>{student.name}</CardTitle>
            <CardDescription>{student.id}</CardDescription>
            <Badge variant="secondary" className="mx-auto mt-2">
              {student.batch}
            </Badge>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
