'use client'

import { ButtonComponent } from "@/app/components/button";
import Calendario from "../../../components/calendario";

export default function CalendarioPage() {
  return (
    <div className="w-full">
      <ButtonComponent text="Adicionar agendamento" className="bg-blue-500 hover:bg-blue-600 mb-8" onClick={()=>{return 0}}></ButtonComponent>
      
      <Calendario />
    </div>
  );
}
