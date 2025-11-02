
import { SidebarTrigger } from '@/components/ui/sidebar';
import { UserAvatar } from '@/components/shared/UserAvatar';
import { Notifications } from '@/components/shared/Notifications';
import { Logo } from '@/components/shared/Icons';

interface HeaderProps {
  user: {
    name: string;
    role: string;
    avatarUrl: string;
  };
}

export function Header({ user }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <div className="md:hidden">
         <SidebarTrigger />
      </div>
      <div className="hidden items-center gap-2 md:flex">
        <Logo className="h-6 w-6 text-primary" />
        <h1 className="font-headline text-xl font-bold text-primary">ClassMaster</h1>
      </div>
      <div className="flex w-full items-center justify-end gap-2">
        <Notifications />
        <UserAvatar name={user.name} role={user.role} avatarUrl={user.avatarUrl} />
      </div>
    </header>
  );
}
