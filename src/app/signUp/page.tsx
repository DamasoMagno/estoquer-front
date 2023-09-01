"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const supabase = createClientComponentClient();

  const handleSignIn = async () => {
    try {
      await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback`,
        },
      });

      router.push("/auth");
    } catch (error) {}
  };

  return (
    <div className="h-screen max-w-md mx-auto px-12 flex justify-center items-center flex-col">
      <h1 className="text-3xl bold">Criar conta</h1>

      <form onSubmit={handleSignIn} className="w-full my-8 flex flex-col gap-4">
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite seu email"
          type="email"
        />

        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Digite sua senha"
          type="password"
        />

        <Button className="w-full" onClick={handleSignIn}>
          Criar conta
        </Button>
      </form>

      <Link href="/signIn">Entrar</Link>
    </div>
  );
}
