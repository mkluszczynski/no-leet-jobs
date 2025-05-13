import { ChartNoAxesGantt } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "../../ui/card";
import { UserLoginForm } from "./UserLoginForm";

export function UserLogin() {
  return (
    <Card className="min-w-[350px]">
      <CardHeader className="flex items-center justify-center gap-2">
        <ChartNoAxesGantt />
        <h1 className="text-2xl font-bold">no-leet-jobs</h1>
      </CardHeader>
      <CardContent>
        <UserLoginForm />
      </CardContent>
      <CardFooter className="flex items-center justify-center gap-2 text-sm">
        <div>Don't have an account?</div>
        <a href="/user/register" className="text-blue-500 hover:underline">
          Register
        </a>
      </CardFooter>
    </Card>
  );
}
