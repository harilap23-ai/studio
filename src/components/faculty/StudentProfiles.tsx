import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { students } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

export function StudentProfiles() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {students.map((student) => (
        <Card key={student.id} className="text-center">
          <CardHeader className="items-center">
            <Avatar className="h-20 w-20 mb-4">
              <AvatarImage src={student.avatar} alt={student.name} />
              <AvatarFallback>{student.name[0]}</AvatarFallback>
            </Avatar>
            <CardTitle>{student.name}</CardTitle>
            <CardDescription>{student.id}</CardDescription>
          </CardHeader>
          <CardContent>
            <Badge variant="secondary" className="mx-auto mt-2">
              {student.batch}
            </Badge>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
