export class ApiClient {
    private baseUrl: string;

    constructor(baseURL:string){
        this.baseUrl = baseURL;
    }

    async request<T>(
        endpoint: string,
        options?: RequestInit
    ): Promise<T> {
        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
        const url = `${this.baseUrl}${endpoint}`;

        const response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
                ...options?.headers,
            },
        });

        if (!response.ok){
            throw new Error(`API Error: ${response.status}`);
        }

        return response.json();
    }

    get<T = unknown>(endpoint: string): Promise<T> {
        return this.request<T>(endpoint, {method: 'GET'});
    }

    post<T = unknown, D = Record<string, unknown>>(endpoint: string, data:D): Promise<T>{
        return this.request<T>(endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    put<T = unknown, D = Record<string, unknown>>(endpoint: string, data: D): Promise<T>{
        return this.request<T>(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    delete<T = unknown>(endpoint: string): Promise<T>{ 
        return this.request<T>(endpoint, {method: 'DELETE'});
    }
}

export const apiClient = new ApiClient(
    process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3006'
);