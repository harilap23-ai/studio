import clientPromise from '@/lib/mongodb';

interface Notification {
  title: string;
  description: string;
}

interface Request {
    message: string;
}

async function getDb() {
    const client = await clientPromise;
    return client.db();
}

export async function addNotification(notification: Notification) {
    const db = await getDb();
    await db.collection('notifications').insertOne({
        ...notification,
        read: false,
        timestamp: new Date(),
    });
}

export async function getNotifications() {
    const db = await getDb();
    return await db.collection('notifications').find({}).sort({ timestamp: -1 }).toArray();
}

export async function addRequest(request: Request) {
    const db = await getDb();
    await db.collection('requests').insertOne({
        ...request,
        timestamp: new Date(),
    });
}

export async function getRequests() {
    const db = await getDb();
    return await db.collection('requests').find({}).sort({ timestamp: -1 }).toArray();
}
