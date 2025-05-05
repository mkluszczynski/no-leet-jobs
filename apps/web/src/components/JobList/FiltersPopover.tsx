"use client";
import { Funnel } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export function FiltersPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>
          <Funnel />
          Filters
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-max flex-col gap-4 p-4">
        <SalaryFilter />
        <WorkTypeFilter />
        <EmploymentTypeFilter />
        <ExperienceLevelFilter />
        <Button
          className="w-full"
          onClick={() => {
            // Handle filter application
          }}
        >
          Apply Filters
        </Button>
      </PopoverContent>
    </Popover>
  );
}

function SalaryFilter() {
  const [min, setMin] = useState(10000);
  const [max, setMax] = useState(15000);

  return (
    <div>
      <Label htmlFor="salary" className="text-sm font-medium">
        Min. Salary: {min}$ - Max. Salary: {max}$
      </Label>
      <Slider
        defaultValue={[10000, 15000]}
        min={3000}
        max={40000}
        step={100}
        onValueChange={(value) => {
          setMin(value[0]);
          setMax(value[1]);
        }}
      />
    </div>
  );
}

function WorkTypeFilter() {
  return (
    <div>
      <Label htmlFor="job-type" className="text-sm font-medium">
        Work Type
      </Label>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Work Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="FULL_TIME">Full Time</SelectItem>
          <SelectItem value="PART_TIME">Part Time</SelectItem>
          <SelectItem value="CONTRACT">Contract</SelectItem>
          <SelectItem value="INTERNSHIP">Internship</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

function EmploymentTypeFilter() {
  return (
    <div>
      <Label htmlFor="job-type" className="text-sm font-medium">
        Employment Type
      </Label>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Employment Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="B2B">B2B</SelectItem>
          <SelectItem value="PERMANENT">Permanent</SelectItem>
          <SelectItem value="MANDATORY_CONTRACT">Mandatory Contract</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

function ExperienceLevelFilter() {
  return (
    <div>
      <Label htmlFor="job-type" className="text-sm font-medium">
        Experience Level
      </Label>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Experience Level" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="INTERN">Intern</SelectItem>
          <SelectItem value="JUNIOR">Junior</SelectItem>
          <SelectItem value="MID">Mid</SelectItem>
          <SelectItem value="SENIOR">Senior</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
