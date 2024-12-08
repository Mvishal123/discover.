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
  name: z.string().min(2),
  description: z
    .string()
    .min(4, { message: "Description must be at least 5 characters long" }),
  image: z.string().url().optional(),
  position: z.array(z.number()).length(2),
});
