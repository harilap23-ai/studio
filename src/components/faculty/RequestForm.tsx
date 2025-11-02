'use client';

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { addRequest } from "@/lib/actions";

export function RequestForm() {
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message) {
            alert("Please enter a message.");
            return;
        }
        
        await addRequest({ message });

        alert("Your request has been sent to the admin.");
        
        setMessage("");
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Send Request</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Textarea
                        placeholder="Enter your request here..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <Button type="submit">Send</Button>
                </form>
            </CardContent>
        </Card>
    );
}
