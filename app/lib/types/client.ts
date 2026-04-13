export interface Client {
  id: number;
  nome: string;
  ultimoCorte: string;
  tipoCorte: string;
  tipoCabelo: string;
  servicosFeitos: string;
  produtosUsados: string;
  telefone: string;
  email: string;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  error?: string;
}