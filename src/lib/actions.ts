'use server';

import {
    addNotification as dbAddNotification,
    getNotifications as dbGetNotifications,
    addRequest as dbAddRequest,
    getRequests as dbGetRequests
} from '@/lib/database';

interface Notification {
  _id: any; // Or the correct type from the database
  title: string;
  description: string;
  read: boolean;
  timestamp: Date;
}

interface Request {
    _id: any; // Or the correct type from the database
    message: string;
    timestamp: Date;
}

export async function getNotifications(): Promise<Notification[]> {
    console.log('Fetching notifications from the database...');
    const notifications = await dbGetNotifications();
    console.log('Returning notifications from the database:', notifications);
    return notifications.map(n => ({ ...n, id: n._id.toString() }));
}

export async function addNotification(notification: Omit<Notification, '_id' | 'read' | 'timestamp'>) {
    console.log('Adding notification to the database:', notification);
    await dbAddNotification(notification);
    console.log('Notification added to the database.');
}

export async function getRequests(): Promise<Request[]> {
    console.log('Fetching requests from the database...');
    const requests = await dbGetRequests();
    console.log('Returning requests from the database:', requests);
    return requests.map(r => ({ ...r, id: r._id.toString() }));
}

export async function addRequest(request: Omit<Request, '_id' | 'timestamp'>) {
    console.log('Adding request to the database:', request);
    await dbAddRequest(request);
    console.log('Request added to the database.');
}
