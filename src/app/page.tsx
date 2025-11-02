"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/shared/Icons';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = (userType: 'admin' | 'faculty') => {
    if (userType === 'admin') {
      if (email === 'admin@123.com' && password === 'admin@123') {
        router.push('/admin/dashboard');
      } else {
        toast({
          title: 'Invalid credentials',
          description: 'Please check your email and password.',
          variant: 'destructive',
        });
      }
    } else if (userType === 'faculty') {
      if (email === 'faculty@123.com' && password === 'faculty@123') {
        router.push('/faculty/dashboard');
      } else {
        toast({
          title: 'Invalid credentials',
          description: 'Please check your email and password.',
          variant: 'destructive',
        });
      }
    }
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-cover bg-center p-4"
      style={{
        backgroundImage:
          "url('https://t3.ftcdn.net/jpg/00/93/96/96/360_F_93969672_qYuLP5VhBcETsw2s5HFozdiqmaZa3H4k.jpg')",
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Logo className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="font-headline text-3xl">MasterClass</CardTitle>
          <CardDescription>
            The Smart Classroom & Timetable Scheduler
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              suppressHydrationWarning
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              suppressHydrationWarning
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button
            className="w-full bg-red-500 hover:bg-red-600"
            onClick={() => handleLogin('admin')}
            suppressHydrationWarning
          >
            Login as Admin <ArrowRight />
          </Button>
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => handleLogin('faculty')}
            suppressHydrationWarning
          >
            Login as Faculty <ArrowRight />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
