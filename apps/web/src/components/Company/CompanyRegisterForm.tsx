"use client";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import validator from "validator";

import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const formSchema = z.object({
  companyName: z.string().min(2).max(50),
  address: z.string().min(5).max(100),
  email: z.string().email().min(5).max(50),
  phoneNumber: z.string().min(10).max(15).refine(validator.isMobilePhone),
  website: z.string().url().min(5).max(100),
  password: z.string().min(8).max(50),
});

export function CompanyRegisterForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <InputFormItem
              field={field}
              name="Company Name"
              placeholder="Enter your company name"
            />
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <InputFormItem
              field={field}
              name="Address"
              placeholder="Enter your company address"
            />
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <InputFormItem
              field={field}
              name="Email"
              placeholder="Enter your email"
            />
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <InputFormItem
              field={field}
              name="Phone Number"
              placeholder="Enter your phone number"
            />
          )}
        />
        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <InputFormItem
              field={field}
              name="Website"
              placeholder="Enter your company website"
            />
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <InputFormItem
              field={field}
              name="Password"
              placeholder="Enter your password"
            />
          )}
        />
        <Button className="w-full" type="submit">
          Register
        </Button>
      </form>
    </Form>
  );
}

function InputFormItem({
  field,
  name,
  placeholder,
  description,
}: {
  field: ControllerRenderProps<any, string>;
  name: string;
  placeholder: string;
  description?: string;
}) {
  return (
    <FormItem>
      <FormLabel>{name}</FormLabel>
      <FormControl>
        <Input placeholder={placeholder} {...field} />
      </FormControl>
      {description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  );
}
