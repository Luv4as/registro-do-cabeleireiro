const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3007";

export async function login(email: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok){
        throw new Error('Erro ao fazer login');
    }

    const data = await response.json();
    localStorage.setItem('token', data.token);

    return data;
}

export function logout() {
    localStorage.removeItem('token');
}