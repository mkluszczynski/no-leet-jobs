import { AlignLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export function JobDescription({ details }: { details: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          <div className="flex items-center gap-2">
            <AlignLeft />
            Job Description
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <ReactMarkdown className="markdown-root">{details}</ReactMarkdown>
        {/* <div className="text-gray-700">
          {details.split("\n").map((line, index) => (
            <p key={index} className="mb-2">
              {line}
            </p>
          ))}
        </div> */}
      </CardContent>
    </Card>
  );
}
