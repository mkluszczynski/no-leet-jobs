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
import { FiltersPopover } from "./FiltersPopover";

export function NavigationBar() {
  return (
    <div className="flex min-h-16 w-full items-center justify-between gap-2 py-2 pl-4">
      <FiltersPopover />
      <FieldFilter />
    </div>
  );
}

function FieldFilter() {
  return (
    <div className="flex flex-wrap items-center justify-end gap-2 px-8">
      {fieldsMoc.map((field) => (
        <FieldFilterItem key={field.alias} field={field} />
      ))}
    </div>
  );
}

const iconSize = 18;

const fieldIcons: Record<string, { icon: JSX.Element; bg: string }> = {
  js: { icon: <Braces size={iconSize} />, bg: "bg-yellow-200" },
  py: { icon: <Turtle size={iconSize} />, bg: "bg-blue-200" },
  java: { icon: <Coffee size={iconSize} />, bg: "bg-red-200" },
  csharp: { icon: <Hash size={iconSize} />, bg: "bg-green-200" },
  cpp: { icon: <CircuitBoard size={iconSize} />, bg: "bg-purple-200" },
  php: { icon: <House size={iconSize} />, bg: "bg-purple-200" },
  ruby: { icon: <Gem size={iconSize} />, bg: "bg-pink-200" },
  go: { icon: <Squirrel size={iconSize} />, bg: "bg-teal-200" },
  android: { icon: <Smartphone size={iconSize} />, bg: "bg-green-200" },
  ios: { icon: <Apple size={iconSize} />, bg: "bg-blue-200" },
  gamedev: { icon: <Gamepad2 size={iconSize} />, bg: "bg-orange-200" },
  data: {
    icon: <ChartColumnIncreasing size={iconSize} />,
    bg: "bg-yellow-200",
  },
  ml: { icon: <Bot size={iconSize} />, bg: "bg-indigo-200" },
  devops: { icon: <Repeat size={iconSize} />, bg: "bg-gray-200" },
  cloud: { icon: <Cloud size={iconSize} />, bg: "bg-gray-200" },
  cybersec: { icon: <Shield size={iconSize} />, bg: "bg-red-200" },
  blockchain: { icon: <Bitcoin size={iconSize} />, bg: "bg-blue-200" },
  testing: { icon: <FlaskConical size={iconSize} />, bg: "bg-purple-200" },
};

function FieldFilterItem({ field }: { field: FieldOfJob }) {
  return (
    <Avatar className="size-10">
      <AvatarFallback className={fieldIcons[field.alias]?.bg || "bg-muted"}>
        {fieldIcons[field.alias]?.icon || "??"}
      </AvatarFallback>
    </Avatar>
  );
}
