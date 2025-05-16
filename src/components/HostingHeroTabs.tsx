// src/components/HostingHeroTabs.tsx
import { useState } from 'react';

export type HostingTab = 'shared' | 'vps';

interface Props {
  initialTab?: HostingTab;
  onChange?: (tab: HostingTab) => void;
}

const HostingHeroTabs = ({ initialTab = 'shared', onChange }: Props) => {
  const [active, setActive] = useState<HostingTab>(initialTab);

  const toggle = (tab: HostingTab) => {
    setActive(tab);
    onChange?.(tab);
  };

  const base = 'px-6 py-3 rounded-md font-medium transition-colors';
  const activeStyle = 'bg-teal-500 text-white shadow';
  const inactive = 'bg-white/10 text-white hover:bg-white/20 backdrop-blur';

  return (
    <div className="flex gap-4" role="tablist" aria-label="Hosting type tabs">
      <button
        className={`${base} ${active === 'shared' ? activeStyle : inactive}`}
        onClick={() => toggle('shared')}
      >
        Shared Hosting
      </button>
      <button
        className={`${base} ${active === 'vps' ? activeStyle : inactive}`}
        onClick={() => toggle('vps')}
      >
        VPS Hosting
      </button>
    </div>
  );
};

export default HostingHeroTabs; // ← **export default indispensable**
