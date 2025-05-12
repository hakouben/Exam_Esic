
import React from "react";
import { HostingPlan } from "@/lib/types";
import { Check, X } from "lucide-react";

interface PlanComparisonProps {
  plans: HostingPlan[];
  type: "MUTUALIZED" | "VPS";
}

const PlanComparison: React.FC<PlanComparisonProps> = ({ plans, type }) => {
  // Filter plans by type
  const filteredPlans = plans.filter(plan => plan.type === type);

  // Get all unique features across all plans
  const allFeatures = Array.from(
    new Set(
      filteredPlans.flatMap(plan => plan.features)
    )
  );

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-hosting-light">
            <th className="py-4 px-6 text-left">Feature</th>
            {filteredPlans.map(plan => (
              <th key={plan.id} className="py-4 px-6 text-center">
                {plan.name}
                <div className="text-lg font-bold text-hosting-blue mt-1">
                  ${plan.price}<span className="text-xs text-gray-500">/mo</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-4 px-6 border-t">CPU</td>
            {filteredPlans.map(plan => (
              <td key={plan.id} className="py-4 px-6 border-t text-center">
                {plan.cpuCores} {plan.cpuCores === 1 ? "Core" : "Cores"}
              </td>
            ))}
          </tr>
          <tr>
            <td className="py-4 px-6 border-t">RAM</td>
            {filteredPlans.map(plan => (
              <td key={plan.id} className="py-4 px-6 border-t text-center">
                {plan.ramMb / 1024} GB
              </td>
            ))}
          </tr>
          <tr>
            <td className="py-4 px-6 border-t">Storage</td>
            {filteredPlans.map(plan => (
              <td key={plan.id} className="py-4 px-6 border-t text-center">
                {plan.storageGb} GB SSD
              </td>
            ))}
          </tr>
          <tr>
            <td className="py-4 px-6 border-t">Bandwidth</td>
            {filteredPlans.map(plan => (
              <td key={plan.id} className="py-4 px-6 border-t text-center">
                {plan.bandwidth}
              </td>
            ))}
          </tr>
          {allFeatures.map(feature => (
            <tr key={feature}>
              <td className="py-4 px-6 border-t">{feature}</td>
              {filteredPlans.map(plan => (
                <td key={plan.id} className="py-4 px-6 border-t text-center">
                  {plan.features.includes(feature) ? (
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  ) : (
                    <X className="h-5 w-5 text-gray-300 mx-auto" />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlanComparison;
