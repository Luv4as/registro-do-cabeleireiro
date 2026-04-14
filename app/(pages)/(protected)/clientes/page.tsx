'use client'

import { useRouter } from "next/navigation";
import { ButtonComponent } from "../../../components/button";
import { TableComponent } from "../../../components/table";


export default function ClientesPage() {
  const router = useRouter();
  
  return (
    <div className="flex flex-col w-full justify-center items-center gap-6">
      <h1>Clientes</h1>
      <div className="flex flex-col gap-12 items-end">
        <ButtonComponent onClick={() => router.push("/cadastro-cliente")} text="Adicionar Cliente"></ButtonComponent>
        <TableComponent></TableComponent>
      </div>
    </div>
  );
}
