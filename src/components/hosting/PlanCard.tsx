
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { HostingPlan } from "@/lib/types";
import FeatureList from "@/components/ui/FeatureList";
import { Server, Hard, Cpu, ArrowRight } from "lucide-react";

interface PlanCardProps {
  plan: HostingPlan;
}

const PlanCard: React.FC<PlanCardProps> = ({ plan }) => {
  return (
    <Card className={`flex flex-col h-full transition-all hover:shadow-lg ${plan.popular ? "border-hosting-blue" : ""}`}>
      <CardHeader>
        {plan.popular && (
          <div className="inline-block bg-hosting-blue text-white text-xs font-semibold px-3 py-1 rounded-full mb-2">
            Popular Choice
          </div>
        )}
        <CardTitle className="text-xl">{plan.name}</CardTitle>
        <CardDescription>
          {plan.type === "MUTUALIZED" ? "Shared Hosting" : "Virtual Private Server"}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="mb-6">
          <div className="text-3xl font-bold mb-1">${plan.price}<span className="text-sm font-normal text-gray-500">/mo</span></div>
          <p className="text-sm text-gray-500">No setup fees</p>
        </div>
        
        <div className="space-y-4 mb-6">
          <div className="flex items-center">
            <Cpu className="h-4 w-4 mr-2 text-hosting-blue" />
            <span className="text-sm">{plan.cpuCores} {plan.cpuCores === 1 ? "CPU Core" : "CPU Cores"}</span>
          </div>
          <div className="flex items-center">
            <Server className="h-4 w-4 mr-2 text-hosting-blue" />
            <span className="text-sm">{plan.ramMb / 1024} GB RAM</span>
          </div>
          <div className="flex items-center">
            <Hard className="h-4 w-4 mr-2 text-hosting-blue" />
            <span className="text-sm">{plan.storageGb} GB SSD Storage</span>
          </div>
        </div>
        
        <FeatureList features={plan.features.slice(0, 4)} />
      </CardContent>
      <CardFooter>
        <Link to={`/order/${plan.id}`} className="w-full">
          <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
            Choose Plan <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default PlanCard;
