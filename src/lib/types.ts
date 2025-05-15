
export interface User {
  id: string;
  email: string;
  name: string;
  role: "CUSTOMER" | "ADMIN";
}

export interface HostingPlan {
  id: string;
  name: string;
  type: "MUTUALIZED" | "VPS";
  cpuCores: number;
  ramMb: number;
  storageGb: number;
  bandwidth: string;
  price: number;
  features: string[];
  popular?: boolean;
}

export interface Voucher {
  id: string;
  code: string;
  discount: number;
  isUsed: boolean;
  expiresAt: string;
  status: boolean;
}

export interface Order {
  id: string;
  userId: string;
  planId: string;
  voucherId?: string;
  createdAt: string;
  status: "ACTIVE" | "PENDING" | "CANCELLED";
  ipAddress?: string;
  sshCredentials?: {
    host: string;
    username: string;
    password: string;
  };
}
