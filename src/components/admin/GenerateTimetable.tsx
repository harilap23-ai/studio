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

export function GenerateTimetable() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [generated, setGenerated] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setGenerated(false);
    setTimeout(() => {
      setIsLoading(false);
      setGenerated(true);
      toast({
        title: "Timetables Generated!",
        description: "3 new timetable options are ready for your review.",
      });
    }, 3000);
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
                <Textarea id="classrooms" placeholder="e.g., Room 101, 60&#x0a;Lab 201, 40" rows={3} defaultValue="Room 101, 60\nLab 201, 40\nHall 301, 150"/>
            </div>
             <div className="space-y-2">
                <Label htmlFor="faculties">Faculties (name, subjects)</Label>
                <Textarea id="faculties" placeholder="e.g., Dr. Smith, CS101, CS202&#x0a;Prof. Jones, MA101" rows={3} defaultValue="Dr. Grant, CS101, PY101\nDr. Reed, MA203\nProf. Malcolm, PY101"/>
            </div>
             <div className="space-y-2">
                <Label htmlFor="subjects">Subjects (name, classes/week)</Label>
                <Textarea id="subjects" placeholder="e.g., CS101, 3&#x0a;MA101, 4" rows={3} defaultValue="CS101, 3\nMA203, 2\nPY101, 4\nEN102, 2"/>
            </div>
            <div className="space-y-2">
                <Label htmlFor="batches">Batches (name, size)</Label>
                <Textarea id="batches" placeholder="e.g., 2025 CS, 55" rows={3} defaultValue="2025 CS, 55\n2026 ME, 70\n2025 EE, 50"/>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
                <Label htmlFor="max-classes">Max Classes/Day</Label>
                <Input id="max-classes" type="number" defaultValue={5} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="faculty-leave">Avg. Faculty Leave/Month</Label>
                <Input id="faculty-leave" type="number" defaultValue={2} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="num-options">Timetables to Generate</Label>
                <Input id="num-options" type="number" defaultValue={3} />
            </div>
        </div>
        <div className="space-y-2">
            <Label htmlFor="other-constraints">Other Constraints</Label>
            <Textarea id="other-constraints" placeholder="e.g., No classes after 4 PM on Fridays." rows={2} />
        </div>

        {generated && (
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
                        <TableRow>
                            <TableCell>Timetable 1</TableCell>
                            <TableCell><Badge variant="secondary">98%</Badge></TableCell>
                            <TableCell>None</TableCell>
                            <TableCell className="text-right"><Button size="sm" variant="outline">View</Button></TableCell>
                        </TableRow>
                         <TableRow>
                            <TableCell>Timetable 2</TableCell>
                            <TableCell><Badge variant="secondary">95%</Badge></TableCell>
                            <TableCell>1 minor (faculty workload)</TableCell>
                            <TableCell className="text-right"><Button size="sm" variant="outline">View</Button></TableCell>
                        </TableRow>
                         <TableRow>
                            <TableCell>Timetable 3</TableCell>
                            <TableCell><Badge variant="destructive">88%</Badge></TableCell>
                            <TableCell>2 major (room clash, time clash)</TableCell>
                            <TableCell className="text-right"><Button size="sm" variant="outline">View</Button></TableCell>
                        </TableRow>
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
