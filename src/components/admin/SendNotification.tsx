'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { addNotification } from '@/lib/actions';
import { faculties } from "@/lib/data";
import { Send } from "lucide-react";

export function SendNotification() {
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFaculty || !message) {
      alert("Please select a faculty and enter a message.");
      return;
    }

    await addNotification({ title: `Message for ${selectedFaculty}`, description: message });

    alert(`Notification sent to ${faculties.find(f => f.id === selectedFaculty)?.name}.`);
    
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
