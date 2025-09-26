
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
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function StudentProfiles() {
    const studentImages = PlaceHolderImages.filter(img => img.id.startsWith('student-avatar-'));
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {students.map((student, index) => (
        <Card key={student.id} className="text-center">
          <CardHeader>
            <div className="relative mx-auto h-24 w-24">
              <Image
                src={studentImages[index % studentImages.length]?.imageUrl || "https://picsum.photos/seed/placeholder/100/100"}
                alt={student.name}
                width={100}
                height={100}
                className="rounded-full object-cover"
                data-ai-hint={studentImages[index % studentImages.length]?.imageHint || "student portrait"}
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
