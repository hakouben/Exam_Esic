
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Server, Database, Cpu, ArrowRight } from "lucide-react";
import { HostingPlan } from "@/lib/types";
import FeatureList from "@/components/ui/FeatureList";

interface PlanCardProps {
  plan: HostingPlan;
  className?: string;
}

const PlanCard: React.FC<PlanCardProps> = ({ plan, className = "" }) => {
  // Determine icon based on plan type
  const PlanIcon = plan.type === "VPS" ? Server : Database;
  
  return (
    <div className={`border rounded-lg shadow-sm overflow-hidden ${className} ${plan.popular ? "border-hosting-blue" : "border-gray-200"}`}>
      {plan.popular && (
        <div className="bg-hosting-blue text-white text-center py-1 text-sm font-medium">
          Most Popular
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-3">
          <PlanIcon className="h-5 w-5 text-hosting-blue" />
          <h3 className="font-bold text-lg">{plan.name}</h3>
        </div>
        
        <div className="mt-2 mb-4">
          <span className="text-3xl font-bold">${plan.price}</span>
          <span className="text-gray-500 text-sm">/month</span>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Cpu className="h-4 w-4 text-gray-600" />
            <span className="text-sm">{plan.cpuCores} CPU Cores</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 19h12V9H6v10zM4 7h16M8 4v3M16 4v3" />
            </svg>
            <span className="text-sm">{plan.ramMb / 1024} GB RAM</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Database className="h-4 w-4 text-gray-600" />
            <span className="text-sm">{plan.storageGb} GB SSD Storage</span>
          </div>
        </div>
        
        <div className="mt-6">
          <FeatureList features={plan.features} />
        </div>
      </div>
      
      <div className="p-6 bg-gray-50 border-t">
        <Link to={`/order/${plan.id}`}>
          <Button className="w-full flex justify-between items-center group" variant={plan.popular ? "default" : "outline"}>
            <span>Order Now</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PlanCard;
