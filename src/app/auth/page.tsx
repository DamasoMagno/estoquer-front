"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const signSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type Sign = z.infer<typeof signSchema>;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignIn = async () => {
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

    router.push("/");
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
    </div>
  );
}
