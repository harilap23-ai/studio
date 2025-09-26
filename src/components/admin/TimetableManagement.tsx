
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import { fullTimetable as initialTimetable, faculties, subjects, classrooms, batches, timeSlots, days } from "@/lib/data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
  DialogClose
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

type TimetableEntry = {
    day: string;
    time: string;
    subject: string;
    faculty: string;
    room: string;
    batch: string;
}

export function TimetableManagement() {
    const { toast } = useToast();
    const [fullTimetable, setFullTimetable] = useState(initialTimetable);
    
    const handleAddClass = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newClass: TimetableEntry = {
            day: formData.get('day') as string,
            time: formData.get('time') as string,
            subject: formData.get('subject') as string,
            faculty: formData.get('faculty') as string,
            room: formData.get('room') as string,
            batch: formData.get('batch') as string,
        };

        if(Object.values(newClass).some(val => !val)) {
            toast({
                title: "Error",
                description: "Please fill all the fields.",
                variant: "destructive"
            });
            return;
        }

        setFullTimetable(prev => [...prev, newClass]);
        toast({
            title: "Class Added",
            description: "New class has been added to the timetable."
        });
    }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
            <div>
                <CardTitle>Timetable Management</CardTitle>
                <CardDescription>View and manage class schedules.</CardDescription>
            </div>
            <Dialog>
            <DialogTrigger asChild>
                <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Class
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleAddClass}>
                <DialogHeader>
                <DialogTitle>Add New Class</DialogTitle>
                <DialogDescription>
                    Fill in the details to schedule a new class.
                </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="day" className="text-right">Day</Label>
                        <Select name="day">
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select a day" />
                            </SelectTrigger>
                            <SelectContent>
                                {days.map(day => <SelectItem key={day} value={day}>{day}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="time" className="text-right">Time</Label>
                        <Select name="time">
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select a time slot" />
                            </SelectTrigger>
                            <SelectContent>
                                {timeSlots.map(slot => <SelectItem key={slot} value={slot}>{slot}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="subject" className="text-right">Subject</Label>
                         <Select name="subject">
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select a subject" />
                            </SelectTrigger>
                            <SelectContent>
                                {subjects.map(subject => <SelectItem key={subject.id} value={subject.id}>{subject.name}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="faculty" className="text-right">Faculty</Label>
                         <Select name="faculty">
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select a faculty" />
                            </SelectTrigger>
                            <SelectContent>
                                {faculties.map(faculty => <SelectItem key={faculty.id} value={faculty.id}>{faculty.name}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="batch" className="text-right">Batch</Label>
                         <Select name="batch">
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select a batch" />
                            </SelectTrigger>
                            <SelectContent>
                                {batches.map(batch => <SelectItem key={batch.id} value={batch.id}>{batch.name}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="room" className="text-right">Room</Label>
                         <Select name="room">
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select a room" />
                            </SelectTrigger>
                            <SelectContent>
                                {classrooms.map(room => <SelectItem key={room.id} value={room.id}>{room.name}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="submit">Save changes</Button>
                    </DialogClose>
                </DialogFooter>
                </form>
            </DialogContent>
            </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Day</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Faculty</TableHead>
              <TableHead>Room</TableHead>
              <TableHead>Batch</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fullTimetable.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.day}</TableCell>
                <TableCell>{item.time}</TableCell>
                <TableCell>{subjects.find(s=>s.id === item.subject)?.name || item.subject}</TableCell>
                <TableCell>{faculties.find(f=>f.id === item.faculty)?.name || item.faculty}</TableCell>
                <TableCell>{classrooms.find(c=>c.id === item.room)?.name || item.room}</TableCell>
                <TableCell>{batches.find(b=>b.id === item.batch)?.name || item.batch}</TableCell>
                <TableCell className="text-right">
                    <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

    