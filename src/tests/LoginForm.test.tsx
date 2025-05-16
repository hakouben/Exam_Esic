import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  login,
  logout,
  getAuthenticatedUser,
  isAuthenticated,
  isAdmin,
} from '@/lib/authUtils';
import { currentUser, adminUser } from '@/lib/data';

// Réinitialise l’état entre chaque test
beforeEach(() => {
  localStorage.clear();
  logout(); // remet authenticatedUser à null
});

afterEach(() => {
  localStorage.clear();
  logout();
});

describe('authUtils', () => {
  it('login() renvoie currentUser pour un compte client valide', () => {
    const user = login('user@example.com', 'password');

    expect(user).toEqual(currentUser);
    expect(JSON.parse(localStorage.getItem('user')!)).toEqual(currentUser);
    expect(isAuthenticated()).toBe(true);
    expect(isAdmin()).toBe(false);
  });

  it('login() renvoie adminUser pour un compte admin valide', () => {
    const user = login('admin@example.com', 'admin');

    expect(user).toEqual(adminUser);
    expect(isAuthenticated()).toBe(true);
    expect(isAdmin()).toBe(true);
  });

  it('login() renvoie null pour des identifiants invalides', () => {
    const user = login('wrong@mail.com', 'oops');

    expect(user).toBeNull();
    expect(isAuthenticated()).toBe(false);
    expect(localStorage.getItem('user')).toBeNull();
  });

  it('logout() réinitialise l’état et le storage', () => {
    login('user@example.com', 'password');
    logout();

    expect(getAuthenticatedUser()).toBeNull();
    expect(isAuthenticated()).toBe(false);
    expect(localStorage.getItem('user')).toBeNull();
  });
});
