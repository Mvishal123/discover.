"use client";

import React from "react";
import Logo from "../common/logo";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button";

const Header = () => {
  const { data: session } = useSession();
  return (
    <header className="flex items-center justify-between px-12 rounded-lg h-12 bg-white/70 backdrop-blur-md l  border-[1px] border-black/5">
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
