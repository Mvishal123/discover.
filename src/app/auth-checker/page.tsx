import { auth } from "@/lib/auth";
import {
    redirect,
    useSearchParams
} from "next/navigation";
import { toast } from "sonner";

const AuthChecker = async () => {
  const params = useSearchParams();
  const originURL = params.get("origin");
  const session = await auth();
  if (session?.user) {
    toast.error("You must be logged in to access this page");
    redirect(originURL || "/");
  }

  return <div>AuthChecker</div>;
};

export default AuthChecker;
