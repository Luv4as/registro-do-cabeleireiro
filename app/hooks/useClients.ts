'use client'

import { useEffect, useState } from "react"
import { clientsService } from "../lib/api/service/clients";
import { Client } from "../lib/types/client";

export function useClients(){
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        try{
            setLoading(true);
            const data = await clientsService.getAll();
            setClients(data);
            setError(null);
        } catch(err){
            setError(err instanceof Error ? err.message: 'Erro ao buscar clientes')
        } finally {
            setLoading(false);
        }
    };

    const deleteClient = async (id: string) => {
        try{
            await clientsService.delete(id);
            setClients(clients.filter(c => c.id !== Number(id)));
        } catch (err){
            setError(err instanceof Error ? err.message: 'Erro ao deletar cliente');
        }
    };

    return { clients, loading, error, fetchClients, deleteClient };
}