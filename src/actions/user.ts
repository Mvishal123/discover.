"use server";

import { prisma } from "@/lib/prisma";
import { onboardingSchema } from "@/types/schema";
import { User } from "@prisma/client";
import { z } from "zod";

export const getUserByEmail = async (email: string) => {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (user) {
    return {
      data: user,
    };
  } else {
    return {
      error: "User not found",
    };
  }
};

export const hasUserOnboarded = async (email: string) => {
  const user = await getUserByEmail(email);
  if (user.data) return user.data?.onboarded;
};

export const isUsernameAlreadyTaken = async (username: string) => {
  const user = await prisma.user.findFirst({
    where: {
      username,
    },
  });

  return user ? true : false;
};

export const createNewUser = async (
  user: z.infer<typeof onboardingSchema> & { email: string }
) => {
  try {
    const createUser = await prisma.user.create({
      data: {
        email: user.email,
        username: user.username,
        name: user.name,
      },
    });

    return {
      data: createUser,
    };
  } catch (error) {
    return {
      error: "Failed to create user",
    };
  }
};
