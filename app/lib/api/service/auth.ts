const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3007";

type RegisterClientPayload = {
    createdByAdminId?: string;
    name: string;
    email: string;
    phone: string;
    password: string;
    isAdmin: boolean;
    lastCut?: string;
    cutType?: string;
    hairType?: string;
    servicesHad?: string;
    productsUsed?: string;
};

type JwtPayload = {
    id?: string | number;
    userId?: string | number;
    adminId?: string | number;
    sub?: string;
    user?: {
        id?: string | number;
    };
};

function extractToken(data: unknown): string | null {
    if (!data || typeof data !== "object") {
        return null;
    }

    const obj = data as Record<string, unknown>;
    const nested = obj.data && typeof obj.data === "object" ? (obj.data as Record<string, unknown>) : null;

    const token = obj.token ?? obj.accessToken ?? obj.jwt ?? nested?.token ?? nested?.accessToken ?? nested?.jwt;
    return typeof token === "string" ? token : null;
}

function getStoredToken(): string | null {
    return localStorage.getItem("token") || localStorage.getItem("authToken");
}

function getAdminIdFromToken(): string | null {
    const token = getStoredToken();
    if (!token) {
        return null;
    }

    try {
        const [, payloadBase64] = token.split(".");
        if (!payloadBase64) {
            return null;
        }

        const payloadJson = atob(payloadBase64.replace(/-/g, "+").replace(/_/g, "/"));
        const payload = JSON.parse(payloadJson) as JwtPayload;

        const adminId = payload.adminId ?? payload.userId ?? payload.id ?? payload.sub ?? payload.user?.id;
        return adminId ? String(adminId) : null;
    } catch {
        return null;
    }
}

export async function registerAdmin(name: string, email: string, phone: string, password: string, isAdmin: boolean) {
    const response = await fetch(`${API_BASE_URL}/signup-admin`, {
        method: 'POST',
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({ name, email, phone, password, isAdmin }),
    });

    if (!response.ok){
        throw new Error('Erro ao cadastrar administrador');
    }

    const data = await response.json();
    const token = extractToken(data);
    if (token) {
        localStorage.setItem('token', token);
    }

    return data;
}

export async function registerClient(
    payload: RegisterClientPayload) {
    const createdByAdminId = payload.createdByAdminId || getAdminIdFromToken();

    
    const cleanPayload = Object.fromEntries(
        Object.entries({ ...payload, createdByAdminId }).filter(([, value]) => value !== undefined && value !== "")
    );

    const token = getStoredToken();

    const response = await fetch(`${API_BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            "content-type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(cleanPayload),
    });

    if (!response.ok){
        const errorData = await response.json().catch(() => null);
        const message = errorData?.message || errorData?.error || 'Erro ao cadastrar cliente';
        throw new Error(message);
    }

    const data = await response.json();
    return data;
}

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
    const token = extractToken(data);
    if (token) {
        localStorage.setItem('token', token);
    }

    return data;
}

export function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('authToken');
}