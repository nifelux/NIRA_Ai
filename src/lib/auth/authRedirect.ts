import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/getSession";

export async function authRedirect() {
  const session = await getSession();

  if (session) {
    redirect("/dashboard");
  }
}