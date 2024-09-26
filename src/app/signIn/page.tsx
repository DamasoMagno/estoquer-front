"use client";

import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

const userSchema = z.object({
  email: z.string().email().min(1, "Email requerido"),
  password: z.string().min(6, "Minimo de 6 caracteres exigido"),
});

type User = z.infer<typeof userSchema>;

export default function Login() {
  const router = useRouter();
  const supabase = createClientComponentClient();

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

  const handleSignIn = async (data: User) => {
    try {
      const response = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (response.error) {
        toast.warning("Email/Senha incorretos");
        return;
      }

      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen max-w-md mx-auto px-12 flex justify-center items-center flex-col">
      <h1 className="text-3xl bold">Entrar</h1>

      <form
        onSubmit={handleSubmit(handleSignIn)}
        className="w-full my-8 flex flex-col gap-4"
      >
        <Input
          placeholder="Digite seu email"
          type="email"
          {...register("email")}
        />

        <Input
          placeholder="Digite sua senha"
          type="password"
          {...register("password")}
        />

        <Button>
          {isSubmitting ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Realizar Login"
          )}
        </Button>
      </form>

      <Link href="/signUp">Criar conta</Link>
    </div>
  );
}
