"use client";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export function Header() {
  const router = useRouter();
  const supabase = createClientComponentClient();

  async function signOutUser() {
    await supabase.auth.signOut();
    router.push("/signIn");
  }

  return (
    <header className="flex items-center gap-2 mt-4">
      <Button variant="ghost" onClick={signOutUser}>
        <LogOut size={20} />
      </Button>
      <h2 className="text-xl bold">Resumo de pedidos</h2>
    </header>
  );
}
