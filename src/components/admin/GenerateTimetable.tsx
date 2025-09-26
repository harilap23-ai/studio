
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
import { timeSlots, days } from "@/lib/data";

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
    const classroomsRaw = formData.get('classrooms') as string;
    const facultiesRaw = formData.get('faculties') as string;
    const subjectsRaw = formData.get('subjects') as string;
    const batchesRaw = formData.get('batches') as string;
    const facultyLeave = parseInt(formData.get('faculty-leave') as string);


    const classrooms = classroomsRaw.split('\n').map(line => {
        const [name, capacity] = line.split(',').map(s => s.trim());
        return { name, capacity: parseInt(capacity) };
    });

    const faculties = facultiesRaw.split('\n').map(line => {
        const [name, ...subjects] = line.split(',').map(s => s.trim());
        return {
            name,
            subjects,
            maxWorkload: 20, // Mocked
            monthlyLeaves: facultyLeave,
            availability: days.map(day => ({ day, slots: timeSlots.map(() => Math.random() > 0.1) })) // Mocked availability with some random unavailable slots
        };
    });

     const subjects = subjectsRaw.split('\n').map(line => {
        const [name, classesPerWeek] = line.split(',').map(s => s.trim());
        return { name, classesPerWeek: parseInt(classesPerWeek), credits: 3 }; // Mocked credits
    });
    
    const batches = batchesRaw.split('\n').map(line => {
        const [name, studentCount] = line.split(',').map(s => s.trim());
        return { name, studentCount: parseInt(studentCount) };
    });

    const input: GenerateTimetableInput = {
        classrooms,
        batches,
        subjects,
        faculties,
        timetableSlots: days.flatMap(day => timeSlots.map(time => ({ day, time }))),
        constraints: {
            maxClassesPerDay: parseInt(formData.get('max-classes') as string),
            roomCapacityMargin: 2, // Mock
        },
        numberOfTimetablesToGenerate: parseInt(formData.get('num-options') as string),
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
        description: "Could not generate timetables. Please check the inputs.",
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
            Provide constraints to generate multiple optimized timetable options.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                  <Label htmlFor="classrooms">Classrooms (name, capacity)</Label>
                  <Textarea id="classrooms" name="classrooms" placeholder="e.g., Room 101, 60
Lab 201, 40" rows={3} defaultValue="Room 101, 60
Lab 201, 40
Hall 301, 150"/>
              </div>
              <div className="space-y-2">
                  <Label htmlFor="faculties">Faculties (name, subjects)</Label>
                  <Textarea id="faculties" name="faculties" placeholder="e.g., Dr. Smith, CS101, CS202
Prof. Jones, MA101" rows={3} defaultValue="Dr. Alan Grant, CS101, PY101
Dr. Evelyn Reed, MA203
Prof. Ian Malcolm, PY101
Dr. Ellie Sattler, EN102"/>
              </div>
              <div className="space-y-2">
                  <Label htmlFor="subjects">Subjects (name, classes/week)</Label>
                  <Textarea id="subjects" name="subjects" placeholder="e.g., CS101, 3
MA101, 4" rows={3} defaultValue="CS101, 3
MA203, 2
PY101, 4
EN102, 2"/>
              </div>
              <div className="space-y-2">
                  <Label htmlFor="batches">Batches (name, size)</Label>
                  <Textarea id="batches" name="batches" placeholder="e.g., 2025 CS, 55" rows={3} defaultValue="2025 CS, 55
2026 ME, 70
2025 EE, 50"/>
              </div>
          </div>
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
