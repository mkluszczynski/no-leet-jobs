import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CompanyAccount } from "@/lib/types/company-account";
import { Edit } from "lucide-react";
import Link from "next/link";

export function CompanyProfileView() {
  const company: CompanyAccount = {
    name: "Tech Solutions",
    address: "123 Tech Street, Silicon Valley, CA",
    email: "john@example.com",
    phoneNumber: "123-456-7890",
    website: "www.techsolutions.com",
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex items-center justify-between gap-2">
        <CardTitle className="flex items-center gap-2">
          User Profile
          <Link href="/company/panel/profile/edit">
            <Button variant={"ghost"} size="icon">
              <Edit />
            </Button>
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <strong>Company Name:</strong>
            <span>{company.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <strong>Address:</strong>
            <span>{company.address}</span>
          </div>
          <div className="flex items-center gap-2">
            <strong>Email:</strong>
            <span>{company.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <strong>Phone Number:</strong>
            <span>{company.phoneNumber}</span>
          </div>
          <div className="flex items-center gap-2">
            <strong>Website:</strong>
            <span>{company.website}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
