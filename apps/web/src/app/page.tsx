import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Welcome to <span className="text-blue-500">My App</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">
            This is a simple card component using Tailwind CSS and Radix UI.
          </p>
          <p className="text-gray-500">
            You can customize it further to fit your needs.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
