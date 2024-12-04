import { getUserByEmail } from "@/actions/user";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const Home = async () => {
  const session = await auth();
  console.log({ session });

  if (!session?.user) redirect("/");

  const user = await getUserByEmail(session.user.email as string);

  console.log(user);

  if (!user.data) {
    redirect("/onboarding");
  }

  return <div>Home</div>;
};

export default Home;
