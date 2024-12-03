"use client";

import { signIn } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

const Home = () => {
  const { data: session } = useSession();

  console.log(session);

  return (
    <div>
      <button
        onClick={() => {
          signIn("google");
        }}
      >
        Sign in with Google
      </button>
      <br />
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
};

export default Home;
