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
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Upload, Send } from "lucide-react";

export function FacultyTimetable() {
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
                                    <DialogHeader>
                                        <DialogTitle>Request Timetable Change</DialogTitle>
                                        <DialogDescription>Describe the change you would like to request. An admin will review it.</DialogDescription>
                                    </DialogHeader>
                                    <Textarea placeholder="e.g., I would like to swap this slot with my Friday 11 AM class." />
                                    <DialogFooter>
                                        <Button><Send className="mr-2 h-4 w-4"/>Submit Request</Button>
                                    </DialogFooter>
                                </DialogContent>
                             </Dialog>
                             <Dialog>
                                <DialogTrigger asChild>
                                    <Button size="sm" variant="ghost"><Upload className="h-4 w-4 mr-2"/>Materials</Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Upload Class Materials</DialogTitle>
                                        <DialogDescription>Upload files for {classInfo.subject}.</DialogDescription>
                                    </DialogHeader>
                                    <div className="grid w-full max-w-sm items-center gap-1.5">
                                        <Label htmlFor="materials">PDF, notes, video links</Label>
                                        <Input id="materials" type="file" />
                                    </div>
                                    <DialogFooter>
                                        <Button><Upload className="mr-2 h-4 w-4"/>Upload</Button>
                                    </DialogFooter>
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
