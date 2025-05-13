import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit } from "lucide-react";

export default function UserPanelPage() {
  return (
    <Card className="h-full w-full">
      <CardHeader className="flex items-center justify-between gap-2">
        <CardTitle className="flex items-center gap-2">User Panel</CardTitle>
        <Edit />
      </CardHeader>
    </Card>
  );
}
