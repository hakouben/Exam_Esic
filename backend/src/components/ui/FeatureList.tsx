
import React from "react";
import { Check } from "lucide-react";

interface FeatureListProps {
  features: string[];
  className?: string;
}

const FeatureList: React.FC<FeatureListProps> = ({ features, className = "" }) => {
  return (
    <ul className={`space-y-2 ${className}`}>
      {features.map((feature, index) => (
        <li key={index} className="flex items-center">
          <span className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-hosting-blue/10 text-hosting-blue mr-3">
            <Check className="h-3 w-3" />
          </span>
          <span className="text-sm">{feature}</span>
        </li>
      ))}
    </ul>
  );
};

export default FeatureList;
