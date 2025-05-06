"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { Form, FormField } from "../ui/form";
import { Button } from "../ui/button";
import { InputFormItem } from "../utils/InputFormField";

const formSchema = z.object({
  email: z.string().email().min(5).max(50),
  password: z.string().min(8).max(50),
});

export function CompanyLoginForm() {
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
          Login
        </Button>
      </form>
    </Form>
  );
}
