import { ChartNoAxesGantt, MessageSquareWarning, User } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

export function Header() {
  return (
    <div className="flex h-16 w-full items-center justify-center">
      <div className="flex items-center justify-center gap-2">
        <ChartNoAxesGantt />
        <h1 className="text-2xl font-bold">no-leet-jobs</h1>
      </div>
      <div className="absolute right-4 flex gap-2">
        <Link href="/user/login">
          <Button>
            <User />
            Log In
          </Button>
        </Link>
        <Button variant="outline">
          <MessageSquareWarning />
          Post Job Offer
        </Button>
      </div>
    </div>
  );
}
