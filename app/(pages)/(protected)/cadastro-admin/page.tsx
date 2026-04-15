'use client'

import InputComponent from "@/app/components/input";
import { registerAdmin } from "@/app/lib/api/service/auth";
import { maskCelular } from "@/app/lib/utils/masks";
import { Button } from "flowbite-react/components/Button";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";

export default function CadastroAdminPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError("");
      setLoading(true);
  
      try{
        const isAdmin = true;
        await registerAdmin( name, email, phone, password, isAdmin);
        router.push("/clientes");
  
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao cadastrar cliente");
      } finally {
        setLoading(false);
      }
    };
  
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center px-4">
      <h1 className="mb-6">Cadastro de Administradores</h1>
      <form onSubmit={handleRegister} className="flex max-w-md min-w-1/3 flex-col gap-4">
      <InputComponent
        label="Nome Completo"
        placeholder="Nome completo"
        type="text"
        required
        OnChange={(e) => setName(e.target.value)}></InputComponent>
        <InputComponent
        label="E-mail"
        placeholder="email@exemplo.com"
        type="email"
        required
        OnChange={(e) => setEmail(e.target.value)}></InputComponent>
        <InputComponent
        label="Telefone"
        placeholder="(00) 00000-0000"
        type="tel"
        required
        value={phone}
        maxLength={15}
        OnChange={(e) => setPhone(maskCelular(e.target.value))}></InputComponent>
        <InputComponent
        label="Senha"
        placeholder="........"
        type="password"
        required
        OnChange={(e) => setPassword(e.target.value)}>
        </InputComponent>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <Button type="submit" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </Button>
      </form>
    </div>

  );
}