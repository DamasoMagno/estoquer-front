"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const supabase = createClientComponentClient();

  const handleSignIn = async () => {
    try {
      await supabase.auth.signInWithPassword({
        email,
        password,
      });
  
      router.push("/");
    } catch (error) {}
  };

  return (
    <div className="h-screen flex justify-center items-center px-4 flex-col gap-4 max-w-md mx-auto">
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
      />

      <Button className="w-full" onClick={handleSignIn}>
        Realizar Login
      </Button>

      <Link href="/sign">Criar conta</Link>
    </div>
  );
}
