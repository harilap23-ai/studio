
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

const initialNewClassState: TimetableEntry = {
    day: '',
    time: '',
    subject: '',
    faculty: '',
    room: '',
    batch: '',
};

export function TimetableManagement() {
    const { toast } = useToast();
    const [fullTimetable, setFullTimetable] = useState(initialTimetable);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [newClass, setNewClass] = useState<TimetableEntry>(initialNewClassState);
    const [classToDelete, setClassToDelete] = useState<TimetableEntry | null>(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [classToEdit, setClassToEdit] = useState<TimetableEntry | null>(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    
    const handleAddClass = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

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
        setIsAddDialogOpen(false);
    }

    const handleDeleteClick = (entry: TimetableEntry) => {
        setClassToDelete(entry);
        setIsDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (classToDelete) {
            setFullTimetable(prev => prev.filter(item => item !== classToDelete));
            toast({
                title: "Class Deleted",
                description: "The class has been removed from the timetable.",
            });
            setIsDeleteDialogOpen(false);
            setClassToDelete(null);
        }
    };

    const handleEditClick = (entry: TimetableEntry) => {
        setClassToEdit(entry);
        setIsEditDialogOpen(true);
    };

    const handleEditSave = () => {
        if (classToEdit) {
            setFullTimetable(prev => prev.map(item => item === classToEdit ? classToEdit : item));
            toast({
                title: "Class Updated",
                description: "The class details have been updated.",
            });
            setIsEditDialogOpen(false);
            setClassToEdit(null);
        }
    };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
            <div>
                <CardTitle>Timetable Management</CardTitle>
                <CardDescription>View and manage class schedules.</CardDescription>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={(isOpen) => {
                setIsAddDialogOpen(isOpen);
                if (!isOpen) {
                    setNewClass(initialNewClassState);
                }
            }}>
            <DialogTrigger asChild>
                <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Class
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Class</DialogTitle>
                  <DialogDescription>
                      Fill in the details to schedule a new class.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddClass}>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="day" className="text-right">Day</Label>
                        <Select value={newClass.day} onValueChange={value => setNewClass(prev => ({...prev, day: value}))}>
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
                        <Select value={newClass.time} onValueChange={value => setNewClass(prev => ({...prev, time: value}))}>
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
                         <Select value={newClass.subject} onValueChange={value => setNewClass(prev => ({...prev, subject: value}))}>
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
                         <Select value={newClass.faculty} onValueChange={value => setNewClass(prev => ({...prev, faculty: value}))}>
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
                         <Select value={newClass.batch} onValueChange={value => setNewClass(prev => ({...prev, batch: value}))}>
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
                         <Select value={newClass.room} onValueChange={value => setNewClass(prev => ({...prev, room: value}))}>
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
                  <Button type="submit">Save changes</Button>
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
                    <Button variant="ghost" size="icon" onClick={() => handleEditClick(item)}><Edit className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDeleteClick(item)}><Trash2 className="h-4 w-4" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogDescription>
                    This action cannot be undone. This will permanently delete the class.
                </DialogDescription>
            </DialogHeader>
            {classToDelete && (
                <div className="text-sm">
                    <p><strong>Day:</strong> {classToDelete.day}</p>
                    <p><strong>Time:</strong> {classToDelete.time}</p>
                    <p><strong>Subject:</strong> {subjects.find(s => s.id === classToDelete.subject)?.name}</p>
                    <p><strong>Faculty:</strong> {faculties.find(f => f.id === classToDelete.faculty)?.name}</p>
                    <p><strong>Room:</strong> {classrooms.find(c => c.id === classToDelete.room)?.name}</p>
                    <p><strong>Batch:</strong> {batches.find(b => b.id === classToDelete.batch)?.name}</p>
                </div>
            )}
            <DialogFooter>
                <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button variant="destructive" onClick={handleDeleteConfirm}>Delete</Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>

       <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Edit Class</DialogTitle>
                <DialogDescription>
                    Update the details of the class.
                </DialogDescription>
            </DialogHeader>
            {classToEdit && (
            <div className="grid gap-4 py-4">
                 <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="day" className="text-right">Day</Label>
                        <Select value={classToEdit.day} onValueChange={value => setClassToEdit(prev => ({...prev!, day: value}))}>
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
                        <Select value={classToEdit.time} onValueChange={value => setClassToEdit(prev => ({...prev!, time: value}))}>
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
                         <Select value={classToEdit.subject} onValueChange={value => setClassToEdit(prev => ({...prev!, subject: value}))}>
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
                         <Select value={classToEdit.faculty} onValueChange={value => setClassToEdit(prev => ({...prev!, faculty: value}))}>
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
                         <Select value={classToEdit.batch} onValueChange={value => setClassToEdit(prev => ({...prev!, batch: value}))}>
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
                         <Select value={classToEdit.room} onValueChange={value => setClassToEdit(prev => ({...prev!, room: value}))}>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select a room" />
                            </SelectTrigger>
                            <SelectContent>
                                {classrooms.map(room => <SelectItem key={room.id} value={room.id}>{room.name}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
            </div>
            )}
            <DialogFooter>
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleEditSave}>Save Changes</Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
