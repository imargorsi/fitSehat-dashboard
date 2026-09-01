import { z } from "zod";

export const signInSchema = z.object({
  email: z.email("Give me a real email, Precious"),
  password: z.string().min(8, "At least 8 characters, Love — keep it safe"),
});

export const signUpSchema = signInSchema.extend({
  name: z.string().min(2, "A little longer, Jaan — at least 2 characters"),
});

export type TSignInInput = z.infer<typeof signInSchema>;
export type TSignUpInput = z.infer<typeof signUpSchema>;
