'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getRequests } from '@/lib/actions';
import { formatDistanceToNow } from 'date-fns';

interface Request {
    id: number;
    message: string;
    timestamp: Date;
}

export function FacultyRequests() {
    const [requests, setRequests] = useState<Request[]>([]);

    useEffect(() => {
        const fetchRequests = async () => {
            const allRequests = await getRequests();
            setRequests(allRequests.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
        }

        fetchRequests();
        const intervalId = setInterval(fetchRequests, 2000); // Poll every 2 seconds

        return () => clearInterval(intervalId); // Cleanup on unmount
    }, []);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Faculty Requests</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {requests.length > 0 ? (
                    requests.map((request) => (
                        <div key={request.id} className="flex items-center justify-between p-2 border rounded-lg">
                            <p>{request.message}</p>
                            <p className="text-sm text-muted-foreground">
                                {formatDistanceToNow(new Date(request.timestamp), { addSuffix: true })}
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="text-sm text-muted-foreground">No new requests from faculty.</p>
                )}
            </CardContent>
        </Card>
    );
}
