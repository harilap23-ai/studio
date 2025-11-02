'use client';

import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { getNotifications } from '@/lib/actions';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';

interface Notification {
  id: number;
  title: string;
  description: string;
  read: boolean;
  timestamp: Date;
}

export function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const fetchNotifications = async () => {
        const allNotifications = await getNotifications();
        setNotifications(allNotifications.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
    }

    fetchNotifications();
    const intervalId = setInterval(fetchNotifications, 2000); // Poll every 2 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  const markAsRead = () => {
    // This only marks them as read in the local state.
    // A server action would be needed to persist this change.
    setNotifications(notifications.map(n => ({...n, read: true})));
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative rounded-full h-9 w-9" onClick={markAsRead}>
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-accent-foreground text-xs font-bold">
              {unreadCount}
            </span>
          )}
          <span className="sr-only">Toggle notifications</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <Card className="border-0">
          <CardHeader className="p-4">
            <CardTitle>Notifications</CardTitle>
            <CardDescription>You have {unreadCount} unread messages.</CardDescription>
          </CardHeader>
          <Separator />
          <CardContent className="p-0">
            {notifications.length > 0 ? (
              <div className="space-y-2 p-4 max-h-80 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="mb-2 grid grid-cols-[25px_1fr] items-start pb-2 last:mb-0 last:pb-0"
                  >
                    <span className={cn("flex h-2 w-2 translate-y-1 rounded-full", !notification.read && "bg-accent")} />
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {notification.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {notification.description}
                      </p>
                       <p className="text-xs text-muted-foreground/70">
                        {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
                <p className="p-4 text-sm text-muted-foreground">No new notifications.</p>
            )}
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
}
