import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserAccount } from "@/lib/types/user-account";
import { Edit } from "lucide-react";
import Link from "next/link";

export function UserProfileView() {
  const user: UserAccount = {
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phoneNumber: "123-456-7890",
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex items-center justify-between gap-2">
        <CardTitle className="flex items-center gap-2">
          User Profile
          <Link href="/user/panel/profile/edit">
            <Button variant={"ghost"} size="icon">
              <Edit />
            </Button>
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <strong>First Name:</strong>
            <span>{user.firstName}</span>
          </div>
          <div className="flex items-center gap-2">
            <strong>Last Name:</strong>
            <span>{user.lastName}</span>
          </div>
          <div className="flex items-center gap-2">
            <strong>Email:</strong>
            <span>{user.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <strong>Phone Number:</strong>
            <span>{user.phoneNumber}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
