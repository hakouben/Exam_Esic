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

// export const getAuthenticatedUser = (): User | null => {
//   if (authenticatedUser) return authenticatedUser;

//   const storedUser = localStorage.getItem("user");
//   if (storedUser) {
//     authenticatedUser = JSON.parse(storedUser);
//     return authenticatedUser;
//   }
//   return null;
// };

export const getAuthenticatedUser = () => {
  const id = localStorage.getItem("userID");
  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");

  if (id && username && role) {
    return {
      id: parseInt(id),
      name: username,
      role,
    };
  }

  return null;
};

// export const isAuthenticated = (): boolean => {
//   return getAuthenticatedUser() !== null;
// };

export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem("token");
  return token !== null && token !== "";
};

// export const isAdmin = (): boolean => {
//   const user = getAuthenticatedUser();
//   return user !== null && user.role === "ADMIN";
// };

export const isAdmin = (): boolean => {
  const role = localStorage.getItem("role");
  return role === "ADMIN";
};
