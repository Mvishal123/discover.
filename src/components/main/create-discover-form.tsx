"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createDiscoverSchema } from "@/types/schema";
import { MapDetails } from "@/types/map";

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
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";

type CreateDiscoverFormProps = {
  details: MapDetails;
  setDetails: React.Dispatch<React.SetStateAction<MapDetails>>;
  children: React.ReactNode;
};

const CreateDiscoverForm = ({
  details,
  children,
  setDetails,
}: CreateDiscoverFormProps) => {
  const [advancedView, setAdvancedView] = useState<boolean>(false);

  const form = useForm<z.infer<typeof createDiscoverSchema>>({
    resolver: zodResolver(createDiscoverSchema),
    defaultValues: {
      address: details.address,
      city: details.city,
      latitude: details.coordinates[0],
      longitude: details.coordinates[1],
      country: details.country,
      state: details.state,
      description: "",
      image: "",
      name: "",
      types: [],
    },
  });

  console.log(details);

  const updateMapDetails = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
    target: "address" | "city" | "country" | "state",
  ) => {
    setDetails((prev) => ({
      ...prev,
      [target]: e.target.value,
    }));
  };

  function onSubmit(values: z.infer<typeof createDiscoverSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <div className="pb-12">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 [&_input]:text-sm [&_label]:text-black/70 [&_textarea]:text-sm"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[15px] font-semibold">
                  Discover name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="What would you like to call your discover..."
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-xs">
                  This is your Discover display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {children}

          <div className="mt-4">
            <h2 className="text-2xl font-semibold">Location details</h2>
            <hr />
            <div className="mt-4 flex flex-col gap-2">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[15px] font-semibold">
                      Address
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Address"
                        {...field}
                        value={details.address ?? ""}
                        onChange={(e) => updateMapDetails(e, "address")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-wrap gap-3 [&_div]:flex-1 [&_div]:shrink-0">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[15px] font-semibold">
                        City
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="City"
                          {...field}
                          value={details.city ?? ""}
                          onChange={(e) => updateMapDetails(e, "city")}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[15px] font-semibold">
                        State
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="State"
                          {...field}
                          value={details.state ?? ""}
                          onChange={(e) => updateMapDetails(e, "state")}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[15px] font-semibold">
                        Country
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Country"
                          {...field}
                          value={details.country ?? ""}
                          onChange={(e) => updateMapDetails(e, "country")}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Advanced View */}
              <div className="mt-4">
                <Button
                  className="flex w-full justify-between border-y rounded-none"
                  variant="ghost"
                  type="button"
                  onClick={() => setAdvancedView((prev) => !prev)}
                >
                  Show Advaned options
                  {advancedView ? <ChevronUp /> : <ChevronDown />}
                </Button>
                <div
                  className={cn(
                    "flex gap-3 overflow-hidden transition-all [&_div]:flex-1",
                    advancedView ? "h-28" : "h-0",
                  )}
                >
                  <FormField
                    control={form.control}
                    name="latitude"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[15px] font-semibold">
                          Latitude
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled
                            placeholder="Latitude"
                            {...field}
                            value={details.coordinates[0] ?? 0}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="latitude"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[15px] font-semibold">
                          Longitude
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled
                            placeholder="Longitude"
                            {...field}
                            value={details.coordinates[1] ?? 0}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
          <Button type="submit" variant='brand' size="sm" className="w-full">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateDiscoverForm;
