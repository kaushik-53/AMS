"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getUserById, logoutAction } from "@/lib/actions";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { User } from "@/lib/types";
import { LogOut, User as UserIcon } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export function UserNav() {
  const [user, setUser] = useState<User | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const userId = searchParams.get("userId");
    if (userId) {
      getUserById(userId).then((userData) => {
        if (userData) setUser(userData);
      });
    }
  }, [searchParams]);

  const getAvatarUrl = () => {
    if (user?.avatarId) {
      const placeholder = PlaceHolderImages.find(p => p.id === user.avatarId);
      return placeholder?.imageUrl || `https://picsum.photos/seed/${user.id}/40/40`;
    }
    return `https://picsum.photos/seed/default/40/40`;
  }

  const getInitials = (name: string) => {
    const names = name.split(" ");
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`;
    }
    return names[0].substring(0, 2);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="group-data-[collapsible=icon]:hidden w-full">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-full justify-start gap-2 px-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={getAvatarUrl()} alt={user.name} />
                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium">{user.name}</span>
                <span className="text-xs text-muted-foreground -mt-1">{user.email}</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <form action={logoutAction}>
              <DropdownMenuItem asChild>
                <button type="submit" className="w-full">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </button>
              </DropdownMenuItem>
            </form>
          </DropdownMenuContent>
        </DropdownMenu>
    </div>
  );
}
