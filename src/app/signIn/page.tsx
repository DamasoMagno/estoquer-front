"use client";

import { useState } from "react";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignIn = async (e: any) => {
    e.preventDefault();

    try {
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

      router.push("/");
    } catch (error) {}
  };

  return (
    <div className="h-screen max-w-md mx-auto px-12 flex justify-center items-center flex-col">
      <h1 className="text-3xl bold">Entrar</h1>

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

        <Button className="w-full">Realizar Login</Button>
      </form>

      <Link href="/signUp">Criar conta</Link>
    </div>
  );
}
