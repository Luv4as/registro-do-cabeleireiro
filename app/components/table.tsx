
"use client";

import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { useClients } from "../hooks/useClients";
import { maskCelular } from "../lib/utils/masks";

export function TableComponent() {
  const { clients, loading, error } = useClients();

  return (
    <div className="overflow-x-auto">
      {loading && <p className="mb-4 text-sm text-gray-500">Carregando clientes...</p>}
      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
      <Table hoverable={true}>
        <TableHead>
          <TableRow>
            <TableHeadCell>ID</TableHeadCell>
            <TableHeadCell>Nome</TableHeadCell>
            <TableHeadCell>Último corte</TableHeadCell>
            <TableHeadCell>Tipo de corte</TableHeadCell>
            <TableHeadCell>Tipo de cabelo</TableHeadCell>
            <TableHeadCell>Serviços feitos</TableHeadCell>
            <TableHeadCell>Produtos Usados</TableHeadCell>
            <TableHeadCell>Telefone</TableHeadCell>
            <TableHeadCell>E-mail</TableHeadCell>
            <TableHeadCell>
              <span className="sr-only">Editar</span>
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
              <TableCell>{client.cutType}</TableCell>
              <TableCell>{client.hairType}</TableCell>
              <TableCell>{client.servicesHad}</TableCell>
              <TableCell>{client.productsUsed}</TableCell>
              <TableCell>{maskCelular(client.phone)}</TableCell>
              <TableCell>{client.email}</TableCell>
              <TableCell>
                <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                  Edit
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
