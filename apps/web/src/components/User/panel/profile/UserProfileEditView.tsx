import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserProfileEditForm } from "./UserProfileEditForm";
import { UserAccount } from "@/lib/types/user-account";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function UserProfileEditView() {
  const user: UserAccount = {
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phoneNumber: "123-456-7890",
  };
  return (
    <>
      <Link href="/user/panel/profile">
        <Button variant="link">Back</Button>
      </Link>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Edit Your Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <UserProfileEditForm user={user} />
        </CardContent>
      </Card>
    </>
  );
}
