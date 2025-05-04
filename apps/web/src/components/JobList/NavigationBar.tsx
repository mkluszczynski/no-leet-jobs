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

export function NavigationBar() {
  return (
    <div className="flex min-h-16 w-full items-center justify-center px-4 py-2">
      <FieldFilter />
    </div>
  );
}

function FieldFilter() {
  return (
    <div className="flex w-full items-center justify-center gap-2">
      {fieldsMoc.map((field) => (
        <FieldFilterItem key={field.alias} field={field} />
      ))}
    </div>
  );
}

function FieldFilterItem({ field }: { field: FieldOfJob }) {
  const fieldIcons: Record<string, { icon: JSX.Element; bg: string }> = {
    js: { icon: <Braces size={16} />, bg: "bg-yellow-500" },
    py: { icon: <Turtle size={16} />, bg: "bg-blue-500" },
    java: { icon: <Coffee size={16} />, bg: "bg-red-500" },
    csharp: { icon: <Hash size={16} />, bg: "bg-green-500" },
    cpp: { icon: <CircuitBoard size={16} />, bg: "bg-purple-500" },
    php: { icon: <House size={16} />, bg: "bg-purple-500" },
    ruby: { icon: <Gem size={16} />, bg: "bg-pink-500" },
    go: { icon: <Squirrel size={16} />, bg: "bg-teal-500" },
    android: { icon: <Smartphone size={16} />, bg: "bg-green-700" },
    ios: { icon: <Apple size={16} />, bg: "bg-blue-700" },
    gamedev: { icon: <Gamepad2 size={16} />, bg: "bg-orange-500" },
    data: { icon: <ChartColumnIncreasing size={16} />, bg: "bg-yellow-600" },
    ml: { icon: <Bot size={16} />, bg: "bg-indigo-500" },
    devops: { icon: <Repeat size={16} />, bg: "bg-gray-500" },
    cloud: { icon: <Cloud size={16} />, bg: "bg-gray-600" },
    cybersec: { icon: <Shield size={16} />, bg: "bg-red-600" },
    blockchain: { icon: <Bitcoin size={16} />, bg: "bg-blue-600" },
    testing: { icon: <FlaskConical size={16} />, bg: "bg-purple-600" },
  };

  return (
    <Avatar>
      <AvatarFallback className={fieldIcons[field.alias]?.bg || "bg-gray-500"}>
        {fieldIcons[field.alias]?.icon || "??"}
      </AvatarFallback>
    </Avatar>
  );
}
