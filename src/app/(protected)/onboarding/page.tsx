"use client";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { createNewUser } from "@/actions/user";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { onboardingSchema } from "@/types/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const Onboarding = () => {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.user) return router.push("/home");
  }, []);

  const form = useForm<z.infer<typeof onboardingSchema>>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      name: session?.user?.name ?? "",
      username: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof onboardingSchema>) => {
    createUser({
      ...values,
      email: session?.user?.email as string,
    });
  };

  const { mutate: createUser, isPending } = useMutation({
    mutationFn: createNewUser,
    onSuccess: () => {
      router.push("/home");
    },
    onError: (error) => {
      toast.error(error.message);
      form.reset();
    },
  });

  return (
    <div className="min-h-screen w-full flex justify-center mt-24">
      <Card
        className={cn(
          "w-[500px] p-8 h-fit shadow border-[5px] border-black/5 relative",
          "before:absolute before:inset-x-0 before:h-40 before:bg-gradient-to-b before:pointer-events-none before:from-brand-orange/20 before:to-transparent before:top-0 before:z-10 before:rounded-lg"
        )}
      >
        <CardTitle className="text-center text-4xl font-medium text-black_a70 relative z-10">
          Welcome to Discover,{" "}
          <span className="block md:inline">{session?.user?.name}</span>
        </CardTitle>

        <CardContent className="mt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black_a70 font-medium">
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black_a70">Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Username" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is used to identify you on the platform.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={isPending} className="w-full" type="submit">
                Submit
                {isPending && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Onboarding;
