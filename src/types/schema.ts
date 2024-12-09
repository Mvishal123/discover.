import { isUsernameAlreadyTaken } from "@/actions/user";
import { z } from "zod";

// Users
export const onboardingSchema = z.object({
  name: z.string().min(2).max(50),
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters long" })
    .max(50)
    .refine(
      async (val) => {
        const usernameTaken = await isUsernameAlreadyTaken(val);
        return !usernameTaken;
      },
      { message: "Username already taken" },
    ),
});

// Discovers
export const createDiscoverSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z
    .string()
    .min(4, { message: "Description must be at least 5 characters long" }),
  image: z.string().url().optional(),
  latitude: z.number(),
  longitude: z.number(),
  address: z.string(),
  state: z.string().optional(),
  city: z.string().optional(),
  country: z.string(),
  types: z.array(z.string()).min(1),
});
