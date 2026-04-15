'use client'

import InputComponent from "@/app/components/input";
import { registerClient } from "@/app/lib/api/service/auth";
import { maskCelular } from "@/app/lib/utils/masks";
import { Button } from "flowbite-react/components/Button";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";

export default function CadastroClientePage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [hairType, setHairType] = useState("");
  const [lastCut, setLastCut] = useState("");
  const [cutType, setCutType] = useState("");
  const [servicesHad, setServicesHad] = useState("");
  const [productsUsed, setProductsUsed] = useState("");
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
        await registerClient({ name, hairType, email, phone, password, isAdmin: false, lastCut, cutType, servicesHad, productsUsed });
        router.push("/clientes");
  
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao cadastrar cliente");
      } finally {
        setLoading(false);
      }
    };
  
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center px-4">
      <h1 className="mb-6">Cadastro de Cliente</h1>
      <form onSubmit={handleRegister} className="flex max-w-md min-w-1/3 flex-col gap-4">
      <InputComponent
        label="Nome Completo"
        placeholder="Nome do(a) cliente"
        type="text"
        required
        OnChange={(e) => setName(e.target.value)}></InputComponent>
        
        <div className="flex flex-row justify-between">
          <InputComponent
          label="Tipo de cabelo"
          placeholder="Tipo de cabelo (ex: liso, cacheado, crespo)"
          type="text"
          required
          OnChange={(e) => setHairType(e.target.value)}></InputComponent>

          <InputComponent
          label="Tipo de corte"
          placeholder="Tipo de corte (ex: caminho, social, estilo)"
          type="text"
          required
          OnChange={(e) => setCutType(e.target.value)}></InputComponent>
        </div>

        <InputComponent
        label="Útimo corte"
        placeholder="Data do último corte (ex: liso, cacheado, crespo)"
        type="date"
        required
        OnChange={(e) => setLastCut(e.target.value)}></InputComponent>
        
        <div className="flex flex-row justify-between">
          <InputComponent
          label="Serviços realizados"
          placeholder="Serviços que o cliente já recebeu"
          type="text"
          required
          OnChange={(e) => setServicesHad(e.target.value)}></InputComponent>
          <InputComponent
          label="Produtos utilizados"
          placeholder="Produtos que o cliente já utilizou"
          type="text"
          required
          OnChange={(e) => setProductsUsed(e.target.value)}></InputComponent>
        </div>
        <div className="flex flex-row justify-between">
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
        </div>
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