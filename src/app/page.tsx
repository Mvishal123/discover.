"use client";

import { signIn, signOut, useSession } from "next-auth/react";

const Home = () => {
  const { data: session } = useSession();
  console.log("HOME", session);

  return (
    <div>
      {session?.user ? (
        <button onClick={() => signOut()}>Logout</button>
      ) : (
        <button onClick={() => signIn("google")}>Login</button>
      )}
    </div>
  );
};

export default Home;
