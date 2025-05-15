import { HostingPlan, User, Order, Voucher } from "./types";

// Mock Hosting Plans
export const hostingPlans: HostingPlan[] = [
  {
    id: "9",
    name: "Starter Shared Hosting",
    type: "MUTUALIZED",
    cpuCores: 1,
    ramMb: 1024,
    storageGb: 10,
    bandwidth: "1 TB",
    price: 5.99,
    features: [
      "1 Website",
      "Free SSL Certificate",
      "10 GB SSD Storage",
      "1 Email Account",
      "Limited Bandwidth",
      "Basic Support",
    ],
  },
  {
    id: "2",
    name: "Business Shared Hosting",
    type: "MUTUALIZED",
    cpuCores: 2,
    ramMb: 2048,
    storageGb: 25,
    bandwidth: "Unlimited",
    price: 9.99,
    features: [
      "5 Websites",
      "Free SSL Certificate",
      "25 GB SSD Storage",
      "5 Email Accounts",
      "Unlimited Bandwidth",
      "Priority Support",
      "Free Domain",
    ],
    popular: true,
  },
  {
    id: "3",
    name: "Premium Shared Hosting",
    type: "MUTUALIZED",
    cpuCores: 4,
    ramMb: 4096,
    storageGb: 50,
    bandwidth: "Unlimited",
    price: 14.99,
    features: [
      "Unlimited Websites",
      "Free SSL Certificate",
      "50 GB SSD Storage",
      "Unlimited Email Accounts",
      "Unlimited Bandwidth",
      "Premium Support",
      "Free Domain",
      "Free CDN",
    ],
  },
  {
    id: "4",
    name: "Basic VPS",
    type: "VPS",
    cpuCores: 1,
    ramMb: 1024,
    storageGb: 25,
    bandwidth: "1 TB",
    price: 12.99,
    features: [
      "1 vCPU Core",
      "1 GB RAM",
      "25 GB SSD Storage",
      "1 TB Bandwidth",
      "Full Root Access",
      "Basic Support",
      "99.9% Uptime",
    ],
  },
  {
    id: "5",
    name: "Standard VPS",
    type: "VPS",
    cpuCores: 2,
    ramMb: 2048,
    storageGb: 50,
    bandwidth: "2 TB",
    price: 19.99,
    features: [
      "2 vCPU Cores",
      "2 GB RAM",
      "50 GB SSD Storage",
      "2 TB Bandwidth",
      "Full Root Access",
      "Priority Support",
      "99.9% Uptime",
      "Weekly Backups",
    ],
    popular: true,
  },
  {
    id: "6",
    name: "Premium VPS",
    type: "VPS",
    cpuCores: 4,
    ramMb: 4096,
    storageGb: 100,
    bandwidth: "4 TB",
    price: 29.99,
    features: [
      "4 vCPU Cores",
      "4 GB RAM",
      "100 GB SSD Storage",
      "4 TB Bandwidth",
      "Full Root Access",
      "Premium Support",
      "99.9% Uptime",
      "Daily Backups",
      "DDoS Protection",
    ],
  },
];

// Mock Vouchers
export const vouchers: Voucher[] = [
  {
    id: "1",
    code: "WELCOME10",
    discount: 10,
    isUsed: false,
    expiresAt: "2026-06-15T10:30:00Z",
  },
  {
    id: "2",
    code: "SUMMER20",
    discount: 20,
    isUsed: false,
    expiresAt: "2026-06-15T10:30:00Z",
  },
];

// Mock User
export const currentUser: User = {
  id: "1",
  email: "user@example.com",
  name: "John Doe",
  role: "CUSTOMER",
};

// Mock Admin
export const adminUser: User = {
  id: "2",
  email: "admin@example.com",
  name: "Admin User",
  role: "ADMIN",
};

// Mock Orders
export const orders: Order[] = [
  {
    id: "1",
    userId: "1",
    planId: "5",
    createdAt: "2023-06-15T10:30:00Z",
    status: "ACTIVE",
    ipAddress: "185.45.67.89",
    sshCredentials: {
      host: "vps123.hostservice.com",
      username: "user123",
      password: "securePassword123",
    },
  },
  {
    id: "2",
    userId: "1",
    planId: "2",
    voucherId: "1",
    createdAt: "2023-05-20T14:15:00Z",
    status: "ACTIVE",
  },
];

// Authentication utility functions
export const mockLogin = (email: string, password: string): User | null => {
  // This is just a mock implementation
  if (email === "user@example.com" && password === "password") {
    return currentUser;
  }
  if (email === "admin@example.com" && password === "admin") {
    return adminUser;
  }
  return null;
};

export const mockValidateVoucher = (code: string): Voucher | null => {
  const voucher = vouchers.find((v) => v.code === code && !v.isUsed);
  return voucher || null;
};

export const mockCreateOrder = (
  userId: string,
  planId: string,
  voucherId?: string
): Order => {
  const newOrder: Order = {
    id: `order-${Math.floor(Math.random() * 1000)}`,
    userId,
    planId,
    voucherId,
    createdAt: new Date().toISOString(),
    status: "PENDING",
  };

  // If it's a VPS, add SSH credentials after a delay (simulating provisioning)
  const plan = hostingPlans.find((p) => p.id === planId);
  if (plan?.type === "VPS") {
    setTimeout(() => {
      newOrder.status = "ACTIVE";
      newOrder.ipAddress = `185.${Math.floor(Math.random() * 255)}.${Math.floor(
        Math.random() * 255
      )}.${Math.floor(Math.random() * 255)}`;
      newOrder.sshCredentials = {
        host: `vps${Math.floor(Math.random() * 1000)}.hostservice.com`,
        username: `user${Math.floor(Math.random() * 1000)}`,
        password: `securePassword${Math.floor(Math.random() * 1000)}`,
      };
    }, 2000);
  } else {
    // For shared hosting, activate immediately
    newOrder.status = "ACTIVE";
  }

  return newOrder;
};
