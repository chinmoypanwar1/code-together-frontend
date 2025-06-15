import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const signupSchema = z.object({
  email: z.string().email("Please Enter a Valid Email"),
  password: z.string().nonempty("Please Enter a Password"),
  username: z.string().nonempty("Please Enter a Username")
})

export const signupResolver = zodResolver(signupSchema);
