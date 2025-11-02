'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { addRequest } from '@/lib/actions';

export function SendAdminNotification({ facultyId }: { facultyId: string }) {
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    await addRequest({ message: `Notification from ${facultyId}: ${message}` });
    setMessage('');
  };

  return (
    <div className="flex flex-col gap-4 rounded-lg border p-4">
      <h2 className="font-bold">Send Notification to Admin</h2>
      <div className="flex gap-2">
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
