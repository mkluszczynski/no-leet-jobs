"use client";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: z.string().email().min(5).max(50),
  password: z.string().min(8).max(50),
});

export function UserRegisterForm() {
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
          name="firstName"
          render={({ field }) => (
            <InputFormItem
              field={field}
              name="First Name"
              placeholder="Enter your first name"
            />
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <InputFormItem
              field={field}
              name="Last Name"
              placeholder="Enter your last name"
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
