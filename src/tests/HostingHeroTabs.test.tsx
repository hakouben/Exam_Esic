// src/tests/HostingHeroTabs.test.tsx
import { describe, it, expect } from 'vitest';
import userEvent from '@testing-library/user-event';
import { renderWithProviders, screen } from '../test-utils'; // ← remonte d’un dossier
import HostingHeroTabs from '@/components/HostingHeroTabs';

describe('<HostingHeroTabs />', () => {
  it('met “Shared Hosting” actif par défaut', () => {
    renderWithProviders(<HostingHeroTabs />);
    const shared = screen.getByRole('button', { name: /shared hosting/i });
    const vps = screen.getByRole('button', { name: /vps hosting/i });

    expect(shared).toHaveClass('bg-teal-500');
    expect(vps).not.toHaveClass('bg-teal-500');
  });

  it('active “VPS Hosting” au clic', async () => {
    renderWithProviders(<HostingHeroTabs />);
    const vps = screen.getByRole('button', { name: /vps hosting/i });

    await userEvent.click(vps);
    expect(vps).toHaveClass('bg-teal-500');
  });
});
