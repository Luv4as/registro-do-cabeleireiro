'use client'

import { ButtonComponent } from "@/app/components/button";
import Calendario from "../../../components/calendario";
import ModalComponent from "@/app/components/modal";
import { useState } from "react";
import type { AppointmentData } from "@/app/lib/types/calendar";
import { createCalendarEvent } from "@/app/lib/api/service/calendar";

export default function CalendarioPage() {
  const [openAppointmentModal, setOpenAppointmentModal] = useState(false);
    const [appointmentData, setAppointmentData] = useState<AppointmentData>({
      date: "",
      time: "",
      clientName: "",
      clientEmail: "",
      clientId: 0,
      service: "",
    });
  
  const handleOpenModal = () => {
    setOpenAppointmentModal(true);
  };

  const handleCreateAppointment = async () => {
    if (
      !appointmentData.date ||
      !appointmentData.time ||
      appointmentData.clientId <= 0 ||
      !appointmentData.clientName ||
      !appointmentData.clientEmail ||
      !appointmentData.service
    ) {
      alert(`preencha todos os campos do agendamento` + appointmentData.date + appointmentData.time + appointmentData.clientId + appointmentData.clientName + appointmentData.service);
      return;
    }

    await createCalendarEvent(appointmentData);
    setOpenAppointmentModal(false);
  };

  return (
    <div className="w-full">
      <ButtonComponent text="Adicionar agendamento" className="bg-blue-500 hover:bg-blue-600 mb-8" onClick={()=>{handleOpenModal()}}></ButtonComponent>
      
      <Calendario />

      <ModalComponent
        calendar={true}
        header="Criar agendamento"
        OnClose={() => setOpenAppointmentModal(false)}
        btnConfirm="Criar agendamento"
        OnConfirm={handleCreateAppointment}
        modalShow={openAppointmentModal}
        appointmentData={appointmentData}
        setAppointmentData={setAppointmentData}
     />
    </div>
  );
}
