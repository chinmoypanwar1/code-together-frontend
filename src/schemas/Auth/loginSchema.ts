import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const loginSchema = z.object({
  email: z.string().email("Please Enter a Valid Email"),
  password: z.string().nonempty("Please Enter a Password")
})

export const loginResolver = zodResolver(loginSchema);
