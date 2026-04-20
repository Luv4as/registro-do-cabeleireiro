"use client";

import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { useClients } from "../hooks/useClients";
import { maskCelular } from "../lib/utils/masks";
import ModalComponent from "./modal";
import { useState } from "react";

export function TableComponent() {
  const { clients, loading, error, deleteClient } = useClients();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);
  const [selectedClientName, setSelectedClientName] = useState("");

  const handleOpenDeleteModal = (id: number, name: string) => {
    setSelectedClientId(id);
    setSelectedClientName(name);
    setOpenDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedClientId === null) {
      return;
    }

    await deleteClient(String(selectedClientId));
    setOpenDeleteModal(false);
    setSelectedClientId(null);
    setSelectedClientName("");
  };

  return (
    <div className="overflow-x-auto">
      {loading && <p className="mb-4 text-sm text-gray-500">Carregando clientes...</p>}
      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
      <Table hoverable={true}>
        <TableHead>
          <TableRow>
            <TableHeadCell>ID</TableHeadCell>
            <TableHeadCell>Nome</TableHeadCell>
            <TableHeadCell>Última visita</TableHeadCell>
            <TableHeadCell>Próxima visita</TableHeadCell>
            <TableHeadCell>Tipo de corte</TableHeadCell>
            <TableHeadCell>Tipo de cabelo</TableHeadCell>
            <TableHeadCell>Serviços feitos</TableHeadCell>
            <TableHeadCell>Produtos Usados</TableHeadCell>
            <TableHeadCell>Telefone</TableHeadCell>
            <TableHeadCell>E-mail</TableHeadCell>
            <TableHeadCell>
              <span className="sr-only">Editar</span>
            </TableHeadCell>
            <TableHeadCell>
              <span className="sr-only">Deletar</span>
            </TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody className="divide-y">
          {clients.map((client) => (
            <TableRow key={client.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {client.id}
              </TableCell>
              <TableCell>{client.name}</TableCell>
              <TableCell>{client.lastCut}</TableCell>
              <TableCell>{client.nextVisit}</TableCell>
              <TableCell>{client.cutType}</TableCell>
              <TableCell>{client.hairType}</TableCell>
              <TableCell>{client.servicesHad}</TableCell>
              <TableCell>{client.productsUsed}</TableCell>
              <TableCell>{maskCelular(client.phone)}</TableCell>
              <TableCell>{client.email}</TableCell>
              <TableCell>
                <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                  Editar
                </a>
              </TableCell>
              <TableCell>
                <button
                  type="button"
                  onClick={() => handleOpenDeleteModal(client.id, client.name)}
                  className="font-medium text-red-600 hover:underline dark:text-red-500">
                  Deletar
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ModalComponent
        header="Confirmar exclusao"
        text={`Tem certeza que deseja deletar o cliente ${selectedClientName}?`}
        modalShow={openDeleteModal}
        btnCancel="Cancelar"
        OnCancel={() => setOpenDeleteModal(false)}
        btnConfirm="Sim, deletar"
        OnConfirm={handleConfirmDelete}
        OnClose={() => setOpenDeleteModal(false)}
      />
    </div>
  );
}
