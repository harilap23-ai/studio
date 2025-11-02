'use client';

import {useState} from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Bot, Loader2} from 'lucide-react';
import {useToast} from '@/hooks/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {Badge} from '@/components/ui/badge';
import {
  timeSlots,
  days,
  faculties as facultyData,
  subjects as subjectData,
  classrooms as classroomData,
  batches as batchData,
} from '@/lib/data';
import { GenerateOptimizedTimetablesOutput, GenerateOptimizedTimetablesInput } from '@/ai/schema';

export function GenerateTimetable() {
  const {toast} = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isCoolingDown, setIsCoolingDown] = useState(false);
  const [generatedTimetables, setGeneratedTimetables] =
    useState<GenerateOptimizedTimetablesOutput | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isCoolingDown) return;

    setIsLoading(true);
    setGeneratedTimetables(null);

    const formData = new FormData(e.currentTarget);
    const facultyLeave = parseInt(formData.get('faculty-leave') as string);
    const maxClassesPerDay = parseInt(formData.get('max-classes') as string);
    const numOptions = parseInt(formData.get('num-options') as string);
    const roomCapacityMargin = 2; // Default margin

    const classrooms = classroomData.map(c => c.name + " (" + c.capacity + " seats)");
    const batches = batchData.map(b => b.name + " (" + b.studentCount + " students)");
    const subjects = subjectData.map(s => s.name);
    const faculties = facultyData.map(f => f.name + " (" + f.subjects.join(", ") + ")");
    const timetableSlots = days.flatMap(day => timeSlots.map(time => day + " " + time));

    const input: GenerateOptimizedTimetablesInput = {
      classrooms,
      batches,
      subjects,
      faculties,
      timetableSlots,
      constraints: `Max classes per day: ${maxClassesPerDay}, Average faculty leave per month: ${facultyLeave}`,
    };

    try {
      const response = await fetch('/api/genkit/flow/generateOptimizedTimetables', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({input}),
      });

      if (!response.ok) {
        const errorText = await response.text();
        try {
          const errorData = JSON.parse(errorText);
          throw new Error(
            errorData.error || `API error: ${response.statusText}`
          );
        } catch (e) {
          throw new Error(
            `API error: ${response.statusText}. Response: ${errorText}`
          );
        }
      }

      const result = await response.json();
      setGeneratedTimetables(result.output);
      toast({
        title: 'Timetables Generated!',
        description: `New timetable options are ready for your review.`,
      });
    } catch (error: any) {
      console.error(error);
      toast({
        title: 'Generation Failed',
        description:
          error.message ||
          'Could not generate timetables. Please check the inputs and try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
      setIsCoolingDown(true);
      setTimeout(() => setIsCoolingDown(false), 5000); // 5-second cooldown
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>AI Timetable Generator</CardTitle>
          <CardDescription>
            Configure constraints and let the AI generate optimized timetable
            options based on the existing school data.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="max-classes">Max Classes/Day</Label>
              <Input
                id="max-classes"
                name="max-classes"
                type="number"
                defaultValue={5}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="faculty-leave">Avg. Faculty Leave/Month</Label>
              <Input
                id="faculty-leave"
                name="faculty-leave"
                type="number"
                defaultValue={2}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="num-options">Timetables to Generate</Label>
              <Input
                id="num-options"
                name="num-options"
                type="number"
                defaultValue={3}
              />
            </div>
          </div>
          <div className="p-4 bg-secondary/50 rounded-lg border border-dashed">
            <h4 className="font-semibold text-lg mb-2">Data Preview</h4>
            <p className="text-sm text-muted-foreground mb-4">
              The AI will use the following data from your application. You can
              manage this data in the Timetable section.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="font-medium">{classroomData.length}</span> Classrooms
              </div>
              <div>
                <span className="font-medium">{facultyData.length}</span> Faculties
              </div>
              <div>
                <span className="font-medium">{subjectData.length}</span> Subjects
              </div>
              <div>
                <span className="font-medium">{batchData.length}</span> Batches
              </div>
            </div>
          </div>

          {generatedTimetables && (
            <div className="space-y-4 pt-4">
              <h3 className="font-semibold">Generated Options</h3>
              <pre>{JSON.stringify(generatedTimetables.timetable, null, 2)}</pre>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            disabled={isLoading || isCoolingDown}
            className="w-full md:w-auto"
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Bot className="mr-2 h-4 w-4" />
            )}
            {isLoading
              ? 'Generating...'
              : isCoolingDown
              ? 'Please wait...'
              : 'Generate Timetables'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
