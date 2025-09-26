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
import { faculties } from "@/lib/data";
import { Send } from "lucide-react";

export function SendNotification() {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Notification Sent",
      description: "The faculty member has been notified.",
    });
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
          <Select>
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
