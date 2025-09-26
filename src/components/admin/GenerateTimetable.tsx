
"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Bot, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { generateOptimizedTimetables, GenerateTimetableInput, GenerateTimetableOutput } from "@/ai/flows/generate-optimized-timetables";
import { timeSlots, days, faculties as facultyData, subjects as subjectData, classrooms as classroomData, batches as batchData } from "@/lib/data";

type TimetableOption = {
  timetable: Record<string, {
      subject: string;
      faculty: string;
      classroom: string;
      time: string;
  }>;
  qualityScore: number;
  violations: string[];
}

export function GenerateTimetable() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [generatedTimetables, setGeneratedTimetables] = useState<GenerateTimetableOutput | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setGeneratedTimetables(null);

    const formData = new FormData(e.currentTarget);
    const facultyLeave = parseInt(formData.get('faculty-leave') as string);
    const maxClassesPerDay = parseInt(formData.get('max-classes') as string);
    const numOptions = parseInt(formData.get('num-options') as string);
    const roomCapacityMargin = 2; // Default margin

    // In a real application, you might fetch this from a form, but here we use the data from lib/data.ts
    const classrooms = classroomData.map(c => ({ name: c.name, capacity: c.capacity }));
    const batches = batchData.map(b => ({ name: b.name, studentCount: b.studentCount }));
    const subjects = subjectData.map(s => ({ name: s.name, credits: s.credits, classesPerWeek: 3 })); // Assuming 3 classes per week
    const faculties = facultyData.map(f => ({
        name: f.name,
        subjects: subjectData.map(s => s.name), // Assume faculty can teach all subjects for demo
        maxWorkload: 20, // Mocked
        monthlyLeaves: facultyLeave,
        availability: days.map(day => ({ day, slots: timeSlots.map(() => Math.random() > 0.1) })) // Mocked availability
    }));

    const input: GenerateTimetableInput = {
        classrooms,
        batches,
        subjects,
        faculties,
        timetableSlots: days.flatMap(day => timeSlots.map(time => ({ day, time }))),
        constraints: {
            maxClassesPerDay,
            roomCapacityMargin,
        },
        numberOfTimetablesToGenerate: numOptions,
    };

    try {
      const result = await generateOptimizedTimetables(input);
      setGeneratedTimetables(result);
      toast({
        title: "Timetables Generated!",
        description: `${result.length} new timetable options are ready for your review.`,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Generation Failed",
        description: "Could not generate timetables. Please check the inputs and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>AI Timetable Generator</CardTitle>
          <CardDescription>
            Configure constraints and let the AI generate optimized timetable options based on the existing school data.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                  <Label htmlFor="max-classes">Max Classes/Day</Label>
                  <Input id="max-classes" name="max-classes" type="number" defaultValue={5} />
              </div>
              <div className="space-y-2">
                  <Label htmlFor="faculty-leave">Avg. Faculty Leave/Month</Label>
                  <Input id="faculty-leave" name="faculty-leave" type="number" defaultValue={2} />
              </div>
              <div className="space-y-2">
                  <Label htmlFor="num-options">Timetables to Generate</Label>
                  <Input id="num-options" name="num-options" type="number" defaultValue={3} />
              </div>
          </div>
          <div className="p-4 bg-secondary/50 rounded-lg border border-dashed">
            <h4 className="font-semibold text-lg mb-2">Data Preview</h4>
            <p className="text-sm text-muted-foreground mb-4">The AI will use the following data from your application. You can manage this data in the Timetable section.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div><span className="font-medium">{classroomData.length}</span> Classrooms</div>
                <div><span className="font-medium">{facultyData.length}</span> Faculties</div>
                <div><span className="font-medium">{subjectData.length}</span> Subjects</div>
                <div><span className.font-medium">{batchData.length}</span> Batches</div>
            </div>
          </div>
        
          {generatedTimetables && (
              <div className="space-y-4 pt-4">
                  <h3 className="font-semibold">Generated Options</h3>
                   <Table>
                      <TableHeader>
                          <TableRow>
                          <TableHead>Option</TableHead>
                          <TableHead>Quality Score</TableHead>
                          <TableHead>Violations</TableHead>
                          <TableHead className="text-right">Action</TableHead>
                          </TableRow>
                      </TableHeader>
                      <TableBody>
                          {generatedTimetables.map((option, index) => (
                            <TableRow key={index}>
                                <TableCell>Timetable {index + 1}</TableCell>
                                <TableCell><Badge variant={option.qualityScore > 0.9 ? "secondary" : "destructive"}>{(option.qualityScore * 100).toFixed(0)}%</Badge></TableCell>
                                <TableCell>{option.violations.join(', ') || 'None'}</TableCell>
                                <TableCell className="text-right"><Button size="sm" variant="outline">View</Button></TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                  </Table>
              </div>
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Bot className="mr-2 h-4 w-4" />
            )}
            {isLoading ? "Generating..." : "Generate Timetables"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
