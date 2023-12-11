import * as z from "zod";
export const formSchema = z.object({
  title: z.string().min(3).max(50),
  explanation: z.string().min(72),
  tags: z.array(z.string().min(1).max(15)).min(1).max(3),
});