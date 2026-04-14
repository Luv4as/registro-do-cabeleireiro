import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";

interface ModalComponentProps{
    header: string;
    text: string;
    btnConfirm: string;
    btnCancel: string;
    OnConfirm: () => void;
    OnCancel: () => void;
    modalShow: boolean;
    OnClose: () => void;
}

export default function ModalComponent({header, text, btnConfirm, btnCancel, OnConfirm, OnCancel, modalShow, OnClose}: ModalComponentProps){

    return(
        <Modal show={modalShow} onClose={OnClose}>
            <ModalHeader>
                <p className="font-bold text-2xl">{header}</p>
            </ModalHeader>
            <ModalBody>
              <div className="space-y-4">
                <p className="text-base text-white">
                {text}
                </p>
              </div>
            </ModalBody>
            <ModalFooter className="gap-6">
              <Button type="button" onClick={OnConfirm}>
                {btnConfirm}
              </Button>
              <Button type="button" color="red" onClick={OnCancel}>
                {btnCancel}
              </Button>
            </ModalFooter>
        </Modal>
    )
}
