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

export interface ServiceOffer {
  id: number;
  name: string;
  type: string;
  price: number;
  cpuCores: number;
  ramGb: number;
  ssdStorageGb: number;
  websiteCount: number;
  emailAccounts: number;
  sslIncluded: boolean;
  bandwidthUnlimited: boolean;
  supportLevel: string;
  domainIncluded: boolean;
  cdnIncluded: boolean;
}

export interface Voucher {
  id: string;
  code: string;
  discount: number;
  isUsed: boolean;
  expiresAt: string;
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
