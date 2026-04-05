import { redirect } from "next/navigation";
import SplashScreen from "@/components/ui/SplashScreen";
import { getSession } from "@/lib/auth/getSession";

export default async function Page() {
  const session = await getSession();

  if (session) {
    redirect("/dashboard");
  } else {
    redirect("/welcome");
  }

  return <SplashScreen />;
}