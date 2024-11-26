"use client";

import { FormInput } from "@/components/forms";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useTitle } from "@/hooks";
import { axiosClient } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z
  .object({
    oldPassword: z.string().min(1),
    newPassword: z.string().min(1),
    passwordConfirm: z.string().min(1),
  })
  .refine((data) => data.newPassword === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
  });

type FormType = z.infer<typeof formSchema>;

export default function Page() {
  useTitle("Change Password");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (args: FormType) => axiosClient.post("/users/change-password", args),
    onError: (error) => {
      console.log(error);
      toast.error("An error occurred. Please try again");
    },
    onSuccess: () => {
      toast.error("Updated!");
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }

  return (
    <section className="w-full max-w-[720px] flex flex-col gap-6">
      <Form {...form}>
        <form id="change-password" onSubmit={form.handleSubmit(onSubmit)} className="w-full gap-6 grid">
          <FormInput<FormType> type="password" placeholder="Enter your old password" label="Old Password" name="oldPassword" />
          <FormInput<FormType> type="password" placeholder="Enter your new password" label="New Password" name="newPassword" />
          <FormInput<FormType> type="password" placeholder="Confirm your new password" label="Confirm Password" name="passwordConfirm" />
        </form>
      </Form>
      <Button form="change-password" disabled={isPending} className="w-full sm:w-[250px]">
        Save Changes
      </Button>
    </section>
  );
}
