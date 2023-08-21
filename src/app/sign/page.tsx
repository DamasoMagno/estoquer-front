"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function Sign() {
  const router = useRouter();
  const form = useForm();

  function logoutUser(e: any) {
    e.preventDefault();
    router.push("/");
  }

  return (
    <div>
      <Form {...form}>
        <form
          className="h-screen flex justify-center items-center flex-col gap-4 max-w-md mx-auto"
          onSubmit={logoutUser}
        >
          <Input type="email" placeholder="Digite seu email" />
          <Input placeholder="Digite seu email" />
          <Button className="w-full">Realizar Login</Button>
        </form>
      </Form>
    </div>
  );
}
