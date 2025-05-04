import { fieldsMoc } from "@/lib/mocs/field-moc";
import { FieldOfJob } from "@/lib/types/field-of-job";
import {
  Apple,
  Bitcoin,
  Bot,
  Braces,
  ChartColumnIncreasing,
  CircuitBoard,
  Cloud,
  Coffee,
  FlaskConical,
  Funnel,
  Gamepad2,
  Gem,
  Hash,
  House,
  Repeat,
  Shield,
  Smartphone,
  Squirrel,
  Turtle,
} from "lucide-react";
import { JSX } from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

export function NavigationBar() {
  return (
    <div className="flex min-h-16 w-full items-center justify-between gap-2 py-2 pl-4">
      <Button>
        <Funnel />
        Filters
      </Button>
      <FieldFilter />
    </div>
  );
}

function FieldFilter() {
  return (
    <ScrollArea className="flex w-[calc(100%-8rem)] items-center justify-center">
      <div className="flex items-center justify-center gap-2">
        {fieldsMoc.map((field) => (
          <FieldFilterItem key={field.alias} field={field} />
        ))}
        <ScrollBar hidden orientation="horizontal" />
      </div>
    </ScrollArea>
  );
}

function FieldFilterItem({ field }: { field: FieldOfJob }) {
  const fieldIcons: Record<string, { icon: JSX.Element; bg: string }> = {
    js: { icon: <Braces size={16} />, bg: "bg-yellow-200" },
    py: { icon: <Turtle size={16} />, bg: "bg-blue-200" },
    java: { icon: <Coffee size={16} />, bg: "bg-red-200" },
    csharp: { icon: <Hash size={16} />, bg: "bg-green-200" },
    cpp: { icon: <CircuitBoard size={16} />, bg: "bg-purple-200" },
    php: { icon: <House size={16} />, bg: "bg-purple-200" },
    ruby: { icon: <Gem size={16} />, bg: "bg-pink-200" },
    go: { icon: <Squirrel size={16} />, bg: "bg-teal-200" },
    android: { icon: <Smartphone size={16} />, bg: "bg-green-200" },
    ios: { icon: <Apple size={16} />, bg: "bg-blue-200" },
    gamedev: { icon: <Gamepad2 size={16} />, bg: "bg-orange-200" },
    data: { icon: <ChartColumnIncreasing size={16} />, bg: "bg-yellow-200" },
    ml: { icon: <Bot size={16} />, bg: "bg-indigo-200" },
    devops: { icon: <Repeat size={16} />, bg: "bg-gray-200" },
    cloud: { icon: <Cloud size={16} />, bg: "bg-gray-200" },
    cybersec: { icon: <Shield size={16} />, bg: "bg-red-200" },
    blockchain: { icon: <Bitcoin size={16} />, bg: "bg-blue-200" },
    testing: { icon: <FlaskConical size={16} />, bg: "bg-purple-200" },
  };

  return (
    <Avatar>
      <AvatarFallback className={fieldIcons[field.alias]?.bg || "bg-gray-500"}>
        {fieldIcons[field.alias]?.icon || "??"}
      </AvatarFallback>
    </Avatar>
  );
}
