export interface Client {
  id: number;
  name: string;
  lastCut: string;
  nextVisit: string;
  cutType: string;
  hairType: string;
  servicesHad: string;
  productsUsed: string;
  phone: string;
  email: string;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  error?: string;
}