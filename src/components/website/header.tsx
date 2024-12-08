"use client";

import React from "react";
import Logo from "../common/logo";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button";

const Header = () => {
  const { data: session } = useSession();
  return (
    <header className="l flex h-12 items-center justify-between rounded-lg border-[1px] border-black/5 bg-white/70 px-12 backdrop-blur-md">
      <div className="size-10">
        <Logo />
      </div>
      <div>
        {session?.user ? (
          <Button size="sm" variant="brand" onClick={() => signOut()}>
            Logout
          </Button>
        ) : (
          <Button
            size="sm"
            variant="brand"
            onClick={() =>
              signIn("google", {
                redirectTo: "/home",
              })
            }
          >
            Sign in
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
