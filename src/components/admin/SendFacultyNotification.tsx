'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { addNotification } from '@/lib/actions';

export function SendFacultyNotification({ adminId }: { adminId: string }) {
  const [message, setMessage] = useState('');
  const [facultyId, setFacultyId] = useState('');

  const handleSubmit = async () => {
    await addNotification({ title: `Notification from ${adminId}`, description: message });
    setMessage('');
    setFacultyId('');
  };

  return (
    <div className="flex flex-col gap-4 rounded-lg border p-4">
      <h2 className="font-bold">Send Notification to Faculty</h2>
      <div className="flex gap-2">
        <Input
          placeholder="Faculty ID"
          value={facultyId}
          onChange={(e) => setFacultyId(e.target.value)}
        />
        <Input
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button onClick={handleSubmit}>Send</Button>
      </div>
    </div>
  );
}
