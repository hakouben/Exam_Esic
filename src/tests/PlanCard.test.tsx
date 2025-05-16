import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PlanCard from '@/components/hosting/PlanCard';
import { type HostingPlan } from '@/lib/types';

const mockPlan: HostingPlan = {
  id: 'vps-pro',
  name: 'Pro VPS',
  type: 'VPS',
  cpuCores: 4,
  ramMb: 8192,
  storageGb: 100,
  bandwidth: '10 TB',          // toujours présent dans le type, mais pas testé
  price: 24.99,
  features: ['Root access', 'Daily backup', 'IPv4'],
  popular: true,
};

describe('<PlanCard />', () => {
  it('affiche le nom, le prix et les specs principales', () => {
    render(
      <MemoryRouter>
        <PlanCard plan={mockPlan} />
      </MemoryRouter>,
    );

    expect(screen.getByText(/pro vps/i)).toBeInTheDocument();
    expect(screen.getByText(/\$24.99/i)).toBeInTheDocument();
    expect(screen.getByText(/4 cpu cores/i)).toBeInTheDocument();
    expect(screen.getByText(/8 gb ram/i)).toBeInTheDocument();
    expect(screen.getByText(/100 gb ssd/i)).toBeInTheDocument();
    // Les assertions sur “Bandwidth” ont été retirées
  });

  it('affiche le badge “Most Popular” si popular est true', () => {
    render(
      <MemoryRouter>
        <PlanCard plan={mockPlan} />
      </MemoryRouter>,
    );

    expect(screen.getByText(/most popular/i)).toBeInTheDocument();
  });

  it('affiche le bouton “Order Now”', () => {
    render(
      <MemoryRouter>
        <PlanCard plan={mockPlan} />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole('button', { name: /order now/i }),
    ).toBeInTheDocument();
  });
});
