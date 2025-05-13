"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { Form, FormField } from "@/components/ui/form";
import { InputFormItem } from "@/components/utils/InputFormField";
import { Button } from "@/components/ui/button";
import { UserAccount } from "@/lib/types/user-account";

const formSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: z.string().email().min(5).max(50),
  phoneNumber: z.string().optional(),
});

export function UserProfileEditForm({ user }: { user: UserAccount }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber || "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-2 space-y-8"
      >
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
          name="phoneNumber"
          render={({ field }) => (
            <InputFormItem
              field={field}
              name="Phone Number"
              placeholder="Enter your phone number"
            />
          )}
        />
        <Button className="col-span-2 w-full" type="submit">
          Save
        </Button>
      </form>
    </Form>
  );
}
