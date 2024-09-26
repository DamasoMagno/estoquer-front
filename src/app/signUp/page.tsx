"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const userSchema = z.object({
  email: z.string().email().min(1, "Email requerido"),
  password: z.string().min(6, "Minimo de 6 caracteres exigido"),
});

type User = z.infer<typeof userSchema>;

const supabase = createClientComponentClient();

export default function SignUp() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<User>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSignUp = async (data: User) => {
    try {
      const response = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback`,
        },
      });

      if (response.error) {
        toast.warning("Email já cadastrado");
        return;
      }

      router.push("/signIn");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen max-w-md mx-auto px-12 flex justify-center items-center flex-col">
      <h1 className="text-3xl bold">Criar conta</h1>

      <form
        onSubmit={handleSubmit(handleSignUp)}
        className="w-full my-8 flex flex-col gap-4"
      >
        <Input
          placeholder="Digite seu email"
          type="email"
          {...register("email")}
        />

        <Input
          {...register("password")}
          placeholder="Digite sua senha"
          type="password"
        />

        <Button disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="animate-pulse" /> : "Criar conta"}
        </Button>
      </form>

      <Link href="/signIn">Entrar</Link>
    </div>
  );
}
