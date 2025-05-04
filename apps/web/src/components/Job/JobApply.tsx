import { FileUser } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export function JobApply() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          <div className="flex items-center gap-2">
            <FileUser />
            Apply
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <JobApplyForm />
      </CardContent>
    </Card>
  );
}

export function JobApplyForm() {
  return (
    <form className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Name</Label>
        <Input type="text" id="name" name="name" required />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" name="email" required />
      </div>
      <div className="flex cursor-pointer flex-col gap-2">
        <Label htmlFor="resume">Resume</Label>
        <Input
          type="file"
          id="resume"
          name="resume"
          accept=".pdf,.doc,.docx"
          className="cursor-pointer border-none shadow-none"
          required
        />
      </div>
      <Button type="submit" className="mt-4">
        Apply
      </Button>
    </form>
  );
}
