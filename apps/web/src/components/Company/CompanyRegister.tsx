import { ChartNoAxesGantt } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { CompanyRegisterForm } from "./CompanyRegisterForm";

export function CompanyRegister() {
  return (
    <Card className="min-w-[350px]">
      <CardHeader className="flex items-center justify-center gap-2">
        <ChartNoAxesGantt />
        <h1 className="text-2xl font-bold">no-leet-jobs</h1>
      </CardHeader>
      <CardContent>
        <CompanyRegisterForm />
      </CardContent>
      <CardFooter className="flex items-center justify-center gap-2 text-sm">
        <div>Already have an account?</div>
        <a href="/company/login" className="text-blue-500 hover:underline">
          Log In
        </a>
      </CardFooter>
    </Card>
  );
}
