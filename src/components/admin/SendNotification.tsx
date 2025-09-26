
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { faculties, notifications } from "@/lib/data";
import { Send } from "lucide-react";
import { useState } from "react";

export function SendNotification() {
  const { toast } = useToast();
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFaculty || !message) {
      toast({
        title: "Incomplete Form",
        description: "Please select a faculty and enter a message.",
        variant: "destructive",
      });
      return;
    }
    
    // This is a mock implementation. In a real app, you'd send this to a server.
    const newNotification = {
        id: notifications.length + 1,
        title: "Admin Notification",
        description: message,
        read: false,
        timestamp: new Date().toLocaleDateString(),
    };
    // In a real app, you'd associate this notification with the selected faculty.
    // For this demo, we're just showing a toast.
    
    console.log("Sending notification:", { facultyId: selectedFaculty, message });

    toast({
      title: "Notification Sent",
      description: `Message sent to ${faculties.find(f => f.id === selectedFaculty)?.name}.`,
    });
    
    setSelectedFaculty("");
    setMessage("");
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Send Notification</CardTitle>
          <CardDescription>
            Dispatch an in-app notification to a faculty member.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="faculty">Faculty Member</Label>
            <Select onValueChange={setSelectedFaculty} value={selectedFaculty}>
              <SelectTrigger id="faculty">
                <SelectValue placeholder="Select a faculty member" />
              </SelectTrigger>
              <SelectContent>
                {faculties.map((faculty) => (
                  <SelectItem key={faculty.id} value={faculty.id}>
                    {faculty.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Type your notification message here."
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit">
              <Send className="mr-2 h-4 w-4" />
              Send Notification
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

    
