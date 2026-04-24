import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import InputComponent from "./input";
import { SelectComponent } from "./select";
import { serviceOptions } from "../lib/types/services";
import { useClients } from "../hooks/useClients";
import { AppointmentData } from "../lib/types/calendar";
import { Dispatch, SetStateAction } from "react";

interface ModalComponentProps{
  calendar?: boolean;
  header: string;
  text?: string;
  btnConfirm: string;
  btnCancel?: string;
  OnConfirm: () => void;
  OnCancel?: () => void;
  modalShow: boolean;
  OnClose: () => void;
  appointmentData?: AppointmentData;
  setAppointmentData?: Dispatch<SetStateAction<AppointmentData>>;
}

export default function ModalComponent({calendar, header, text, btnConfirm, btnCancel, OnConfirm, OnCancel, modalShow, OnClose, setAppointmentData}: ModalComponentProps){
  const { clients } = useClients();

  const clientOptions = [
    { value: 0, label: "" },
    ...clients.map((client) => ({
    value: client.id,
    label: client.name,
    })),
  ];

  const serviceSelectOptions = ["", ...serviceOptions];

    return(
        <Modal dismissible show={modalShow} onClose={OnClose}>
            <ModalHeader>
                <p className="font-bold text-2xl">{header}</p>
            </ModalHeader>
            {calendar ? (
              <ModalBody>
                <div className="space-y-4">
                  <InputComponent
                    label="Data"
                    placeholder="data"
                    type="date"
                    OnChange={(e) => {
                      setAppointmentData?.((prev) => ({
                        ...prev,
                        date: e.target.value,
                      }))
                    }}
                  />
                  <InputComponent
                    label="Hora"
                    placeholder="hora"
                    type="time"
                    OnChange={(e) => {
                      setAppointmentData?.((prev) => ({
                        ...prev,
                        time: e.target.value,
                      }))
                    }}
                  />
                  <SelectComponent
                    label="Cliente"
                    optionsObject={clientOptions}
                    OnChange={(e) => {
                      const selectedClient = clientOptions.find(c => c.value === Number(e.target.value));
                      setAppointmentData?.((prev) => ({
                        ...prev,
                        clientId: Number(e.target.value),
                        clientName: selectedClient?.label || "", 
                        clientEmail: selectedClient ? clients.find(c => c.id === selectedClient.value)?.email || "" : "", 
                      }))
                    }}
                  />
                  <SelectComponent
                    label="Serviço"
                    optionsStringArray={serviceSelectOptions}
                    OnChange={(e) => {
                      const selectedService = e.target.value;
                      setAppointmentData?.((prev) => ({
                        ...prev,
                        service: selectedService,
                      }))
                    }}
                  />
                </div>
                <ModalFooter className="mt-6">
                  <Button type="button" onClick={OnConfirm}>
                  {btnConfirm}
                </Button>
                </ModalFooter>
              </ModalBody>
            ) : (
            <><ModalBody>
              <div className="space-y-4">
                <p className="text-base text-white">
                  {text}
                </p>
              </div>
            </ModalBody><ModalFooter className="gap-6">
                <Button type="button" onClick={OnConfirm}>
                  {btnConfirm}
                </Button>
                <Button type="button" color="red" onClick={OnCancel}>
                  {btnCancel}
                </Button>
              </ModalFooter></>
            )}
        </Modal>
    )
}
