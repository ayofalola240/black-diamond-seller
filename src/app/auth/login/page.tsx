"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { startTransition, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "nextjs-toploader/app";
import { axiosClient } from "@/lib/api";

// Form validation schema using Zod
const formSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(8, { message: "Password must be at least 8 characters long." }),
});

export default function Login() {
  const router = useRouter();
  const [isShowingPassword, setIsShowingPassword] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
  });

  const login = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axiosClient.post("/auth/login", values);
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data?.errors) {
        const errorMessage = error.response.data.errors[0]?.message || "An error occurred. Please try again.";
        return { error: errorMessage };
      }
      return { error: error.message || "An unexpected error occurred." };
    }
  };

  // Handle form submission
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (isPending) return;

    startTransition(() => {
      setIsPending(true);

      login(values)
        .then((response) => {
          if ("error" in response) {
            toast.error(response.error);
            return;
          }
          console.log(response);
          toast.success("Login successful!");
          router.replace("/");
        })
        .catch((err) => {
          toast.error(err.message || "An unexpected error occurred.");
        })
        .finally(() => {
          setIsPending(false);
        });
    });
  }

  return (
    <section className="min-h-screen py-[58px] gap-[38px] px-4 flex flex-col items-center bg-auth-bg bg-cover w-full">
      <Image width={191} height={123} src="/svgs/logo-with-text.svg" alt="Black Diamond Logo" />
      <h2 className="font-medium text-2xl text-white">Auction Seller Platform</h2>
      <Form {...form}>
        <form id="login-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-[468px] mx-auto w-full">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm text-[#999999]">Email</FormLabel>
                <FormControl>
                  <Input className="text-sm h-[50px] text-white rounded-none" placeholder="johndoe@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm text-[#999999]">Password</FormLabel>
                <div className="flex relative flex-row items-center">
                  <FormControl>
                    <Input type={isShowingPassword ? "text" : "password"} className="text-sm text-white pr-14 h-[50px] rounded-none" placeholder="Type password" {...field} />
                  </FormControl>
                  <Button onClick={() => setIsShowingPassword((prev) => !prev)} type="button" className="absolute right-2" variant="ghost" size="icon">
                    {isShowingPassword ? (
                      <EyeOff color="white" strokeWidth={3} absoluteStrokeWidth size={18} />
                    ) : (
                      <Eye color="white" strokeWidth={3} absoluteStrokeWidth size={18} />
                    )}
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <Button form="login-form" type="submit" disabled={isPending} className="w-full max-w-[468px] mx-auto mt-[20px] sm:mt-[100px]">
        {isPending ? "Submitting..." : "Submit"}
      </Button>
    </section>
  );
}
