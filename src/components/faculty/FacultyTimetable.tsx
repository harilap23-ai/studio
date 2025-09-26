
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
import { Badge } from "@/components/ui/badge";
import { facultyTimetable, timeSlots, days } from "@/lib/data";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Upload, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export function FacultyTimetable() {
    const { toast } = useToast();
    const [changeRequest, setChangeRequest] = useState('');
    const [file, setFile] = useState<File | null>(null);

    const handleRequestChange = (e: React.FormEvent) => {
        e.preventDefault();
        if (!changeRequest) {
            toast({title: "Error", description: "Please enter your request.", variant: "destructive"});
            return;
        }
        console.log("Change request submitted:", changeRequest);
        toast({
            title: "Request Submitted",
            description: "Your timetable change request has been submitted for review.",
        });
        setChangeRequest('');
    }

    const handleUploadMaterial = (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) {
            toast({title: "Error", description: "Please select a file to upload.", variant: "destructive"});
            return;
        }
        console.log("Uploading material:", file.name);
        toast({
            title: "Upload Successful",
            description: `${file.name} has been uploaded.`,
        });
        setFile(null);
    }


  return (
    <Card>
      <CardHeader>
        <CardTitle>My Weekly Timetable</CardTitle>
        <CardDescription>
          Here is your teaching schedule for the week.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">Time</TableHead>
              {days.map((day) => (
                <TableHead key={day}>{day}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {timeSlots.map((slot, slotIndex) => (
              <TableRow key={slot}>
                <TableCell className="font-medium">{slot}</TableCell>
                {days.map((day) => {
                  const daySchedule = facultyTimetable[day as keyof typeof facultyTimetable];
                  const classInfo = daySchedule ? daySchedule[slotIndex] : null;

                  return (
                    <TableCell key={day}>
                      {classInfo ? (
                        <div className="flex flex-col gap-2 p-2 rounded-lg bg-secondary">
                          <p className="font-bold text-secondary-foreground">
                            {classInfo.subject}
                          </p>
                          <Badge variant="outline">{classInfo.batch}</Badge>
                          <p className="text-sm text-muted-foreground">{classInfo.room}</p>
                          <div className="flex gap-2 mt-2">
                             <Dialog>
                                <DialogTrigger asChild>
                                    <Button size="sm" variant="outline">Request Change</Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <form onSubmit={handleRequestChange}>
                                    <DialogHeader>
                                        <DialogTitle>Request Timetable Change</DialogTitle>
                                        <DialogDescription>Describe the change you would like to request. An admin will review it.</DialogDescription>
                                    </DialogHeader>
                                    <Textarea placeholder="e.g., I would like to swap this slot with my Friday 11 AM class." value={changeRequest} onChange={e => setChangeRequest(e.target.value)} className="my-4" />
                                    <DialogFooter>
                                        <DialogClose asChild>
                                            <Button type="submit"><Send className="mr-2 h-4 w-4"/>Submit Request</Button>
                                        </DialogClose>
                                    </DialogFooter>
                                    </form>
                                </DialogContent>
                             </Dialog>
                             <Dialog>
                                <DialogTrigger asChild>
                                    <Button size="sm" variant="ghost"><Upload className="h-4 w-4 mr-2"/>Materials</Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <form onSubmit={handleUploadMaterial}>
                                    <DialogHeader>
                                        <DialogTitle>Upload Class Materials</DialogTitle>
                                        <DialogDescription>Upload files for {classInfo.subject}.</DialogDescription>
                                    </DialogHeader>
                                    <div className="grid w-full max-w-sm items-center gap-1.5 my-4">
                                        <Label htmlFor="materials">PDF, notes, video links</Label>
                                        <Input id="materials" type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                                    </div>
                                    <DialogFooter>
                                        <DialogClose asChild>
                                            <Button type="submit"><Upload className="mr-2 h-4 w-4"/>Upload</Button>
                                        </DialogClose>
                                    </DialogFooter>
                                    </form>
                                </DialogContent>
                             </Dialog>
                          </div>
                        </div>
                      ) : null}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </div>
      </CardContent>
    </Card>
  );
}

    
