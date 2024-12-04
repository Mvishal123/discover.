import { isUsernameAlreadyTaken } from "@/actions/user";
import { z } from "zod";

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
      { message: "Username already taken" }
    ),
});
