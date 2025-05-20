import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CompanyProfileEditForm } from "./CompanyProfileEditForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CompanyAccount } from "@/lib/types/company-account";

export function CompanyProfileEditView() {
  const company: CompanyAccount = {
    name: "Tech Solutions",
    address: "123 Tech Street, Silicon Valley, CA",
    email: "john@example.com",
    phoneNumber: "123-456-7890",
    website: "www.techsolutions.com",
  };
  return (
    <>
      <Link href="/company/panel/profile">
        <Button variant="link">Back</Button>
      </Link>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Edit Your Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CompanyProfileEditForm company={company} />
        </CardContent>
      </Card>
    </>
  );
}
