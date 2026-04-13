"use client";

import InputComponent from "@/app/components/input";
import { login } from "@/app/lib/api/service/auth";
import { Button, Checkbox, Label } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useState, type SyntheticEvent } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try{
      await login(email, password);
      router.push("/clientes");

    } catch {
      setError("Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center px-4">
      <h1 className=" mb-6">Login</h1>
      <form onSubmit={handleLogin} className="flex max-w-md min-w-1/3 flex-col gap-4">
        <InputComponent 
          label="E-mail"
          type="email" 
          placeholder="email@exemplo.com"
          required
          OnChange={(e) => setEmail(e.target.value)}>
        </InputComponent>
        <InputComponent 
          label="Senha"
          type="password"
          placeholder="••••••••"
          required
          OnChange={(e) => setPassword(e.target.value)}>
        </InputComponent>
        <div className="flex items-center gap-2">
          <Checkbox id="remember" className="appearance-none rounded-md" />
          <Label htmlFor="remember">Lembrar de mim</Label>
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <Button type="submit" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </Button>
      </form>
    </div>
  );
}



