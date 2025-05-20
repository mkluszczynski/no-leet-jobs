"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { Form, FormField } from "@/components/ui/form";
import { InputFormItem } from "@/components/utils/InputFormField";
import { Button } from "@/components/ui/button";
import { CompanyAccount } from "@/lib/types/company-account";
import validator from "validator";

const formSchema = z.object({
  companyName: z.string().min(2).max(50),
  address: z.string().min(5).max(100),
  email: z.string().email().min(5).max(50),
  phoneNumber: z.string().min(10).max(15).refine(validator.isMobilePhone),
  website: z.string().url().min(5).max(100),
  password: z.string().min(8).max(50),
});

export function CompanyProfileEditForm({
  company,
}: {
  company: CompanyAccount;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: company.name,
      address: company.address,
      email: company.email,
      phoneNumber: company.phoneNumber || "",
      website: company.website || "",
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
        <Button className="col-span-2 w-full" type="submit">
          Save
        </Button>
      </form>
    </Form>
  );
}
