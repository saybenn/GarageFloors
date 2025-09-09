import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().min(2, "Name is too short").max(80),
  email: z.string().email("Invalid email"),
  phone: z.string().min(7, "Invalid phone").max(25),
  zip: z
    .string()
    .regex(/^\d{5}(-\d{4})?$/)
    .optional(),
  message: z.string().max(1000).optional(),
  website: z.string().max(0).optional(), // honeypot
});
