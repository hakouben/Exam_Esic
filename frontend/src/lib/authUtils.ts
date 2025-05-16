
import { User } from "./types";
import { currentUser, adminUser } from "./data";

// Simulating authentication state management
let authenticatedUser: User | null = null;

export const login = (email: string, password: string): User | null => {
  // Simple mock login logic
  if (email === "user@example.com" && password === "password") {
    authenticatedUser = currentUser;
    localStorage.setItem("user", JSON.stringify(authenticatedUser));
    return authenticatedUser;
  }
  if (email === "admin@example.com" && password === "admin") {
    authenticatedUser = adminUser;
    localStorage.setItem("user", JSON.stringify(authenticatedUser));
    return authenticatedUser;
  }
  return null;
};

export const logout = (): void => {
  authenticatedUser = null;
  localStorage.removeItem("user");
};

export const getAuthenticatedUser = (): User | null => {
  if (authenticatedUser) return authenticatedUser;
  
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    authenticatedUser = JSON.parse(storedUser);
    return authenticatedUser;
  }
  return null;
};

export const isAuthenticated = (): boolean => {
  return getAuthenticatedUser() !== null;
};

export const isAdmin = (): boolean => {
  const user = getAuthenticatedUser();
  return user !== null && user.role === "ADMIN";
};
