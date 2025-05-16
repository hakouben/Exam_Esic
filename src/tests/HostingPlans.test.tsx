// src/tests/HostingPlans.test.tsx
import { describe, it, expect } from 'vitest';
import userEvent from '@testing-library/user-event';
import { renderWithProviders, screen } from '../test-utils';
import HostingPlans from '@/components/HostingPlans';

/**
 * Utilise les données « seed » déclarées dans HostingPlans.tsx.
 * Si tu changes les noms des plans ou des onglets,
 * adapte simplement les chaînes recherchées ici.
 */
describe('<HostingPlans />', () => {
  it('affiche le heading principal', () => {
    renderWithProviders(<HostingPlans />);

    expect(
      screen.getByRole('heading', { name: /our hosting plans/i }),
    ).toBeInTheDocument();
  });

  it('filtre correctement sur l’onglet “Mutualized”', async () => {
    renderWithProviders(<HostingPlans />);

    // ↪️ Clique sur l’onglet Mutualized
    await userEvent.click(screen.getByRole('tab', { name: /^mutualized$/i }));

    // ✅ Carte mutualisée présente
    expect(screen.getByText(/starter mutualized/i)).toBeInTheDocument();

    // ❌ Carte VPS absente
    expect(screen.queryByText(/basic vps/i)).not.toBeInTheDocument();
  });

  it('filtre correctement sur l’onglet “VPS”', async () => {
    renderWithProviders(<HostingPlans />);

    // ↪️ Clique sur l’onglet VPS
    await userEvent.click(screen.getByRole('tab', { name: /^vps$/i }));

    // ✅ Carte VPS présente
    expect(screen.getByText(/basic vps/i)).toBeInTheDocument();

    // ❌ Carte mutualisée absente
    expect(screen.queryByText(/starter mutualized/i)).not.toBeInTheDocument();
  });
});
