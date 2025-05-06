import Link from "next/link";
import { Button } from "../ui/button";
import { ChevronLeft } from "lucide-react";

export function BackButton() {
  return (
    <Link href="/" className="fit-content">
      <Button variant="ghost" className="text-sm">
        <ChevronLeft />
        Back
      </Button>
    </Link>
  );
}
