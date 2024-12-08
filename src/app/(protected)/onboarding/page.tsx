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
    <div className="mt-24 flex min-h-screen w-full justify-center">
      <Card
        className={cn(
          "relative h-fit w-[500px] border-[5px] border-black/5 p-8 shadow",
          "before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:z-10 before:h-40 before:rounded-lg before:bg-gradient-to-b before:from-brand-orange/20 before:to-transparent",
        )}
      >
        <CardTitle className="relative z-10 text-center text-4xl font-medium text-black_a70">
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
                    <FormLabel className="font-medium text-black_a70">
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
