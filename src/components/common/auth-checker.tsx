import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { toast } from "sonner";

interface AuthCheckerProps {
  originURL?: string;
}

const AuthChecker = async ({ originURL }: AuthCheckerProps) => {
  const session = await auth();
  if (session?.user) {
    toast.error("You must be logged in to access this page");
    redirect(originURL || "/");
  }

  return <div>AuthChecker</div>;
};

export default AuthChecker;
