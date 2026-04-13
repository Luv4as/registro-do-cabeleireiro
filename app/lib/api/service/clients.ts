import { apiClient } from "../client";
import { ApiResponse, Client } from "../../types/client";

export const clientsService ={

    async getAll(){
        const response = await apiClient.get<ApiResponse<Client[]>>('/user/all');
        return response.data;
    },

    async getByID(id: string){
        return apiClient.get<Client>(`/user/${id}`);
    },

    async getByEmail(email: string){
        return apiClient.get<Client>(`/user/${email}`);
    },

    async create(data: Omit<Client, 'id'>){
        return apiClient.post<Client>('/user', data);

    },

    async update(id: string, data: Partial<Client>){
        return apiClient.put<Client>(`/user/edit/${id}`, data)
    },

    async delete(id: string){
        return apiClient.delete<Client>(`/user/delete/${id}`)
    }
}