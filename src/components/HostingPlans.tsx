// src/components/HostingPlans.tsx
import { useState } from 'react';
import PlanCard from '@/components/hosting/PlanCard';
import { type HostingPlan } from '@/lib/types';

/* ----------- Onglets disponibles ----------- */
type Tab = 'all' | 'mutualized' | 'vps';
const tabLabels: Record<Tab, string> = {
  all: 'All',
  mutualized: 'Mutualized',
  vps: 'VPS',
};

/* ----------- Données de démonstration ----------- */
const plans: HostingPlan[] = [
  {
    id: 'mutu-starter',
    name: 'Starter Mutualized',
    type: 'MUTUALIZED',
    cpuCores: 1,
    ramMb: 1024,
    storageGb: 20,
    bandwidth: '1 TB',
    price: 3.99,
    features: ['1 site', 'SSL gratuit', 'Support 24/7'],
  },
  {
    id: 'mutu-business',
    name: 'Business Mutualized',
    type: 'MUTUALIZED',
    cpuCores: 2,
    ramMb: 2048,
    storageGb: 50,
    bandwidth: '2 TB',
    price: 7.99,
    features: ['5 sites', 'Sauvegarde auto'],
    popular: true,
  },
  {
    id: 'vps-basic',
    name: 'Basic VPS',
    type: 'VPS',
    cpuCores: 1,
    ramMb: 2048,
    storageGb: 40,
    bandwidth: '3 TB',
    price: 12.99,
    features: ['Root SSH', 'IPv4 dédié'],
  },
  {
    id: 'vps-pro',
    name: 'Pro VPS',
    type: 'VPS',
    cpuCores: 2,
    ramMb: 4096,
    storageGb: 80,
    bandwidth: '5 TB',
    price: 19.99,
    features: ['Snapshots', 'Panel de gestion'],
    popular: true,
  },
];

/* ----------- Composant principal ----------- */
const HostingPlans = () => {
  const [activeTab, setActiveTab] = useState<Tab>('all');

  /* Filtrage selon l’onglet */
  const visiblePlans =
    activeTab === 'all'
      ? plans
      : plans.filter((p) =>
          activeTab === 'mutualized'
            ? p.type === 'MUTUALIZED'
            : p.type === 'VPS',
        );

  /* Quelques classes Tailwind utilitaires */
  const base =
    'px-4 py-1.5 text-sm font-medium rounded-md transition-colors';
  const activeCls = 'bg-teal-600 text-white shadow';
  const inactiveCls = 'bg-teal-100 text-teal-700 hover:bg-teal-200';

  return (
    <section className="py-16">
      <div className="mx-auto max-w-screen-lg px-4 text-center">
        <h2 className="text-3xl font-bold mb-2 uppercase">
          Our Hosting Plans
        </h2>
        <p className="text-gray-500 mb-8">
          Choose the perfect hosting solution for your website
        </p>

        {/* ----------- Onglets ----------- */}
        <div className="flex justify-center gap-3 mb-10" role="tablist">
          {(Object.keys(tabLabels) as Tab[]).map((tab) => (
            <button
              key={tab}
              role="tab"
              aria-selected={activeTab === tab}
              className={`${base} ${
                activeTab === tab ? activeCls : inactiveCls
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tabLabels[tab]}
            </button>
          ))}
        </div>

        {/* ----------- Grille de cartes ----------- */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visiblePlans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HostingPlans;
